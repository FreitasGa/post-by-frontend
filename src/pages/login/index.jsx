import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

import { useAppContext } from '../../libs/contextLib';

import { Header } from '../../components/header';
import { LoaderButton } from '../../components/loaderButton';

import './styles.scss';

export function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      setIsLoading(false);
      userHasAuthenticated(true);
      history.push('/');
      toast('Entrou na conta');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <>
      <Header />
      <div className="LoginWrapper">
        <div className="LoginBody">
          <h1>Entrar</h1>
          <form className="LoginForm" onSubmit={handleSubmit}>
            <div className="LoginFormInput">
              <input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoFocus
              />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Link to="/login" className="LoginForgotPassword">
              Esqueci a senha?
            </Link>
            <LoaderButton
              type="submit"
              className="LoginSubmit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Entrar
            </LoaderButton>
          </form>
          <Link to="/register">Crie um conta</Link>
        </div>
      </div>
    </>
  );
}
