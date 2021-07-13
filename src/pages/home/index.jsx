import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Header } from '../../components/header';
import { Item } from '../../components/item';
import './styles.scss';

export function Home() {
  return (
    <>
      <Header />
      <div className="Home">
        <h1>Produtos</h1>
        <div className="Items">
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
          <Item name="Nome do Produto" price="99.99" />
        </div>
        <Link className="CartFAB" to="/">
          <ShoppingCartIcon fontSize="large" />
        </Link>
      </div>
    </>
  );
}
