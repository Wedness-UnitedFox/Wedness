import AsyncStorage from '@react-native-community/async-storage'
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'


export default function ProfileScreen(props) {
  const [selectedImage, setSelectedImage] = useState(null)
    const dispatch = useDispatch()
    const {navigation} = props
    const logout = () =>{
      console.log("logout")
      firebaseSDK.onLogout() 
      dispatch({
          type:"LOGOUT"
      })
      AsyncStorage.clear() 
      navigation.replace('Login')
    }

    const openImagePickerAsync = async () => {
      const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      if (pickerResult.cancelled === true) {
        return;
      }
      console.log(pickerResult.uri)
      setSelectedImage({ localUri: pickerResult.uri });
    }

    const openShareDialogAsync = async () => {
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }
  
      await Sharing.shareAsync(selectedImage.localUri);
    }; 

    return (
      <View style={{ flex: 1, marginTop:55, alignItems: 'center', flexDirection:"column"}}>
        <Button style={{alignSelf:'flex-end', marginRight:20}} color="red" mode="outlined" onPress={logout}>LOGOUT</Button>
        <View style={{width:'100%',flexDirection:"row", justifyContent:"center", paddingVertical:20}}>
          <Text style={{fontSize:25}}>Hai </Text>
          <Text style={{fontSize:26}}>{firebaseSDK.displayName?firebaseSDK.displayName: firebaseSDK.email}!</Text> 
        </View>
          {selectedImage?.localUri 
          ? <View style={styles.container}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
              />
              <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick another photo</Text>
              </TouchableOpacity>
            </View> 
          
          : <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
              <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
          }        
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});