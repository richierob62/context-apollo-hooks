import React, { createContext, useState } from 'react';

const intitialState = {
  list: [],
};

export const SongContext = createContext(intitialState);

export default ({ children }) => {
  const [songs, setSongs] = useState(intitialState);

  const resetList = list =>
    setSongs({
      list,
    });

  const removeSongFromList = id =>
    setSongs({
      ...songs,
      list: songs.list.filter(s => s.id !== id),
    });

  const addSongToList = song => {
    const list = songs.list.slice();
    list.unshift(song);
    setSongs({
      ...songs,
      list,
    });
  };

  return (
    <SongContext.Provider
      value={{ songs, resetList, addSongToList, removeSongFromList }}
    >
      {children}
    </SongContext.Provider>
  );
};
