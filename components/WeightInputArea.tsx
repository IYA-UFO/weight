import firebase from 'firebase/app';
import { useState } from 'react';
import useAuthentication from '../hooks/authentication';

const WeightInputArea = () => {
  const { user } = useAuthentication();
  const [currentWeight, setCurrentWeight] = useState(75);
  const [isSending, setIsSending] = useState(false);

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
    </>
  );
};

export default WeightInputArea;
