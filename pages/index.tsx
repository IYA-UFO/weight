import Head from 'next/head';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
// import useAuthentication from '../hooks/authentication';
import fetchPastWeights from '../hooks/fetchPastWeights';

import styled from 'styled-components';

import HeadElement from '../components/HeadElement';
import WeightInputArea from '../components/WeightInputArea';

const Home = () => {
  // const { user } = useAuthentication();
  const [currentWeight, setCurrentWeight] = useState(75);
  const [isSending, setIsSending] = useState(false);
  const pastWeights = fetchPastWeights();

  const [user, setUser] = useState(null);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    if (user !== null) {
      return;
    }

    login();

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: '',
        };
        setUser(loginUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <HeadElement />
      <Content>
        <WeightInputArea />
        {user ? (
          <button onClick={logout}>Google Logout</button>
        ) : (
          <button onClick={login}>Google Login</button>
        )}
        {pastWeights.map(({ weight }, index) => (
          <p key={index}>{weight}</p>
        ))}
      </Content>
    </>
  );
};

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default Home;
