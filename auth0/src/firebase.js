// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDQYGugQP_sjPQYQtORst_VM4EMKO_t1wo',
  authDomain: 'eventcoordinator-9d31d.firebaseapp.com',
  projectId: 'eventcoordinator-9d31d',
  storageBucket: 'eventcoordinator-9d31d.appspot.com',
  messagingSenderId: '93153700234',
  appId: '1:93153700234:web:e8bcd2e95ed6667b724073',
  measurementId: 'G-QJSRGSJ4HP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);
