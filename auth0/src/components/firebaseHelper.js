import {database} from '../firebase';
import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  collection,
  getDocFromServer,
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

export function joinEvent(user, eventName, eventDate, eventid) {
  // Event should be a string
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  setDoc(
    docRef,
    {
      [eventid]: {
        eventName: eventName,
        eventDate: eventDate,
      },
    },
    {merge: true},
  );
  return;
}

export function leaveEvent(user, eventid) {
  // Event should be a string
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  console.log(eventid);
  console.log(user);
  updateDoc(docRef, {[eventid]: deleteField()});
  return;
}

// Events created by the user
export function createEvent(user, eventName, eventDate, eventid) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'myEvents');
  setDoc(
    docRef,
    {
      [eventid]: {
        eventName: eventName,
        eventDate: eventDate,
      },
    },
    {merge: true},
  );
  docRef = doc(colRef, 'events');
  setDoc(
    docRef,
    {
      [eventid]: {
        eventName: eventName,
        eventDate: eventDate,
      },
    },
    {merge: true},
  );
  return;
}

export function deleteEvent(user, eventid) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'myEvents');
  updateDoc(docRef, {[eventid]: deleteField()});
  return;
}

export async function getAllEvents(user) {
  let userId = user.email;
  let colRef = collection(database, userId);
  let docRef = doc(colRef, 'events');
  const obj = await getDocFromServer(docRef);
  console.log(obj.data());
  return obj.data();
}
