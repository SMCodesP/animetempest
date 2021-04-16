import firebase from 'firebase/app'
import 'firebase/database'

interface FirebaseResult {
  db: firebase.database.Database
}

const config = {
  apiKey: 'AIzaSyBUiuYZ12cKQ2pBO0a2BXeb9m-paWLKoyY',
  authDomain: 'animetempest-4b28f.firebaseapp.com',
  databaseURL: 'https://animetempest-4b28f-default-rtdb.firebaseio.com',
  projectId: 'animetempest-4b28f',
  storageBucket: 'animetempest-4b28f.appspot.com',
  messagingSenderId: '1007341081560',
  appId: '1:1007341081560:web:12a165058855b192ce58ad',
  measurementId: 'G-E4DQTTL97J',
}

export default function firebaseInit(): FirebaseResult {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  } else {
    firebase.app() // if already initialized, use that one
  }

  return { db: firebase.database() }
}
