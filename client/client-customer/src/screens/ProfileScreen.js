import React from 'react'
import {View} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'


export default function ProfileScreen(props) {
    const dispatch = useDispatch()
    const {navigation} = props
    const logout = () =>{
      console.log("logout")
      firebaseSDK.onLogout() 
      dispatch({
          type:"LOGOUT"
      })
      navigation.replace('Login')
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button onPress={logout}>LOGOUT</Button>
      </View>
    );
  }