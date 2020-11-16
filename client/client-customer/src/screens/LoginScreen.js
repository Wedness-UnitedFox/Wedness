import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseSDK from '../firebase/index';
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux"
import {login} from '../store/actions/wednessAction'
import { TextInput, Button } from 'react-native-paper';
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
    
    // useEffect(()=>{ 
    //     // if(data.isLogin || firebaseSDK.uid){
    //         console.log(data.access_token,"<--- TOKEN",firebaseSDK.uid);
    //     if(data.access_token){
    //         console.log("user already Loggedin");
    //     }
    // },[data])

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
