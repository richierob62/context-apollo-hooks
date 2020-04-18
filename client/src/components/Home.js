import React, { useEffect } from 'react';

import AddSong from './AddSong';
import Container from 'muicss/lib/react/container';
import { GET_SONGS } from '../graphql/queries';
import SongItem from './SongItem';
import useAllContexts from '../context/useAllContexts';
import { useQuery } from '@apollo/react-hooks';

const Home = () => {
  const {
    songs: { list },
    songs_setList,
  } = useAllContexts();

  const { data, loading, error } = useQuery(GET_SONGS);

  useEffect(() => {
    if (data && data.songs) {
      songs_setList(data.songs);
    }
  }, [data]);

  if (error) return <h1>Error fetching songs </h1>;
  if (loading) return <h2>Loading songs...</h2>;

  return (
    <Container>
      <AddSong />
      <div className={`song-container`}>
        {list.map(song => (
          <div key={`song-${song.id}`} className={'song-list-item'}>
            <SongItem song={song} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
