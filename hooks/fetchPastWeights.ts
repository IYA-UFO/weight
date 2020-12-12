import { useContext } from 'react';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { UserContext } from '../pages/index';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

function uniq(array) {
  return [...new Set(array)];
}

const useFetchPastWeight = () => {
  const user = useContext(UserContext);
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
        // .where('uid', '==', user.uid)
        .where('uid', '==', 'QtVvAD35ptaswyhPrNPNdCIQD7B3')
        .get();

      if (snapshot.empty) {
        console.log('snapshotIsEmpty');
        return;
      }

      const records = snapshot.docs.map((doc) => {
        const date = dayjs(doc.data().createdAt.toDate());
        return {
          weight: doc.data().weight,
          date: date,
          week: `${date.year()}-${date.week()}`,
        };
      });
      const weeks = uniq(records.map(({ date, week }) => week)).sort();
      const result = weeks.map((week) => {
        const recordsOfWeek = records.filter((record) => week === record.week);
        return {
          week,
          records: recordsOfWeek.sort((a, b) => {
            return a.date - b.date;
          }),
        };
      });
      console.log({ result });
      setPastWeights(result);
    }
    loadPastWeights();
  }, [process.browser, user]);
  return pastWeights;
};

export default useFetchPastWeight;
