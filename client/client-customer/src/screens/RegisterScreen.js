import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { register } from '../store/actions/wednessAction';
import firebaseSDK from '../firebase/index';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function RegisterScreen (props) {
  const [user, setUser] = useState({})
  const [swal, showSwal] = useState(false)
  const [message, setMessage] = useState({title:'',message:'', ok:'Yes, Regist me in'}) 
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()

  const onPressLogin = () => {
    props.navigation.replace('Login')
  }

  const onPressSubmit = () => {
    console.log(user) 
    setMessage({title:'Submit',message:'Regist User ?'}) 
    showAlert() 
  }

  const onChangeName = name => setUser({...user, name})
  const onChangeEmail = email => setUser({...user, email})
  const onChangePhone = phone => setUser({...user, phone_number: phone})
  const onChangePassword = password => setUser({...user, password})

  const handleRegister = () =>{
    hideAlert();
    dispatch(register(user,trigger,registerFailed))
  }
  const trigger = () => {
    console.log("SUKSES");
    const response = firebaseSDK.register(user,registerSuccess,registerFailed)
    console.log("trgger via cb")
  }

  const registerSuccess = async () => {
      console.log('register successful, navigate to chat.'); 
      setUser({})
      props.navigation.replace('Login')
  };


  const registerFailed = (message) => {
    console.log(message);
    alert(message);
  };

  const  showAlert = () => {
    showSwal(true)
  };
 
  const hideAlert = () => {
    showSwal(false)
  };

  return(
    <View style={{flex:1, justifyContent:'center', paddingHorizontal:10, alignContent:"center"}}>
      <ScrollView contentContainerStyle={{paddingTop: 80, justifyContent:'center', paddingHorizontal:10, alignContent:"center"}}>
      <View style={{alignSelf:'center'}}>
        <Text style={{fontSize:20}}>Register Here!</Text>
      </View>
      <TextInput
        mode="outlined" 
        label="Name"
        placeholder="Your name..."
        onChangeText={onChangeName}
        style={styles.input}
      />
      <TextInput
        mode="outlined" 
        label="Email"
        placeholder="Your email..."
        onChangeText={onChangeEmail}
        style={styles.input}
      />
      <TextInput 
        mode="outlined"
        label="Phone Number"
        placeholder="ex. 08123456789"
        onChangeText={onChangePhone}
        style={styles.input}
      />
      <TextInput 
        mode="outlined"
        label="Password"
        placeholder="Your password..."
        onChangeText={onChangePassword}
        style={styles.input}
      />
      <Button
        title="Register"
        mode="outlined"
        style={styles.buttonText}
        onPress={onPressSubmit}
      > Submit </Button>
      <Button
        title="Login"
        style={styles.buttonText}
        color={'black'} 
        onPress={onPressLogin}
      > Sign in </Button>
      </ScrollView>
      <AwesomeAlert
          show={swal}
          showProgress={loader} 
          title={message.title}
          message={message.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="cancel"
          confirmText={message.ok}
          progressSize="large"
          progressColor="black"
          // confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            handleRegister()
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    marginTop: 5,
    alignSelf:'center', 
    fontSize: 42,
    paddingVertical: 12, 
    width:"64%",
  },
  input: { 
    borderRadius:15, 
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    alignSelf:'center',
    margin: 2,
    width:"70%",
    paddingHorizontal: 10,
    fontSize: 16
},
})