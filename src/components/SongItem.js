import React, { useContext } from 'react';

import { DELETE_SONG } from '../graphql/mutations';
import Delete from './Delete';
import More from './More';
import { SongContext } from '../context/songs';
import { useMutation } from '@apollo/react-hooks';
import useRelatedSongs from '../graphql/useRelatedSongs';

const SongItem = ({ song }) => {
  const { data, error, loading } = useRelatedSongs(song.artist);
  const [deleteSong] = useMutation(DELETE_SONG);
  if (error) return <div> Something went wrong </div>;

  const { removeSongFromList } = useContext(SongContext);

  const deleteMutation = () => {
    deleteSong({
      variables: {
        id: {
          id: song.id,
        },
      },
    });

    removeSongFromList(song.id);
  };

  return (
    <div className={'text-wrapper'}>
      <h1>{song.name}</h1>
      <h3>{song.artist}</h3>
      <p>{song.lyrics}</p>
      <Delete onClick={deleteMutation} />

      {!loading && data && <More songs={data.songs} />}
    </div>
  );
};

export default SongItem;
