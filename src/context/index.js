import React from 'react';
import SongContext from './songs';
import WidgetContext from './widgets';

// add all Contexts to this array
const allContexts = [SongContext, WidgetContext];

export default ({ children }) => {
  let output = null;

  allContexts.forEach(Ctx => {
    if (!output) {
      output = <Ctx>{children}</Ctx>;
    } else {
      output = <Ctx>{output}</Ctx>;
    }
  });

  return output;
};
