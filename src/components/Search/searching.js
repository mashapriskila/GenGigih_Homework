import React, { useState } from 'react';
import Btn from '../Button/btn';
import PropTypes from 'prop-types';
import Content from '../../data/content';
import "../../App.css";

export default function Searching({ accessToken, onSuccess, onClearSearch }) {


  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`${Content.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      alert(e);
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div>
      <form className="App-header" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type to search...(artist,song,album)"
          required
          value={text}
          onChange={handleInput}
        />
        <Btn type="submit">Search</Btn>
      </form>

    <div className='clear'> 
        {!isClear && (
        <Btn variant="text" onClick={handleClear} className="mt-1">Clear Search</Btn>
        )}
    </div>
      

      
    </div>
  )
}

Searching.propTypes = {
  accessToken: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
}
