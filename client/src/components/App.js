import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './About';
import ContextProvider from '../context';
import Home from './Home';
import React from 'react';
import Test from './Test';

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Route exact path="/">
            <Test />
            {/* <Home /> */}
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
