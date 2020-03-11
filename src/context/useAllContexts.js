import { SongContext } from '../context/songs';
import { WidgetContext } from './widgets';
import { useContext } from 'react';

export default () => {
  const {
    songs,
    songs_setList,
    songs_addToList,
    songs_removeFromList,
  } = useContext(SongContext);

  const {
    widgets,
    widgets_setList,
    widgets_addToList,
    widgets_removeFromList,
  } = useContext(WidgetContext);

  return {
    songs,
    songs_setList,
    songs_addToList,
    songs_removeFromList,
    widgets,
    widgets_setList,
    widgets_addToList,
    widgets_removeFromList,
  };
};
