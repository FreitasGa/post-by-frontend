import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import './styles.scss';

export function HomeItem({ itemId, imgUrl, name, price, quantity }) {
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
    <div className="HomeItem">
      <Link to={`/item/${itemId}`}>
        <img className="HomeItemImage" src={imgUrl} alt="" />
      </Link>
      <div className="HomeItemBody">
        <b className="HomeItemName">{name}</b>
        <b className="HomeItemPrice">R$ {price.toFixed(2)}</b>
        <button className="HomeItemAdd" onClick={handleItemAdd}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
