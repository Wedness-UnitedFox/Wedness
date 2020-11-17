import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseSDK from '../firebase/index';
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux"
import {login} from '../store/actions/wednessAction'
import { TextInput, Button } from 'react-native-paper';
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// import { Button } from 'react-native-paper';  

export default function Login(props){
    const data = useSelector(state=>state.Reducer)
    const dispatch = useDispatch()
	const navigationOptions = {
		title: 'RN + Firebase Chat App'
    };
	const [userData, setUserData] = useState({
		name: 'tester',
		email: 'testing@mail.com',
		password: '123456',
		avatar: ''
    })
    
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(()=>{ 
        AsyncStorage.getItem('access_token')
            .then(value=>{
                console.log(value, "<--ASYNCSTORAGE");
                if(value && firebaseSDK.uid){
                    console.log("user already Loggedin"); 
                    props.navigation.replace('Home', {
                        name: userData.name,
                        email: userData.email,
                        avatar: userData.avatar
                    });
                }
            })
            .catch(err=>console.log(err))
        // if(data.isLogin || firebaseSDK.uid){
        //     console.log(data.access_token,"<--- TOKEN",firebaseSDK.uid);
        // if(data.access_token){
        //     console.log("user already Loggedin");
        // }

    },[])

    function trigger () {
        const response = firebaseSDK.login(userData,loginSuccess,loginFailed)

    }

	const onPressLogin = async () => {
		const user = {
			name: userData.name,
			email: userData.email,
			password: userData.password,
			avatar: userData.avatar
        };
        dispatch(login({email:user.email,password:user.password}, trigger)) 
    };
    
    const onPressRegister = () => {
        props.navigation.navigate('Register')
    }

	const loginSuccess = async () => {
        console.log('login successful, navigate to chat.'); 
        setStorage()
        const curr_user = await firebase.auth().currentUser
        setCurrentUser(curr_user)
        await registerForPushNotificationsAsync()
		props.navigation.replace('Home', {
			name: userData.name,
			email: userData.email,
			avatar: userData.avatar
		});
    };
    
    const setStorage = async ()=>{ 
        console.log(firebaseSDK.uid,"<<<",firebaseSDK.email);
        const _id = firebaseSDK.uid
        const name = firebaseSDK.displayName || firebaseSDK.email
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user)) 
    }

	const loginFailed = (message) => {
        console.log(message);
		alert(message);
	};

	const onChangeTextEmail = email => setUserData({...userData, email });
	const onChangeTextPassword = password => setUserData({...userData, password });
 
    return (
        <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}> 
            <TextInput
                style={styles.input} 
                label="Email"
                onChangeText={onChangeTextEmail}
                value={userData.email}
            /> 
            <TextInput
                style={styles.input}
                label="Password"
                onChangeText={onChangeTextPassword}
                value={userData.password}
            />
            <Button
                title="Login"
                mode="contained"
                style={styles.buttonText}
                onPress={onPressLogin}
                > Login </Button>

            <Button
                title="Signup"
                style={styles.buttonText}
                color={'black'} 
                onPress={onPressRegister}
            > Sign up </Button>
        </View>
    ); 
}

const styles = StyleSheet.create({
	title: {
		marginTop: 16,
		marginLeft: 16,
		fontSize: 16
	},
	input: { 
        borderRadius:15, 
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        alignSelf:'center',
        margin: 16,
        width:"70%",
		paddingHorizontal: 16,
		fontSize: 16
	},
	buttonText: {
        alignSelf:'center', 
        fontSize: 42,
        paddingVertical:20, 
        width:"70%",
	}
});

const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token, '===> token after login');
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if(token){
      const res = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .set({token}, { merge: true })
    }
    
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}