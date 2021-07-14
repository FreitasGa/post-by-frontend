import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Header } from '../../components/header';
import { HomeItem } from '../../components/homeItem';
import './styles.scss';

export function Home() {
  const sessionItems = JSON.parse(sessionStorage.getItem('post-by/items'));
  const [items, setItems] = useState(sessionItems || []);

  useEffect(() => {
    async function onLoad() {
      try {
        const items = await API.get('post-by', '/item');
        setItems(items);
        sessionStorage.setItem('post-by/items', JSON.stringify(items));
      } catch (error) {
        console.log(error.message);
      }
    }

    onLoad();
  }, []);

  return (
    <>
      <Header />
      <div className="Home">
        <h1>Produtos</h1>
        <div className="Items">
          {items.map(({ itemId, imgUrl, name, price, quantity }) => (
            <HomeItem
              key={itemId}
              itemId={itemId}
              imgUrl={imgUrl}
              name={name}
              price={price}
              quantity={quantity}
            />
          ))}
        </div>
        <Link className="CartFAB" to="/cart">
          <ShoppingCartIcon fontSize="large" />
        </Link>
      </div>
    </>
  );
}
