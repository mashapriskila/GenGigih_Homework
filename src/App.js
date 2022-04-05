import React, { useEffect, useState } from 'react'
import Song from './components/Song/song';
import Searching from './components/Search/searching';
import Content from './data/content';
import Btn from './components/Button/btn';
import { getUserProfile } from './data/data_API'
import { toast } from 'react-toastify';
import CreatePlaylistForm from './components/Playlist/play.js';
import { useDocumentTitle } from './Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './components/Access_Token/access-slice.';
import './App.css';



export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();

  useDocumentTitle('Home - Spotipy');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(login({
            accessToken: accessTokenParams,
            user: responseUser
          }));
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
          {!isAuthorize && (
        <main className="center">
          <p>Login for next step...</p>
          <Btn href={getSpotifyLinkAuthorize()}>Authorize</Btn>
        </main>
      )}

      {isAuthorize && (
        <main className="container" id="home">
          <CreatePlaylistForm uriTracks={selectedTracksUri} />

          <hr />

          
          <Searching
            accessToken={accessToken}
            onSuccess={onSuccessSearch}
            onClearSearch={clearSearch}
          />

          <div>
            {tracks.length === 0 && (
              <p>No tracks</p>
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
