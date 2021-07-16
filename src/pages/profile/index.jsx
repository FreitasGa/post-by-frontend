import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';

import { useAppContext } from '../../libs/contextLib';
import { Header } from '../../components/header';
import { ProfileItem } from '../../components/profileItem';
import PersonIcon from '@material-ui/icons/Person';
import './styles.scss';

export function Profile() {
  const { isAuthenticated } = useAppContext();

  const sessionReserves = JSON.parse(
    sessionStorage.getItem('post-by/reserves')
  );

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [reserves, setReserves] = useState(sessionReserves || []);
  const [state, setState] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        await getUserAttributes();
        const reserves = await API.get('post-by', '/reserve');
        setReserves(reserves);
        sessionStorage.setItem('post-by/reserves', JSON.stringify(reserves));
      } catch (error) {
        console.error(error.message);
      }
    }

    onLoad();
  }, [state, isAuthenticated]);

  async function getUserAttributes() {
    const user = await Auth.currentAuthenticatedUser();
    const { name, email } = user.attributes;
    setName(name);
    setEmail(email);
  }

  function update() {
    setState(!state);
  }

  return (
    <>
      <Header />
      <div className="ProfileBody">
        <h1>Perfil</h1>
        <div className="ProfileWrapper">
          <div className="ProfileCard">
            <PersonIcon className="ProfileIcon" fontSize="large" />
            <div className="CardText">
              <h2>{name}</h2>
              <b>{email}</b>
            </div>
          </div>
          <div className="ReserveHistory">
            {reserves.length === 0 ? (
              <div className="ReserveHistoryPlaceholder">
                <h2>Parece que você ainda não fez reservas</h2>
                <Link to="/">Ir as compras</Link>
              </div>
            ) : (
              <div className="ReserveHistoryItems">
                {reserves.map(
                  ({ items, reserveId, totalPrice, totalQuantity }, index) => (
                    <ProfileItem
                      key={index}
                      items={items}
                      reserveId={reserveId}
                      totalPrice={totalPrice}
                      totalQuantity={totalQuantity}
                      callback={update}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
