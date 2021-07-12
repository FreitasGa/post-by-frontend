import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Home } from './pages/home';
import { NotFound } from './pages/notFound';

export function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
