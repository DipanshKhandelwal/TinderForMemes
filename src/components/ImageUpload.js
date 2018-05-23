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
          const image = response.uri


          const Blob = RNFetchBlob.polyfill.Blob
          const fs = RNFetchBlob.fs
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
          window.Blob = Blob
      
        
          let uploadBlob = null
          const imageRef = firebase.storage().ref('memes').child("test.jpg")
          let mime = 'image/jpg'
          fs.readFile(image, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              // URL of the image uploaded on Firebase storage
              console.log(url);
              
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
