import React, { createContext, useState } from 'react';

const intitialState = {
  list: [],
};

export const SongContext = createContext(intitialState);

export default ({ children }) => {
  const [songs, setSongs] = useState(intitialState);

  const songs_setList = list =>
    setSongs({
      ...songs,
      list,
    });

  const songs_removeFromList = id =>
    setSongs({
      ...songs,
      list: songs.list.filter(s => s.id !== id),
    });

  const songs_addToList = song => {
    const list = songs.list.slice();
    list.unshift(song);
    setSongs({
      ...songs,
      list,
    });
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        songs_setList,
        songs_addToList,
        songs_removeFromList,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
