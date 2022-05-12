import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Button from '../components/Button/btn';
import Content from '../lib/content.ts';
import { useDocumentTitle } from '../lib/Hooks';
import { getUserProfile } from '../lib/data_API';
import { login } from '../components/slice/access-slice';
import "../App.css";

export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Login - MyMuse App');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiredDateParams = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(login({
            accessToken: accessTokenParams,
            expiredDate: +new Date() + expiredDateParams * 1000,
            user: responseUser,
          }));

          history.push('/create-playlist');
        } catch (error) {
          toast.error(error.message);
        }
      }

      setUserProfile();
    }
  }, [dispatch, history]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
 
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    return 'https://accounts.spotify.com/authorize?' + 
      `client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=${Content.HOST}` +
      `&state=${state}` +
      `&scope=${Content.SPOTIFY_SCOPE}`;
  }

  return (
    <main className="center">
      <p>My Muse</p>
      
      <Button className='login' href={getSpotifyLinkAuthorize()} external>Login to spotify</Button>
    </main>
  )
}
