import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const api = axios.create ({
  baseURL :`https://gist.githubusercontent.com/aryapradipta9/0b8d0a1a113e3594d34c68c72ec32daf/raw/cb5d20b494bd2cb259d31596b9e8eea02e0f6d1e/single-sample.js`

})

class App extends Component {
  constructor() {
    super();
    api.get('/').then(res =>{
      console.log(res.data)
    })
 
  }

render() {
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
}
export default App;