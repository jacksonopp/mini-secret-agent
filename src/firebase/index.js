import * as firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2Ss-aWYdQu4KDJRV1QHZ9TqVpMuYsA4w",
  authDomain: "mini-secret-agent-1ec14.firebaseapp.com",
  databaseURL: "https://mini-secret-agent-1ec14.firebaseio.com",
  projectId: "mini-secret-agent-1ec14",
  storageBucket: "mini-secret-agent-1ec14.appspot.com",
  messagingSenderId: "633345815106",
  appId: "1:633345815106:web:1ccd8cc6d6f7e70aa7b3db",
  measurementId: "G-DS44EC0SLM"
}

firebase.initializeApp(firebaseConfig);

export { firebase }