import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Header name="Tinder for Memes"/>
      </View>
    );
  }
}
