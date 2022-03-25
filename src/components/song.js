import React from "react";

function Song(){
    return(
        <div className="App">
        <div className="song-wrap">
          <div className='image'>
          <img src="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b" alt="song" />
          </div>
          
          <p>Bohemian Rhapsody (The Original Soundtrack)</p>
          <p>Queen</p>
          <p>Album</p>
          <div className='btn-select'>
          <button>Select</button>
          
           </div>
        </div>
        
       
      </div>
    );
}
export default Song;