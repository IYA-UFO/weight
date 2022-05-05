import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const InitFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAO9YN5X6IXMeCAuOoVxUeFPVFBbpVcrS0',
    authDomain: 'weight-fa4e5.firebaseapp.com',
    databaseURL: 'https://weight-fa4e5.firebaseio.com',
    projectId: 'weight-fa4e5',
    storageBucket: 'weight-fa4e5.appspot.com',
    messagingSenderId: '1092293647491',
    appId: '1:1092293647491:web:894c330a7c10ed3d7c8fb6',
    measurementId: 'G-6RY3WCX4SG',
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

export default InitFirebase;
