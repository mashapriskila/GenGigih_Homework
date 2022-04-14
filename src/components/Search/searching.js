import React, { useState } from 'react';
// import Btn from '../Button/btn';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import "../../App.css";
import {searchTrack} from '../../data/data_API'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Access_Token/access-slice.';


export default function Searching({onSuccess, onClearSearch }) {

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await searchTrack(text,accessToken);
       

      const tracks = response.tracks.items;
      onSuccess(tracks,text);
      setIsClear(false);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
      toast.error(error.message);
    }
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
        <Button variant="contained" color="success">
          Search
        </Button>
        {/* <Btn type="submit">Search</Btn> */}
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
