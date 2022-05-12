import React, { useEffect, useState } from 'react'
import Song from '../components/Song/song';
import Searching from '../components/Search/searching';
import CreatePlaylistForm from '../components/Playlist/play';
import { useDocumentTitle } from '../lib/Hooks';
import Layout from './nav';
import songDuration from '../lib/songduration.ts';
//import Button from '../components/Button/btn';
import "../components/Search/search.css"
//import { clear } from 'console';
//import { removeAllTracks } from '../components/slice/track-slice';
// import { useDispatch } from 'react-redux';
//import { useAppDispatch } from '../components/store/store';
//import { clear } from 'console';
// import { handleToggleSelect } from '../components/Song/song';

export default function CreatePlaylist() {
  let [tracks, setTracks] = useState([]);
  let [selectedTracksUri, setSelectedTracksUri] = useState([]);
  let [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [message, setMessage] = useState('Search to find tracks');
  //const dispatch = useAppDispatch();
  

  useDocumentTitle('Create Playlist - My Muse');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracks, isInSearch]);

  // useEffect(() => {
  //   if (!isInSearch) {
  //     setTracks(selectedTracks);
  //   }
  // }, [selectedTracks, isInSearch]);


  const onSuccessSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks(() => {
      const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (_tracks.length === 0) {
        setMessage(`No tracks found with query "${query}"`);
      } else {
        setMessage('');
      }

      return _tracks;
    });
  }

  const clearSearch = () => {
    setTracks(selectedTracks);
    setMessage('Search to find tracks');
    setIsInSearch(false);
  }

  const removeSelected = () => {
      setTracks([]);
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
      <Layout>
        <main className="container" id="home">
          <CreatePlaylistForm 
            uriTracks={selectedTracksUri} 
            onSuccess = {removeSelected}
          />

          <hr />

          <Searching
            onSuccess={onSuccessSearch}
            onClearSearch={clearSearch} />

          

          <div className="content">
            {tracks.length === 0 && (
              <p>{message}</p>
            )}

            <div className="tracks">
              {tracks.map((track) => (
                <Song
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                  songDuration={songDuration(track.duration_ms)} />
              ))}

              {/* {!isInSearch && tracks.length !== 0(
                  <Button className="song-btn" variant="text" onClick={ removeSelected }>Delete Selected Track</Button>
              )} */}
            </div>
          </div>
        </main>
      </Layout>
    );
  }
