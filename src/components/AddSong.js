import React, { useState } from 'react';

import { ADD_SONG } from '../graphql/mutations';
import useAllContexts from '../context/useAllContexts';
import { useMutation } from '@apollo/react-hooks';

const AddSong = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [addSong] = useMutation(ADD_SONG);
  const { songs_addToList } = useAllContexts();

  return (
    <form
      className={'mui-form'}
      onSubmit={e => {
        e.preventDefault();
        addSong({
          variables: {
            song: {
              name,
              artist,
              lyrics,
            },
          },
        }).then(response => songs_addToList(response.data.createSong));

        setName('');
        setLyrics('');
        setArtist('');
      }}
    >
      <legend>Add a new song</legend>
      <div className={'mui-textfield mui-textfield--float-label width-small'}>
        <input
          value={name}
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
        />
        <label>Name</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label width-small">
        <input
          value={artist}
          type="text"
          name="artist"
          onChange={e => setArtist(e.target.value)}
        />
        <label>Artist</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <textarea
          value={lyrics}
          type="text"
          name="lyrics"
          onChange={e => setLyrics(e.target.value)}
        />
        <label>Lyrics</label>
      </div>
      <button
        className={`mui-btn mui-btn--raised mui-btn--primary`}
        type="submit"
      >
        {' '}
        Add Song
      </button>
    </form>
  );
};

export default AddSong;
