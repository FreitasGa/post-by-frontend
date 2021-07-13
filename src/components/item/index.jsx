import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import postit from '../../assets/post-it-sp-amarelo.jpg';
import './styles.scss';

export function Item({ imgUrl, name, price }) {
  function handleItemAdd() {
    const itemInfo = {
      name,
      price: parseFloat(price),
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(itemInfo);
    localStorage.setItem('cart', JSON.stringify(cart));

    toast.success('Item adicionado ao carrinho');
  }

  return (
    <div className="Item">
      <Link to="/a">
        <img className="ItemImage" src={postit} alt="post-it amarelo" />
      </Link>
      <div className="ItemBody">
        <b className="ItemName">{name}</b>
        <b className="ItemPrice">R$ {price}</b>
        <button className="ItemAdd" onClick={handleItemAdd}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
