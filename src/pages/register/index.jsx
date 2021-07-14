import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

import { useAppContext } from '../../libs/contextLib';
import { Header } from '../../components/header';
import { LoaderButton } from '../../components/loaderButton';

import './styles.scss';

export function Register() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name,
        },
      });
      setNewUser(newUser);
    } catch (error) {
      toast.error(error.message);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
    setIsLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/');
      toast.success('Conta criada com sucesso!');
    } catch (error) {
      toast.error(error.message);
      setEmail('');
      setPassword('');
    }
    setIsLoading(false);
  }

  function RegisterForm() {
    return (
      <div className="RegisterBody">
        <h1>Cadastro</h1>
        <form className="RegisterForm" onSubmit={handleSubmit}>
          <div className="RegisterFormInput">
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <input
              type="password"
              placeholder="Confirme a Senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          <LoaderButton
            type="submit"
            className="RegisterSubmit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Criar Conta
          </LoaderButton>
        </form>
        <Link to="/login">Entre com sua conta</Link>
      </div>
    );
  }

  function ConfirmationForm() {
    return (
      <div className="RegisterBody">
        <h1>Confirme o codigo</h1>
        <form className="RegisterForm" onSubmit={handleConfirmationSubmit}>
          <div className="RegisterFormInput">
            <p>Verifique o código que foi enviado ao seu e-mail</p>
            <input
              type="text"
              placeholder="Codigo de confirmação"
              onChange={(e) => setConfirmationCode(e.target.value)}
              value={confirmationCode}
              required
            />
          </div>
          <LoaderButton
            type="submit"
            className="RegisterSubmit"
            isLoading={isLoading}
            disabled={!validateConfirmationForm()}
          >
            Verificar
          </LoaderButton>
        </form>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="RegisterWrapper">
        {newUser === null ? RegisterForm() : ConfirmationForm()}
      </div>
    </>
  );
}
