import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import React, { useEffect, useState } from 'react';
import initFirebase from '../lib/initFirebase';

import WeightInputArea from '../components/WeightInputArea';

export const UserContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (firebase.apps.length !== 0) return;
    initFirebase();
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
          uid: result.uid,
        });
      });
  };

  return (
    <UserContext.Provider value={user}>
      {!user && <button onClick={login}>Google Login</button>}
      {JSON.stringify(user, null, 2)}
      <WeightInputArea />
    </UserContext.Provider>
  );
};

export default Home;
