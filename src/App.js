import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Song from './components/song';

const api = axios.create ({
  baseURL :`https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json`
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
    <div>
      <Song/>
    </div>
  );
}
}
export default App;