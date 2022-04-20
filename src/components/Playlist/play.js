import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../data/data_API';
import Btn from '../Button/btn';

import Input from './input';
import Merge from './Merge';
import '../../App.css';
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
        title: 'The minimum character for the title is 10 character'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'The minimum character for the Description is 101 character'
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

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
          toast.error(error.message);
        }
      }
      } else {
        toast.error('Please select at least one track');
      }
    }
  }

  return (
    <div className="playlist">
      <div>
        <h2>Create Playlist</h2>

        <form className="playlist playlist-form" onSubmit={handleSubmit}>
          <Merge>
            <Input
              label="Title"
              placeholder="The Title of your playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              
            />
          </Merge>
          <Merge>
            <Input
              type='textarea'
              label="Description"
              placeholder="Descrive your playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              
              error={errorForm.description}
            />
          </Merge>

          <div className="playlist-button">
             
           
            <Btn type="submit">Add</Btn>
          
          </div>
        </form>
      </div>
    </div>
  )
}

createPlaylist.propTypes = {
  uriTracks: PropTypes.array.isRequired,
}
