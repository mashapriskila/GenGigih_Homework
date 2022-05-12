import React, { useState } from 'react';
import Button from '../Button/btn';
//import PropTypes from 'prop-types';
import "./search.css";
import {searchTrack} from '../../lib/data_API'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slice/access-slice';


export default function Searching({onSuccess,  onClearSearch}) {
  
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
          placeholder="Type to search..."
          required
          value={text}
          onChange={handleInput}
          
        />
         
        
        <Button 
          className='song-btn' 
          type="submit"
          
        >
          Search
        </Button>
      </form>
      {!isClear && (
        <Button className="song-btn" variant="text" onClick={handleClear}>Clear search</Button>
      )}
    
        
     

     

    
      
    </div>
  )
}

// Searching.propTypes = {
  
//   onSuccess: PropTypes.func.isRequired,
//   // onClearSearch: PropTypes.func.isRequired,
  
// }
