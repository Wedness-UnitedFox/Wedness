import AsyncStorage from '@react-native-community/async-storage'
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
      AsyncStorage.clear() 
      navigation.replace('Login')
    }
    return (
      <View style={{ flex: 1, marginTop:55, alignItems: 'center', flexDirection:"column"}}>
        <Button style={{alignSelf:'flex-end', marginRight:20}} color="red" mode="outlined" onPress={logout}>LOGOUT</Button>
        <View style={{width:'100%',flexDirection:"row", justifyContent:"center", paddingVertical:20}}>
          <Text style={{fontSize:25}}>Hai </Text>
          <Text style={{fontSize:26}}>{firebaseSDK.displayName?firebaseSDK.displayName: firebaseSDK.email}!</Text> 
        </View>
      </View>
    );
  }