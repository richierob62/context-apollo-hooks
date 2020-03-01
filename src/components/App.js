import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './About';
import Context from '../context';
import Home from './Home';
import React from 'react';

const App = () => {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Context>
    </Router>
  );
};

export default App;
