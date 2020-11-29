import firebase from 'firebase/app';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Question } from '../../models/Question';
import useAuthentication from '../../hooks/authentication';

export default function QuestionsReceived() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { user } = useAuthentication();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadQuestions() {
      const snapshot = await firebase
        .firestore()
        .collection('questions')
        .where('receiverUid', '==', user.uid)
        .orderBy('createAt', 'desc')
        .get();
      console.log({ user });

      if (snapshot.empty) {
        console.log('isEmpty');
        return;
      }

      const gotQuestions = snapshot.docs.map((doc) => {
        const question = doc.data() as Question;
        question.id = doc.id;
        return question;
      });
      setQuestions(gotQuestions);
    }
    loadQuestions();
  }, [process.browser, user]);

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <div>{question.body}</div>
          <small>
            {dayjs(question.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}
          </small>
        </div>
      ))}
    </div>
  );
}
