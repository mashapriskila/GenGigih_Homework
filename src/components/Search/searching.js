import React, { useState } from 'react';
import Btn from '../Button/btn';
import PropTypes from 'prop-types';
import "../../App.css";
import {searchTrack} from '../../data/data_API'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


export default function Searching({onSuccess, onClearSearch }) {

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await searchTrack(text,accessToken);
       

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      toast.error(e);
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
  
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
}
