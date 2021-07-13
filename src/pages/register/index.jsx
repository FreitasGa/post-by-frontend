import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { Header } from '../../components/header';

import './styles.scss';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Header />
      <div className="RegisterWrapper">
        <div className="RegisterBody">
          <h1>Cadastro</h1>
          <form className="RegisterForm" onSubmit={handleSubmit}>
            <div className="RegisterFormInput">
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
              <input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="RegisterSubmit"
              disabled={!validateForm()}
            >
              Entrar
            </button>
          </form>
          <Link to="/login">Entre com sua conta</Link>
        </div>
      </div>
    </>
  );
}
