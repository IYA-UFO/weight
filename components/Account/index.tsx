import { useContext } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';

import { UserContext } from 'pages/index';

const Account = () => {
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    if (user) {
      firebase
        .auth()
        .signOut()
        .then(function () {
          setUser(null);
        });
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  };

  return (
    <Wrap>
      {user && <UserId>{user.displayName}</UserId>}
      <Icon onClick={handleClick}>
        <img src={`/account/${user ? 'logout' : 'login'}.png`}></img>
        <span>{user ? 'ログアウト' : 'ログイン'}</span>
      </Icon>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  flex-grow: 1;
`;

const UserId = styled.p`
  text-align: center;
  color: #00214d;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  width: 80px;
  span {
    display: block;
    margin-top: 15px;
    text-align: center;
    color: #00214d;
    letter-spacing: 0.03em;
    font-size: 16px;
  }
`;

export default Account;
