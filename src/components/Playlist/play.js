import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from "../../lib/data_API";
import Button from '../Button/btn';

import Input from './input';
import Merge from './Merge';
import '../Playlist/play.css';
import PropTypes from 'prop-types';
import { logout } from '../Access_Token/access-slice.';


export default function CreatePlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch= useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'The title must contain with minimum of 10 characters'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'The maximum characters for description is 100 character'
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Successfully added to your playlist');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
          toast.error(error.message);
        }
      }
      } else {
        toast.error('Select one track');
      }
    }
  }

  return (
    <div className="playlist">
      <div>
        <h2>Create Playlist</h2>

        <form className="form" onSubmit={handleSubmit}>
          <Merge className="merge">
            <label for="title-playlist">Title</label>
            <p></p>
            <Input
              // label="Title"
              placeholder="Add Tittle of your Playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              
            />
          </Merge>
          <p></p>
          <Merge className='merge'>
          <label for="description-playlist">Description</label>
          <p></p>
            <Input
              type='textarea'
              placeholder="Add description to your playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              
              error={errorForm.description}
            />
          </Merge>

         
             
          
                <Button className='add' type="submit">Add</Button>
          
          
            
          
        </form>
      </div>
    </div>
  )
}

createPlaylist.propTypes = {
  uriTracks: PropTypes.array.isRequired,
}
