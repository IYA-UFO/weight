import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'dayjs/locale/ja';
import GlobalStyles from '../styles/global';
import React, { useEffect, useState } from 'react';
import initFirebase from '../lib/initFirebase';

import Main from 'components/Main';

export const UserContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (firebase.apps.length === 0) {
      initFirebase();
    }
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.user) {
          setUser({
            uid: result.user.uid,
          });
        }
      });

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser = {
          uid: firebaseUser.uid,
        };
        setUser(loginUser);
      }
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Main />
      </UserContext.Provider>
    </>
  );
};

export default Home;
