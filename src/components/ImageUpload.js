var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker')
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { Button, CardSection, Card } from './common'
  import firebase from 'firebase'
  import RNFetchBlob from 'react-native-fetch-blob'

  export default class ImageUpload extends React.Component {

    state = {link: '' }
    
    getSelectedImages() {
      ImagePicker.showImagePicker((response) => {
        console.log('Response', response);

        if(response.didCancel) {
          console.log('User cancelled');  
        }
        else if (response.error) {
          console.log('Some error', response.error);
        }
        else if (response.customButton) {
          console.log('customButton', response.customButton);
        }else{
          const uploadUri = response.uri


          const Blob = RNFetchBlob.polyfill.Blob
          const fs = RNFetchBlob.fs
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
          window.Blob = Blob
      
        
          const { currentUser } = firebase.auth();
          const image = Platform.OS === 'ios' ? uploadUri.replace('file://', '') : uploadUri
          const sessionId = new Date().getTime()
          
          let uploadBlob = null
          const imageRef = firebase.storage().ref(`/users/${ currentUser.uid }/memes`).child(`${sessionId}`)
          let mime = 'image/jpg'
          fs.readFile(image, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
              uploadBlob = blob
              console.log('started')
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              console.log('ended')
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              // URL of the image uploaded on Firebase storage
              console.log('this is url');
              console.log(url);
              this.setState({ link: url })
              
            })
            .catch((error) => {
              console.log(error);
            })  
        }
      });
    }
  
    render() {
   
      return (
        <Card>
          <CardSection>
            <Text>
              {this.state.link}
            </Text>
          </CardSection>
          <CardSection>
            <Button
              text='Pick Image'
              onPress={this.getSelectedImages.bind(this)} />
          </CardSection>
        </Card>
      );
    }
  }
   
  const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};
