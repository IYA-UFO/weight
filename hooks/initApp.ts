import firebase from 'firebase/compat/app';
import { useEffect, useContext } from 'react';
import initFirebase from '../lib/initFirebase';
import { DataContext } from 'context/DataContextProvider';

const useInitApp = () => {
  const dataContext = useContext(DataContext);
  useEffect(() => {
    //firebase初期化
    if (firebase.apps.length === 0) {
      initFirebase();
    }

    //firebaseログイン済みの場合、UIDをReactに渡す
    firebase.auth().getRedirectResult();

    //firebaseログイン状態が変わったら、Reactに知らせる
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        dataContext.setHasFirebaseUser(true);
      }
    });
  }, []);
};

export default useInitApp;
