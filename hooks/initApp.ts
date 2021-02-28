import firebase from 'firebase/app';
import { useEffect } from 'react';
import initFirebase from '../lib/initFirebase';

const useInitApp = (setUser) => {
  useEffect(() => {
    //firebase初期化
    if (firebase.apps.length === 0) {
      initFirebase();
    }

    //firebaseログイン済みの場合、UIDをReactに渡す
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.user) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      });

    //firebaseログイン状態が変わったら、Reactに知らせる
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
  }, []);
};

export default useInitApp;
