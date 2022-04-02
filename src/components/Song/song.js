import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Btn from '../Button/btn.js';
import '../../App.css';

export default function Song({ imageUrl, title, artist, toggleSelect }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="song-wrap">
      <div className="image">
        <img src={imageUrl} alt={title} />
      </div>

          <h3>{title}</h3>
          <p >{artist}</p>
    
        
        <div className="btn-select">
          <Btn variant={isSelected ? 'primary' : 'secondary'} onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</Btn>
        </div>
      </div>
    
  );
}

Song.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}
