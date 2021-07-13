import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../assets/logo.svg';
import './styles.scss';

export function Header() {
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawer(open);
  };

  return (
    <div className="Header">
      <Link to="/">
        <img className="LogoImg" src={logo} alt="Post-by" />
      </Link>

      <div className="HeaderLinksWrapper">
        <div className="HeaderLinks">
          <Link to="/">Inicio</Link>
          <Link to="/">Entrar</Link>
          <Link to="/">Cadastro</Link>
        </div>
      </div>

      <div className="HeaderDrawer">
        <button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </button>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className="HeaderDrawerLinks">
            <Link to="/">Inicio</Link>
            <Link to="/">Entrar</Link>
            <Link to="/">Cadastro</Link>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}
