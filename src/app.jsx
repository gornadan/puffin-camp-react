import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'components/header';

import Home from 'pages/home';
import Event from 'pages/event';

import classes from './app.css';

export default function App() {
  return (
    <div className={classes.app}>
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" exact component={Event} />
      </Switch>
    </div>
  );
}
