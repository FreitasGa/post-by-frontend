import { useState } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import './styles.scss';

export function CartItem({
  index,
  imgUrl,
  name,
  price,
  quantity,
  totalQuantity,
  remove,
  update,
}) {
  const [tempQuantity, setTempQuantity] = useState(quantity);

  function handleUpdate(e) {
    const value = parseInt(e.target.value);
    setTempQuantity(value);
    update(index, price, value);
  }

  function handleDelete() {
    remove(index);
  }

  return (
    <div className="CartItem">
      <img className="CartItemImage" src={imgUrl} alt="" />
      <b className="CartItemName">{name}</b>

      <div>
        <b className="CartItemPrice">R$ {price.toFixed(2)}</b>
        <input
          className="CartItemQuantity"
          type="number"
          value={tempQuantity}
          onChange={handleUpdate}
          min={1}
          max={totalQuantity}
        />
        <b className="CartItemTotalPrice">R$ {(price * (tempQuantity || 0)).toFixed(2)}</b>
      </div>

      <button className="CartItemDelete" onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}
