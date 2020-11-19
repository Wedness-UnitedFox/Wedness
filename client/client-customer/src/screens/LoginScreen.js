import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image, ImageBackground} from 'react-native';
import firebaseSDK from '../firebase/index';
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux"
import { login } from '../store/actions/wednessAction'
import { TextInput, Button, Card } from 'react-native-paper';
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { Button } from 'react-native-paper';  
import LANDING from '../../assets/landing.jpg'

export default function Login(props) {
  const data = useSelector(state => state.Reducer)
  const dispatch = useDispatch()
  const [swal, showSwal] = useState(false)
  const [message, setMessage] = useState({title:'',message:''}) 
  const [loading, setLoading] = useState(false)
  const navigationOptions = {
    title: 'RN + Firebase Chat App'
  };
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  })

  const showAlert = () => { 
    showSwal(true)
  };

  const hideAlert = () => {
    showSwal(false)
  };


  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    AsyncStorage.getItem('access_token')
      .then(value => {
        console.log(value, "<--ASYNCSTORAGE", firebaseSDK.uid);
        if (value && firebaseSDK.uid) { 
          dispatch({
            type: "SET_LOGIN",
            payload: {
                data:{access_token:value}
            }
        });
          console.log("user already Loggedin");
          props.navigation.replace('Home', {
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar
          });
        }
      })
      .catch(err => console.log(err))
    // if(data.isLogin || firebaseSDK.uid){
    //     console.log(data.access_token,"<--- TOKEN",firebaseSDK.uid);
    // if(data.access_token){
    //     console.log("user already Loggedin");
    // }

  }, [])

  function trigger(result) {
    setLoading(false)
    if(result === 'success'){
      const response = firebaseSDK.login(userData, loginSuccess, loginFailed)
    }else{
      console.log(result.data.msg);
      setMessage({title:"Login Failed", message:result.data.msg})
      showAlert()
    }

  }

  const onPressLogin = async () => {
    setLoading(true)
    const user = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar
    };
    dispatch(login({ email: user.email, password: user.password }, trigger))
  };

  const onPressRegister = () => {
    props.navigation.navigate('Register')
  }

  const loginSuccess = async () => {

    setLoading(false)
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

  const setStorage = async () => {
    console.log(firebaseSDK.uid, "<<<", firebaseSDK.email);
    const _id = firebaseSDK.uid
    const name = firebaseSDK.displayName || firebaseSDK.email
    const user = { _id, name }
    await AsyncStorage.setItem('user', JSON.stringify(user))
  }

  const loginFailed = (message) => {
    setLoading(false)
    console.log(message);
    alert(message);
  };

  const onChangeTextEmail = email => setUserData({ ...userData, email });
  const onChangeTextPassword = password => setUserData({ ...userData, password });

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#808C88"}}>
       <ImageBackground source={LANDING} style={styles.image}>
       <AwesomeAlert
          show={swal}
          showProgress={true}
          title={message.title}
          message={message.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={message.title==="Login Failed" && false}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />
      <View style={{justifyContent: 'center', backgroundColor: "rgba(22, 22, 22, 0.23)", paddingVertical:40, marginHorizontal:30}}>
      <TextInput
        mode="outlined"
        style={styles.input}
        label="Email"
        onChangeText={onChangeTextEmail}
        value={userData.email}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        onChangeText={onChangeTextPassword}
        value={userData.password}
      />
      <Button
        title="Login"
        mode="contained"
        style={styles.buttonText}
        color={'black'}
        onPress={onPressLogin}
      > Login </Button>

      <Button
        title="Signup"
        style={styles.buttonSignup}
        color={'white'}
        onPress={onPressRegister}
      > Sign up </Button>

        {!loading?null:
        <View style={styles.loader}>
          <Image style={{height:'100%', width:'100%'}} source={{uri:'https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif'}}/>
        </View>
        }
        </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

  loader: {
    position: 'absolute',
    width: 180,
    padding:15, 
    top:'30%',
    left:'30%', 
    shadowRadius:0,
    height: 180, 
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
  },
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16
  },
  input: {
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignSelf: 'center',
    margin: 16,
    width: "70%",
    paddingHorizontal: 16,
    backgroundColor: "white",
    fontSize: 16
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 42,
    paddingVertical: 2,
    width: "60%",
    backgroundColor: "#81A68A",
    marginTop: 15
  },
  buttonSignup: {
    alignSelf: 'center',
    fontSize: 42,
    paddingVertical: 2,
    width: "60%",
    backgroundColor: "#81A68A",
    marginTop: 15
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

  if (token) {
    const res = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .set({ token }, { merge: true })
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