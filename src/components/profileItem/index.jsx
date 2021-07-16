import { API } from 'aws-amplify';

import DeleteIcon from '@material-ui/icons/Delete';
import './styles.scss';

export function ProfileItem({
  items,
  reserveId,
  totalPrice,
  totalQuantity,
  callback,
}) {
  async function handleDelete() {
    try {
      await API.del('post-by', `/reserve/${reserveId}`);
      callback();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="ProfileItemBody">
      <div className="ProfileItemHead">
        <b>{reserveId}</b>
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>

      <div className="ProfileItemList">
        {items.map(({ imgUrl, name, quantity, price, TotalPrice }, index) => (
          <div className="ProfileItem" key={index}>
            <img className="ProfileItemImage" src={imgUrl} alt="" />
            <b className="ProfileItemName">{name}</b>
            <div>
              <b className="ProfileItemPrice">R$ {price.toFixed(2)}</b>
              <b className="ProfileItemQuantity">{quantity}</b>
              <b className="ProfileItemTotalPrice">
                R$ {TotalPrice.toFixed(2)}
              </b>
            </div>
          </div>
        ))}
      </div>

      <div className="ProfileItemFooter">
        <b>Quantidade: {totalQuantity}</b>
        <b>Total: R$ {totalPrice}</b>
      </div>
    </div>
  );
}
