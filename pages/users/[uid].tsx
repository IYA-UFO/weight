import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '../../models/User';

type Query = {
  uid: string;
};

export default function UserShow() {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const query = router.query as Query;
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    await firebase.firestore().collection('questions').add({
      senderUid: firebase.auth().currentUser.uid,
      receiverUid: user.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSending(false);
    setBody('');
    alert('質問を送信しました');
  }

  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get();

      if (!doc.exists) {
        return;
      }

      const gotUser = doc.data() as User;
      gotUser.uid = doc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.uid]);
  return (
    <>
      <h1 className="h4">{user?.name}さんのページ</h1>
      <div className="m-5">{user?.name}さんに質問しよう！</div>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="おげんきですか？"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div>
          {isSending ? (
            <p>送信中</p>
          ) : (
            <button type="submit">質問を送信する</button>
          )}
        </div>
      </form>
    </>
  );
}
