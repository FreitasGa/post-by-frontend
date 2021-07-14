import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from 'aws-amplify';

import { AppContext } from './libs/contextLib';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { Cart } from './pages/cart';
import { Profile } from './pages/profile';
import { ItemPage } from './pages/itemPage';
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

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return isAuthenticated ? <Component {...props} /> : <NotFound />;
        }}
      />
    );
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
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/item/:itemId" component={ItemPage} />
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}
