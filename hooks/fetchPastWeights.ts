import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

const useFetchPastWeight = () => {
  const [pastWeights, setPastWeights] = useState([]);

  useEffect(() => {
    if (firebase.apps.length === 0) {
      return null;
    }
    const user = firebase.auth().currentUser;
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadPastWeights() {
      const snapshot = await firebase
        .firestore()
        .collection('weights')
        .where('uid', '==', user.uid)
        .get();

      if (snapshot.empty) {
        console.log('isEmty');
        return;
      }

      const dataArr = snapshot.docs.map((doc) => ({
        weight: doc.data().weight,
        date: doc.data().createdAt.toDate(),
      }));
      setPastWeights(dataArr);
    }
    loadPastWeights();
  }, [process.browser]);
  return pastWeights;
};

export default useFetchPastWeight;
