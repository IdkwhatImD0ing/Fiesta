import {database} from '../firebase';
import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  collection,
  getDocFromServer,
  deleteDoc,
} from 'firebase/firestore';

export function changeName(user, name) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'userInformation');
  setDoc(docRef, {[name]: 1}, {merge: true});
  return;
}

export function changeDisplayName(user, name) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'userInformation');
  setDoc(docRef, {displayName: name}, {merge: true});
  return;
}

export function changeEmail(user, email) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'userInformation');
  setDoc(docRef, {email: email}, {merge: true});
  return;
}

export function joinEvent(user, eventid, eventName, eventDate) {
  // Event should be a string
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  setDoc(docRef, {[eventid]: {eventName, eventDate}}, {merge: true});
  return;
}

export function leaveEvent(user, eventid) {
  // Event should be a string
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  updateDoc(docRef, {[eventid]: deleteField()});
  return;
}

// Events created by the user
export function createEvent(user, eventName, eventDate) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'myEvents');
  setDoc(docRef, {[eventName]: {eventDate}}, {merge: true});
  return;
}

export function deleteEvent(user, eventName) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'myEvents');
  updateDoc(docRef, {[eventName]: deleteField()});
  return;
}

export function getAllEvents(user) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  return getDocFromServer(docRef);
}
