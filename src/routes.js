import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './pages/home';
import { NotFound } from './pages/notFound';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
