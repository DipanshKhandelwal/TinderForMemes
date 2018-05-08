import React from 'react';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './src/Router';

export default class App extends React.Component {

  componentWillMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyAzMfLSsXjNJHyadqMRnxQZXjWd4aKvo_s",
      authDomain: "tinderformemes-ec041.firebaseapp.com",
      databaseURL: "https://tinderformemes-ec041.firebaseio.com",
      projectId: "tinderformemes-ec041",
      storageBucket: "",
      messagingSenderId: "1030706858467"
    });  
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <Router />
      </Provider>
    );
  }
}
