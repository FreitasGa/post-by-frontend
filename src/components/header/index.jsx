import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

import { useAppContext } from '../../libs/contextLib';

import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import logo from '../../assets/logo.svg';
import './styles.scss';

export function Header() {
  const history = useHistory();
  const { userHasAuthenticated, isAuthenticated } = useAppContext();
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

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    localStorage.removeItem('post-by/cart');
    toast('Saiu da conta');
    history.push('/');
  }

  return (
    <div className="Header">
      <Link to="/">
        <img className="LogoImg" src={logo} alt="Post-by" />
      </Link>

      <div className="HeaderLinksWrapper">
        {isAuthenticated ? (
          <div className="HeaderLinks Logged">
            <Link to="/">Inicio</Link>
            <Link to="/cart">Carrinho</Link>
            <Link to="/profile">Perfil</Link>
            <button onClick={handleLogout}>
              <ExitToAppIcon />
            </button>
          </div>
        ) : (
          <div className="HeaderLinks">
            <Link to="/">Inicio</Link>
            <Link to="/cart">Carrinho</Link>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastro</Link>
          </div>
        )}
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
          {isAuthenticated ? (
            <div className="HeaderDrawerLinks Logged">
              <Link to="/">
                <HomeIcon />
                Inicio
              </Link>
              <Link to="/cart">
                <ShoppingCartIcon />
                Carrinho
              </Link>
              <Link to="/profile">
                <PersonIcon />
                Perfil
              </Link>
              <button onClick={handleLogout}>
                <ExitToAppIcon /> Sair
              </button>
            </div>
          ) : (
            <div className="HeaderDrawerLinks">
              <Link to="/">Inicio</Link>
              <Link to="/cart">Carrinho</Link>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Cadastro</Link>
            </div>
          )}
        </SwipeableDrawer>
      </div>
    </div>
  );
}
