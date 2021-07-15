import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import toast from 'react-hot-toast';

import { Header } from '../../components/header';
import './styles.scss';

export function ItemPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const item = await API.get('post-by', `/item/${itemId}`);
        setItem(item);
      } catch (error) {
        console.error(error.message);
      }
    }

    onLoad();
  }, [itemId]);

  function handleItemAdd() {
    const itemInfo = {
      itemId: item.itemId,
      imgUrl: item.imgUrl,
      name: item.name,
      price: item.price,
      quantity: 1,
      totalQuantity: item.quantity,
      TotalPrice: item.price,
    };

    const cart = JSON.parse(localStorage.getItem('post-by/cart') || '[]');
    cart.push(itemInfo);
    localStorage.setItem('post-by/cart', JSON.stringify(cart));

    toast.success('Item adicionado ao carrinho');
  }

  return (
    <>
      <Header />
      <div className="ItemPageBody">
        {item === null ? (
          <div className="ItemPageNull">
            <h2>Não achamos esse item</h2>
            <Link to="/">Voltar ao inicio</Link>
          </div>
        ) : (
          <div className="ItemPageItem">
            <img src={item.imgUrl} alt="" />
            <div>
              <h2>{item.name}</h2>
              <b>
                Codigo: <p> {item.itemId}</p>
              </b>
              <div>
                <b>R$ {item.price.toFixed(2)}</b>
                <button className="ItemPageAdd" onClick={handleItemAdd}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
