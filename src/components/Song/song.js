import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import Button from '../Button/btn';
import '../Song/song.css';




export default function Song({ imageUrl, title, artist, select,songDuration, toggleSelect }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
  
    <div className="song-wrap">
      <div className="image">
        <img src={imageUrl} alt={title} />
      </div>
      <div>
          <h3>{title}</h3>
              <p >{artist}</p>
              <p>{songDuration}</p>
            
            
              <Button className='btn-select' variant={isSelected ? 'primary' : 'secondary'} onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</Button>
            
          </div>
          
      </div>
    
  );
}

// Song.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   artist: PropTypes.string.isRequired,
//   toggleSelect: PropTypes.func.isRequired,
//   select: PropTypes.bool.isRequired,
// }

export const { handleToggleSelect } = Array;