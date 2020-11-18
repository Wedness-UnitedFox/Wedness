import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect, useState } from 'react'
import {View} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'

const invitationRef = firebaseSDK.invitationRef()
export default function ProfileScreen(props) {
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [add, setAdd] = useState(false)
    const [data, setData] = useState({
      groomName:'',
      brideName:'',
      location:'',
      date:``,
    })
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    }; 
    
    const handleConfirm = (date) => {
      console.log(date);
      // console.warn("A date has been picked: ", date);
      setData({...data, date:date})
      hideDatePicker();
    };
    useEffect(() => {
      invitationRef
          .doc(firebaseSDK.uid) 
          .get()
          .then(doc=>{
            if(doc.exists){
              console.log(doc.data(),"<<--");
              let data = doc.data()
              setData(data)
            }
          })
    }, [])

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
    const addDataHandle = () =>{
      if(data.brideName === "" || data.groomName === "" || data.location ==="" || data.date === ""){
        console.log("empty input");
      }else{
        invitationRef
          .doc(firebaseSDK.uid) 
          .set(data)
          .then((ref) => {});
      }     
    }

    return (
      <View style={{ flex: 1, marginTop:55, alignItems: 'center', flexDirection:"column"}}>
        <Button style={{alignSelf:'flex-end', marginRight:20}} color="red" mode="outlined" onPress={logout}>LOGOUT</Button>
        <View style={{width:'100%',flexDirection:"row", justifyContent:"center", paddingVertical:20}}>
          <Text style={{fontSize:25}}>Hai </Text>
          <Text style={{fontSize:26}}>{firebaseSDK.displayName?firebaseSDK.displayName: firebaseSDK.email}!</Text> 
        </View>
        <View style={{height:"60%", justifyContent:'flex-start',paddingVertical:20,width:'100%', paddingHorizontal:10 }}>
          {/* <View> */}
            <View style={{flexDirection:'row'}}>
              <TextInput
                style={{flex:1, marginRight:5}}
                label="Bride Name"
                mode="outlined"
                defaultValue={data.brideName}
                // value={text}
                // onChangeText={text => setText(text)}
              />
              <TextInput
                style={{flex:1}}
                label="Groom Name"
                value={data.groomName}
                mode="outlined"
                // value={text}
                // onChangeText={text => setText(text)}
              />
            </View>
            <View style={{flexDirection:'row'}}>
              <TextInput
                style={{flex:1, marginRight:5}}
                label="Date"
                mode="outlined"
                editable={false}
                defaultValue={`${(new Date(data?.date))?.getMonth()}`}
                value={data.date?`${(new Date(data?.date))?.getDate()} - ${(new Date(data?.date))?.getMonth()} - ${(new Date(data?.date))?.getFullYear()}`:''}
                // onChangeText={text => setText(text)}
              /> 
              <Button style={{justifyContent:'center', }} onPress={showDatePicker} >Pick Date</Button>
            </View>
              <TextInput
                style={{flex:1, marginRight:5}}
                label="Wedding Location"
                defaultValue={data.location}
                mode="outlined"
                multiline={true}
                numberOfLines={3} 
              /> 
              <Button onPress={()=>setAdd(true)}>Input DATA</Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          {/* </View> */}
          {/* <Text style={{fontSize:15}}> Input your wedding data to create Invitation</Text> */}
          
        </View>
      </View>
    );
  }