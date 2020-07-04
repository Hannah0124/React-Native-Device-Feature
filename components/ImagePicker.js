import React from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // open camera!
import Colors from '../constants/Colors';
import * as Permissions from 'expo-permissions'; //  expo install expo-permissions

const ImgPicker = props => {

  // Ask permission for IOS (Android doesnt need this!)
  const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL) // ask for Camera permission
    // Permissions.askAsync(Permissions.CAMERA_ROLL) // Galllery permission

    if (result.status != 'granted') {
      Alert.alert(
        'Insufficient permissions!', 
        'You need to grant camera permissions to use this app', 
        [{text: 'Okay'}]
      );

      return false;
    }

    return true; // permission granted
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return; // cannot continue
    }

    // can continue
    ImagePicker.launchCameraAsync(); // it's async because we dont know when a user will open a camera!

  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
        <Button 
          title="Take Image" 
          color={Colors.primary} 
          onPress={takeImageHandler} // open up the camera, and display it to the user
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;