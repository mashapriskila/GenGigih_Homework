import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import Song from "./components/song";

function App() {
    const CLIENT_ID = "f5fcff834a184b7b9677b6a602e8aae6"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div>
                
                <Song 
                    key={artist.id}
                    images = {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    //images = {artist.images[0].url} 
                    art = {artist.name}
                    url = {artist.url}
                />
                

            </div>
            
        ))
    }

    return (
        <div className="App">
            <header className="App-header">
                
                <div className="login">
                    {token ?
                        <form onSubmit={searchArtists}>
                            <input type="text" placeholder="Search Artist or songs" onChange={e => setSearchKey(e.target.value)}/>
                            <button type={"submit"}>Search</button>
                        </form>

                        : <h2>Please login</h2>
                    }
                </div>
                {renderArtists()}
                
                <div className="logout">
                    {!token ?
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                            to Spotify</a>
                        : <button onClick={logout}>Logout</button>}
                </div>
            </header>
         
        </div>
        
    );
}

export default App;