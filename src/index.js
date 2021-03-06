import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore, combineReducers } from "redux";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

const fbConfig = {
  apiKey: ,
  authDomain: ,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId:,
  appId: ,
  measurementId: ,
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData, firebase) => {
    // how profiles are stored in database
    return {
      parentName: "unknown",
      childName: "unknown",
      phone: "0000000000",
      day: {
        steps: []
      }
    };
  },
};

firebase.initializeApp(fbConfig);

firebase.firestore();

firebase.firestore().settings({
  ignoreUndefinedProperties: true,
});

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
