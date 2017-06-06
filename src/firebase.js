import firebase from 'firebase';

// Mig's api keys

const config = {
  apiKey: 'AIzaSyCaWpX2l-1xUmYGXzWPTyYONs08LiwHLao',
  authDomain: 'tripify-a5149.firebaseapp.com',
  databaseURL: 'https://tripify-a5149.firebaseio.com',
  storageBucket: 'tripify-a5149.appspot.com',
  messagingSenderId: '895071215351',
};


// // Z's api keys
// const config = {
//   apiKey: 'AIzaSyAiPaxx9QsCHft6xnKSfPOtKgEMXgrgIY0',
//   authDomain: 'test-app-7a5c0.firebaseapp.com',
//   databaseURL: 'https://test-app-7a5c0.firebaseio.com',
//   storageBucket: 'test-app-7a5c0.appspot.com',
//   messagingSenderId: '803419720138',
// };

// holly api keys
// const config = {
//  apiKey: 'AIzaSyCq5Z3C4LQ9RBKeTRVHxMojiVVtaLr0vhs',
//  authDomain: 'moon-6244f.firebaseapp.com',
//  databaseURL: 'https://moon-6244f.firebaseio.com',
//  storageBucket: 'moon-6244f.appspot.com',
//  messagingSenderId: '684869793339',
// };
// Dustin's api keys
// const config = {
//   apiKey: "AIzaSyBhjDmU4Rb3YYaJVsUevi6_IUG7xx9Oa5M",
//   authDomain: "test123-1e63d.firebaseapp.com",
//   databaseURL: "https://test123-1e63d.firebaseio.com",
//   storageBucket: "test123-1e63d.appspot.com",
//   messagingSenderId: "315763032189"
// };


export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
