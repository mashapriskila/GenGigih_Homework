import React, { useEffect, useState } from 'react'
import Song from './components/Song/song';
import Searching from './components/Search/searching';
import Content from './data/content';
import Btn from './components/Button/btn';
import './App.css'
import Play from './components/Playlist/play.js'
import { getUserProfile } from './data/data_API'
import { toast } from 'react-toastify';


export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      setAccessToken(accessTokenParams);
      setIsAuthorize(accessTokenParams !== null);

      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);

          setUser(response);
        } catch (e) {
          toast.error(e);
        }
      }

      setUserProfile();
    }
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);



  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = "f5fcff834a184b7b9677b6a602e8aae6";

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${Content.SPOTIFY_SCOPE}`;
  }

  
  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }


  const clearSearch = () => {
    setTracks(selectedTracks);
    setIsInSearch(false);
  }


  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <>
      <div className='front'>
          {!isAuthorize && (
            <main>
              <h1>Spotify</h1>
              <Btn href={getSpotifyLinkAuthorize()}>Login to Spotify</Btn>
            </main>
          )}
      </div>
      

      {isAuthorize && (
        <main id="home">
          <Play
            accessToken={accessToken}
            userId={user.id}
            uriTracks={selectedTracksUri}
          
          />
          
          <Searching
            accessToken={accessToken}
            onSuccess={(tracks) => onSuccessSearch(tracks)}
            onClearSearch={clearSearch}
          />

          <div>
            {tracks.length === 0 && (
              <p></p>
            )}

            <div>
              {tracks.map((track) => (
                <Song
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
