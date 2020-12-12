import firebase from 'firebase/app';
import { useState } from 'react';
import styled from 'styled-components';

const WeightInputArea = () => {
  const [currentWeight, setCurrentWeight] = useState(null);
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
    alert('体重を登録しました');
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          type="number"
          inputMode="decimal"
          step="0.1"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(Number(e.target.value))}
        />
        <div>
          {isSending ? <p>登録中</p> : <Button type="submit">登録</Button>}
        </div>
      </form>
    </>
  );
};
const Input = styled.input`
  border: 1px solid gray;
  font-size: 20px;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  padding: 5px 10px;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: purple;
  font-size: 20px;
  padding: 5px 30px;
  color: white;
  text-align: center;
  margin: 10px auto;
  display: block;
`;

export default WeightInputArea;
