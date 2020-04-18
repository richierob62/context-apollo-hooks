import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './About';
import ContextProvider from '../context';
import Home from './Home';
import React from 'react';

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </ContextProvider>
    </Router>
  );
};

export default App;
