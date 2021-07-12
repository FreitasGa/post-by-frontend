import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <>
      <div className="NotFoundHeader">
        <Link to="/">Post-by</Link>
      </div>
      <div className="NotFoundBody">
        <h2>Desculpe, não encontramos esta pagina!</h2>
        <Link to="/">Voltar para o Inicio</Link>
      </div>
    </>
  );
}
