import Head from 'next/head';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import useAuthentication from '../hooks/authentication';
import fetchPastWeights from '../hooks/fetchPastWeights';

import styled from 'styled-components';

const Home = () => {
  const { user } = useAuthentication();
  const [currentWeight, setCurrentWeight] = useState(75);
  const [isSending, setIsSending] = useState(false);
  const pastWeights = fetchPastWeights();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    await firebase.firestore().collection('weights').add({
      uid: firebase.auth().currentUser.uid,
      weight: currentWeight,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSending(false);
    alert('質問を送信しました');
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <h2>登録</h2>
        <p>ID:{user?.uid}</p>
        <form onSubmit={onSubmit}>
          <input
            type="number"
            min="50"
            max="90"
            step="0.1"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(Number(e.target.value))}
          ></input>
          <div>
            {isSending ? <p>登録中</p> : <button type="submit">登録</button>}
          </div>
        </form>
        <h2>過去</h2>
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
