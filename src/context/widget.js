import React, { createContext, useState } from 'react';

const intitialState = {
  list: ['widget1', 'widget2'],
  current: 'widget1',
};

export const WidgetContext = createContext(intitialState);

export default ({ children }) => {
  const [widgets, setWidgets] = useState(intitialState);
  return (
    <WidgetContext.Provider value={{ widgets, setWidgets }}>
      {children}
    </WidgetContext.Provider>
  );
};
