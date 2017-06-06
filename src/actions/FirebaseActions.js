import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { firebaseAuth, firebaseDb } from '../firebase';
import store from '../store';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';


let userRef = null;
const usersRef = firebaseDb.ref('users');

export function createNewTrip(trip) {
  userRef.child('saved').push(trip);
  return {
    type: 'CREATE_NEW_TRIP',
  };
}

export function createAnyTrip(type, trip) {
  userRef.child(type).push(trip);
  return {
    type: 'CREATE_NEW_TRIP',
  };
}

export function updateSavedTrip(trip, id) {
  userRef.child('saved').child(id).set({ ...trip });
  return {
    type: 'UPDATE_TRIP',
  };
}

export function removeTrip(type, id) {
  const removeRef = userRef.child(type);
  removeRef.child(id).remove();
  removeRef.once('value', (snap) => {
    if (!snap.val()) {
      removeRef.set(false);
    }
  }); // check for empty trips and set to false if empty

  return {
    type: 'REMOVE_TRIP',
  };
}

function setUserData(userData) {
  return {
    type: 'SET_USER_DATA',
    payload: userData,
  };
}

function setUserRef(uid) {
  userRef = usersRef.child(uid);
  // console.log('uid: ', uid);
  // console.log('userRef: ', userRef);
  userRef.once('value', (snap) => {
    // console.log('snap.val(): ', snap.val());
    if (!snap.val()) {
      // console.log('CREATING NEW USER');
      userRef.set({
        saved: false,
        current: false,
        previous: false,
      });
    }
  });

  store.dispatch((dispatch) => {
    // userRef.off();
    userRef.on('value', (snap) => {
      // console.log('SETTING USER DATA');
      dispatch(setUserData(snap.val()));
    }, (err) => {
      console.log('ERROR: ', err);
    });
  });
}

function signInSuccess(result) {
  setUserRef(result.user.uid);
  // console.log('SIGN IN SUCCESS: ', result);
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: result.user,
  };
}

function initAuthSuccess(user) {
  setUserRef(user.uid);
  // console.log('INIT AUTH: ', user);
  return {
    type: 'INIT_AUTH_SUCCESS',
    payload: user,
  };
}

function signInError(err) {
  return {
    type: 'SIGN_IN_ERROR',
    payload: err,
  };
}

function initAuthError(err) {
  return {
    type: 'INIT_AUTH_ERROR',
    payload: err,
  };
}

function signOutSuccess() {
  userRef.off();
  userRef = null;
  return {
    type: 'SIGN_OUT_SUCCESS',
  };
}

function authenticate(provider) {
  return (dispatch) => {
    firebaseAuth.signInWithPopup(provider)
    .then(result => dispatch(signInSuccess(result)))
    .catch(err => dispatch(signInError(err)));
  };
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

export function signOut() {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          dispatch(initAuthSuccess(user));
        }
        unsub();
        resolve();
      },
      (error) => {
        dispatch(initAuthError(error));
        reject(error);
      }
     );
  });
}

export function signUpUser(credentials) {
  console.log('credentials: ', this);
  console.log('password: ', credentials.email);

   return function (dispatch) {
    firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)

      .then(response => {
        setUserRef(response.uid);
        })
      .then(response => {
        dispatch (authUser());
        browserHistory.push('/my-trips');
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch(authError(error));
      });
   }
}

export function signInUser(credentials) {
  console.log('credentials: ', credentials);
  return function (dispatch) {
  firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(response => {

      dispatch(initAuthSuccess(response));
      browserHistory.push('/my-trips')
    })
    .catch(error => {
      console.log('error: ', error);
      dispatch(authError(error));
    });
  };
}
export function signOutUser() {
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER,
  };
}


export function authUser() {
  return {
    type: AUTH_USER,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
