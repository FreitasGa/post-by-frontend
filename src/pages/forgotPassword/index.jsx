import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

import { Header } from '../../components/header';
import { LoaderButton } from '../../components/loaderButton';
import './styles.scss';

export function ForgotPassword() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0;
  }

  function validateConfirmationForm() {
    return (
      email.length > 0 &&
      code.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      const newPassword = await Auth.forgotPassword(email);
      setNewPassword(newPassword);
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      toast.success('Senha alterada');
      history.push('/login');
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  function forgetPasswordForm() {
    return (
      <div className="ForgotPasswordBody">
        <h1>Nova senha</h1>
        <form className="ForgotPasswordForm" onSubmit={handleSubmit}>
          <div className="ForgotPasswordFormInput">
            <p>Digite o e-mail para enviarmos o seu código de recuperação</p>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <LoaderButton
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
            className="ForgotPasswordSubmit"
          >
            Enviar
          </LoaderButton>
        </form>
      </div>
    );
  }

  function confirmForm() {
    return (
      <div className="ForgotPasswordBody">
        <h1>Nova senha</h1>
        <form
          className="ForgotPasswordForm"
          onSubmit={handleConfirmationSubmit}
        >
          <div className="ForgotPasswordFormInput">
            <p>Verifique o código que foi enviado ao seu e-mail</p>
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
            <input
              type="text"
              placeholder="Codigo"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              required
            />
          </div>
          <LoaderButton
            type="submit"
            isLoading={isLoading}
            disabled={!validateConfirmationForm()}
            className="ForgotPasswordSubmit"
          >
            Enviar
          </LoaderButton>
        </form>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="ForgotPasswordWrapper">
        {newPassword === null ? forgetPasswordForm() : confirmForm()}
      </div>
    </>
  );
}
