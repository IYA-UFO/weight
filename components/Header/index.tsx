import styled from 'styled-components';
import { useContext } from 'react';
import firebase from 'firebase/app';
import { UserContext } from '../../pages/index';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
      });
  };
  return (
    <Wrap>
      <Logo>
        <img src="/logo.png" />
      </Logo>
      <Account onClick={user ? logOut : login}>
        <img src="/account.png" />
      </Account>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  padding: 8px;
  width: 50px;
`;

const Account = styled.button`
  padding: 8px;
  width: 50px;
`;

export default Header;
