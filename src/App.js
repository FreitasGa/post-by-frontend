import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes';

import './styles.scss';

export function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
