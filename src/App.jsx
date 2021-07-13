import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from 'aws-amplify';

import { AppContext } from './libs/contextLib';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { NotFound } from './pages/notFound';

export function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}
