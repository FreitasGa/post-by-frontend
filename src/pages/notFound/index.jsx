import { Link } from 'react-router-dom';
import { Header } from '../../components/header';

import './styles.scss';

export function NotFound() {
  return (
    <>
      <Header />
      <div className="NotFoundBody">
        <h2>Desculpe, não encontramos esta pagina!</h2>
        <Link to="/">Voltar para o Inicio</Link>
      </div>
    </>
  );
}
