import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Btn from '../components/Button/btn';
import Content from '../data/content';
import { useDocumentTitle } from '../data/Hooks';
import { getUserProfile } from '../data/data_API';
import { login } from '../components/Access_Token/access-slice.';

export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Auth - Spotify');

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
    const clientId = "f5fcff834a184b7b9677b6a602e8aae6";
    return 'https://accounts.spotify.com/authorize?' + 
      `client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=http://localhost:3000` +
      `&state=${state}` +
      `&scope=${Content.SPOTIFY_SCOPE}`;
  }

  return (
    <main className="center">
      <p>Spotify</p>
      <Btn href={getSpotifyLinkAuthorize()} external>Login to spotify</Btn>
    </main>
  )
}
