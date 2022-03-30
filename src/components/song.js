import React from "react";
import "../App.css";

const Song = ({images, title, art, album,url,song_name }) => {
    return(

      <div className="song-box">
          <div className="song-wrap">
          <div className='image'>
            <img src={images} alt="song-img" />
          </div>

            <p>{title}</p>
            <p>{art}</p>
            <p>{song_name}</p>
            
          <div className='btn-wrap'>
            <button className="btn-select"> 
              <a href = {url}>Play</a>
            </button>
          </div>
        </div>
        
      </div>  
        
    );
};
export default Song;