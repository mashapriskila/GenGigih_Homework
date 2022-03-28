import React from "react";
import "../App.css";

const Song = ({image, title, artist, album,url }) => {
    return(

      <div className="song-box">
          <div className="song-wrap">
          <div className='image'>
            <img src={image} alt="song image" />
          </div>

            <p>{title}</p>
            <p>{artist}</p>
            <p>{album}</p>
            
          <div className='btn-wrap'>
            <button className="btn-select"> 
              <a href = {url}>Select</a>
            </button>
          </div>
        </div>
        
      </div>  
        
    );
};
export default Song;