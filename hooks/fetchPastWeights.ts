import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import useAuthentication from '../hooks/authentication';

const useFetchPastWeight = () => {
  const [pastWeights, setPastWeights] = useState([]);
  const { user } = useAuthentication();

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadPastWeights() {
      console.log('loadPastWeights');

      const snapshot = await firebase
        .firestore()
        .collection('weights')
        .where('uid', '==', user.uid)
        .get();

      if (snapshot.empty) {
        return;
      }

      const gotWeights = snapshot.docs.map((doc) => {
        const weight = doc.data();
        weight.id = doc.id;
        return weight;
      });
      setPastWeights(gotWeights);
    }
    loadPastWeights();
  }, [process.browser, user]);
  return pastWeights;
};

export default useFetchPastWeight;
