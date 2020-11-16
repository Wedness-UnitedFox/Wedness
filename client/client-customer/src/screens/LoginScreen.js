import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebaseSDK from '../firebase/index';
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux"
import {login} from '../store/actions/wednessAction'
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
    
    useEffect(()=>{ 
        // if(data.isLogin || firebaseSDK.uid){
            console.log(data.access_token,"<--- TOKEN",firebaseSDK.uid);
        if(data.access_token){
            console.log("user already Loggedin");
            const response = firebaseSDK.login(userData,loginSuccess,loginFailed)
        }
    },[data])


	const onPressLogin = async () => {
		const user = {
			name: userData.name,
			email: userData.email,
			password: userData.password,
			avatar: userData.avatar
        };
        dispatch(login({email:user.email,password:user.password})) 
	};

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
        <View>
            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.nameInput}
                placeHolder="test3@gmail.com"
                onChangeText={onChangeTextEmail}
                value={userData.email}
            />
            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.nameInput}
                onChangeText={onChangeTextPassword}
                value={userData.password}
            />
            <Button
                title="Login"
                style={styles.buttonText}
                onPress={onPressLogin}
            />

            <Button
                title="Signup"
                style={styles.buttonText}
                color={'black'}
                // onPress={() => props.navigation.navigate('Signup')}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({
	title: {
		marginTop: 16,
		marginLeft: 16,
		fontSize: 16
	},
	nameInput: {
		height: 16 * 2,
		margin: 16,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
		fontSize: 16
	},
	buttonText: {
		marginLeft: 16,
        fontSize: 42,
        
	}
});
