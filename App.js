import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyAzMfLSsXjNJHyadqMRnxQZXjWd4aKvo_s",
      authDomain: "tinderformemes-ec041.firebaseapp.com",
      databaseURL: "https://tinderformemes-ec041.firebaseio.com",
      projectId: "tinderformemes-ec041",
      storageBucket: "",
      messagingSenderId: "1030706858467"
    });  

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      }else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
  renderContent() {
    switch (this.state.loggedIn) {
      case true: 
        return (
          <Button 
            text="Log Out!!"
            onPress={ () => firebase.auth().signOut() }
          />
        );
      case false:
        return <LoginForm/> ;
      
      default:
        return <Spinner size='large'/> ;
    }
  }

  render() {
    return (
      <View>
        <Header name='Firebase' />
        {this.renderContent()}
      </View>
    );
  }
}
