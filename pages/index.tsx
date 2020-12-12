import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'dayjs/locale/ja';
import GlobalStyles from '../styles/global';
import React, { useEffect, useState } from 'react';
import initFirebase from '../lib/initFirebase';
import styled from 'styled-components';
import WeightInputArea from '../components/WeightInputArea';
import PastWeight from '../components/PastWeight';

export const UserContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (firebase.apps.length === 0) {
      initFirebase();
    }
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser = {
          uid: firebaseUser.uid,
        };
        setUser(loginUser);
      }
    });
  }, []);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setUser({
          uid: result.user.uid,
        });
      });
  };

  return (
    <>
      <GlobalStyles />
      <UserContext.Provider value={user}>
        <Wrap>
          {!user && <button onClick={login}>Google Login</button>}
          <WeightInputArea />
          <PastWeight />
        </Wrap>
      </UserContext.Provider>
    </>
  );
};

const Wrap = styled.div`
  padding: 10px;
`;

export default Home;
