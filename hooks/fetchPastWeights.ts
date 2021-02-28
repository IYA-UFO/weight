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

const average = (arr) =>
  arr.reduce(function (prev, current, i, arr) {
    return prev + current;
  }) / arr.length;

const useFetchPastWeight = () => {
  const user = useContext(UserContext);
  const [data, setData] = useState({
    weeks: [],
    minWeight: 0,
    maxWeight: 0,
    ticks: [],
    records: [],
  });

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
      /*
       *データのフェッチ
       */
      const snapshot = await firebase
        .firestore()
        .collection('weights')
        .where('uid', '==', user.uid)
        // .where('uid', '==', 'QtVvAD35ptaswyhPrNPNdCIQD7B3')
        .get();

      console.log({ snapshot });

      /*
       *日付別データの整形・週IDの付与
       */
      const records = snapshot.docs.map((doc) => {
        const date = dayjs(doc.data().createdAt.toDate());
        return {
          weight: doc.data().weight,
          date: date,
          weekId: `${date.year()}-${('00' + date.week()).slice(-2)}`,
        };
      });
      console.log({ records });

      /*
       *週ごとの配列を作成
       */
      const weekIds = uniq(records.map(({ date, weekId }) => weekId)).sort();
      const weeks = weekIds.map((weekId) => {
        const recordsOfWeek = records
          .filter((record) => weekId === record.weekId)
          .sort((a, b) => {
            return a.date.unix() - b.date.unix();
          });
        const averageWeight = average(
          recordsOfWeek.map((record) => record.weight),
        );

        return {
          weekId,
          averageWeight,
          firstDay: recordsOfWeek[0].date.format('MM/DD'),
          records: recordsOfWeek,
        };
      });

      /*
       *最大・最小値を割り出す
       */
      const weights = records.map(({ weight }) => weight);
      const maxWeight = Math.max(...weights);
      const minWeight = Math.min(...weights);

      /*
       *Y軸の目盛りリスト
       */
      const integerArr = [...Array(100).keys()];
      const ticks = integerArr.filter((num) => {
        return num > minWeight - 2 && num < maxWeight + 2;
      });
      setData({
        weeks,
        maxWeight,
        minWeight,
        ticks,
        records,
      });
    }
    loadPastWeights();
  }, [process.browser, user]);
  return data;
};

export default useFetchPastWeight;
