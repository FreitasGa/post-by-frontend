import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import './styles.scss';

export function Item({ itemId, imgUrl, name, price, quantity }) {
  function handleItemAdd() {
    const itemInfo = {
      itemId,
      imgUrl,
      name,
      price,
      quantity: 1,
      totalQuantity: quantity,
      TotalPrice: price,
    };

    const cart = JSON.parse(localStorage.getItem('post-by/cart') || '[]');
    cart.push(itemInfo);
    localStorage.setItem('post-by/cart', JSON.stringify(cart));

    toast.success('Item adicionado ao carrinho');
  }

  return (
    <div className="Item">
      <Link to="/a">
        <img className="ItemImage" src={imgUrl} alt="" />
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
