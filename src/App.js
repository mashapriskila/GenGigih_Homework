import React, { useEffect, useState } from 'react'
import Song from './components/song';
import Searching from './components/searching';
import Content from './data/content';
import Btn from './components/btn';
import './App.css'

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

    setAccessToken(accessToken);
    setIsAuthorize(accessToken !== null);
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      const selectedTracks = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTracksUri]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = "f5fcff834a184b7b9677b6a602e8aae6";

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${Content.SPOTIFY_SCOPE}`;
  }

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTracksUri.includes(track.uri));
  }

  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = searchTracks.filter((track) => !selectedTracksUri.includes(track.uri));

    setTracks([...selectedTracks, ...searchDistincTracks]);
  }


  const clearSearch = () => {
    const selectedTracks = filterSelectedTracks();
    
    setTracks(selectedTracks);
    setIsInSearch(false);
  }


  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
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
