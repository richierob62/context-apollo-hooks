import React, { createContext, useState } from 'react';

const intitialState = {
  list: [],
};

export const WidgetContext = createContext(intitialState);

export default ({ children }) => {
  const [widgets, setWidgets] = useState(intitialState);

  const widgets_setList = list =>
    setWidgets({
      ...widgets,
      list,
    });

  const widgets_removeFromList = id =>
    setWidgets({
      ...widgets,
      list: widgets.list.filter(s => s.id !== id),
    });

  const widgets_addToList = song => {
    const list = widgets.list.slice();
    list.unshift(song);
    setWidgets({
      ...widgets,
      list,
    });
  };

  return (
    <WidgetContext.Provider
      value={{
        widgets,
        widgets_setList,
        widgets_addToList,
        widgets_removeFromList,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};
