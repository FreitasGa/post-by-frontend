import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import toast from 'react-hot-toast';

import { useAppContext } from '../../libs/contextLib';
import { Header } from '../../components/header';
import { CartItem } from '../../components/cartItem';
import { LoaderButton } from '../../components/loaderButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './styles.scss';

export function Cart() {
  const history = useHistory();
  const { isAuthenticated } = useAppContext();

  const cartItems = JSON.parse(localStorage.getItem('post-by/cart'));
  const [items, setItems] = useState(cartItems || []);
  const [state, setState] = useState(false);
  const [email, setEmail] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserEmail();

    if (items.length > 0) {
      const { TotalPrice } = items.reduce((a, b) => ({
        TotalPrice: a.TotalPrice + b.TotalPrice,
      }));

      setTotalPrice(TotalPrice);
    }
  }, [state, items]);

  function handleUpdate(index, price, quantity) {
    setState(!state);
    const temp = items;
    temp[index].TotalPrice = price * quantity;
    temp[index].quantity = quantity;
    setItems(temp);
    localStorage.setItem('post-by/cart', JSON.stringify(items));
  }

  function handleDelete(index) {
    setState(!state);
    items.splice(index, 1);
    localStorage.setItem('post-by/cart', JSON.stringify(items));
  }

  function handleEmpty() {
    setState(!state);
    setItems([]);
    localStorage.setItem('post-by/cart', JSON.stringify([]));
  }

  async function handleReserve() {
    if (!isAuthenticated) {
      toast.error('Entre em uma conta para reservar!');
      return;
    }

    const { TotalPrice, TotalQuantity } = items.reduce((a, b) => ({
      TotalPrice: a.TotalPrice + b.TotalPrice,
      TotalQuantity: a.quantity + b.quantity,
    }));

    setIsLoading(true);
    try {
      await getUserEmail();
      await sendEmail(email);
      const reserveObj = {
        userEmail: email,
        items,
        totalPrice: TotalPrice,
        totalQuantity: TotalQuantity,
      };
      await createReserve(reserveObj);
      handleEmpty();
      toast.success('Reserva Criada');
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  async function getUserEmail() {
    const user = await Auth.currentAuthenticatedUser();
    setEmail(user.attributes.email);
  }

  function sendEmail(userEmail) {
    return API.post('post-by', '/email', {
      body: { userEmail },
    });
  }

  function createReserve(reserve) {
    return API.post('post-by', '/reserve', {
      body: reserve,
    });
  }

  return (
    <>
      <Header />
      <div className="CartBody">
        <h1>Carrinho</h1>
        {items.length === 0 ? (
          <div className="CartPlaceholder">
            <h2>Para que você ainda não adicionou items ao carrinho.</h2>
            <Link to="/">Ir as compras</Link>
          </div>
        ) : (
          <div className="CartItems">
            {items.map(
              ({ imgUrl, name, price, quantity, totalQuantity }, index) => (
                <CartItem
                  key={index}
                  index={index}
                  imgUrl={imgUrl}
                  name={name}
                  price={price}
                  quantity={quantity}
                  totalQuantity={totalQuantity}
                  remove={handleDelete}
                  update={handleUpdate}
                />
              )
            )}
            <div className="CartInfo">
              <h2>Total: R$ {(totalPrice || 0).toFixed(2)}</h2>
            </div>
            <div className="CartOptions">
              <LoaderButton
                className="CartReserve"
                isLoading={isLoading}
                onClick={handleReserve}
              >
                Fazer reserva
              </LoaderButton>
              <button className="CartDelete" onClick={handleEmpty}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
