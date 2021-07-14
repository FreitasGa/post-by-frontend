import './styles.scss';

export function ProfileItem({ items, reserveId, totalPrice, totalQuantity }) {
  return (
    <div className="ProfileItemBody">
      <div className="ProfileItemHead">
        <b>Reserva: {reserveId}</b>
      </div>

      <div className="ProfileItemList">
        {items.map(({ imgUrl, name, quantity, price, TotalPrice }, index) => (
          <div className="ProfileItem">
            <img className="ProfileItemImage" src={imgUrl} alt="" />
            <b className="ProfileItemName">{name}</b>
            <div>
              <b className="ProfileItemPrice">R$ {price}</b>
              <b className="ProfileItemQuantity">{quantity}</b>
              <b className="ProfileItemTotalPrice">R$ {TotalPrice}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
