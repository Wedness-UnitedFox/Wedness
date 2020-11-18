import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, Linking, View } from 'react-native'
import { Button, Card, Paragraph, Text, TextInput, Title } from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import firebaseSDK from '../firebase'
import { LOGIN_FAIL } from '../store/actions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const invitationRef = firebaseSDK.invitationRef()
export default function ProfileScreen(props) {
  const dispatch = useDispatch()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDataExist, setIsDataExist] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState({})

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // let newDate = JSON.stringify(new Date(date)) 
    setData({ ...data, date })
    hideDatePicker();
  };

  useEffect(() => {
    console.log(data, ">?>?>?");
  }, [data])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = () => {
    invitationRef
      .doc(firebaseSDK.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data()
          console.log(data.date.time, "<<<<<<<<<<");
          // let newDate = new Date( data.date.t.seconds * 1000 + data.date.t.nanoseconds/1000000) 
          let newData = { ...data }
          setData(newData)
          setIsDataExist(true)
        } else {
          setIsDataExist(false)
          console.log("NO DATA");
        }
      })
  }

  const { navigation } = props
  const logout = () => {
    console.log("logout")
    firebaseSDK.onLogout()
    dispatch({
      type: "LOGOUT"
    })
    AsyncStorage.clear()
    navigation.replace('Login')
  }
  const goToInvitation = () => {
    navigation.push('Invitation', { data })
  }

  const checkData = () => {
    invitationRef
      .doc(firebaseSDK.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(doc.data(), "<<--");
          let data = doc.data()
          setIsDataExist(true)
          let newData = { ...data, date: new Date(data.date) }
          console.log(newData, "<<<<<<<<<<");
          setData(newData)
        } else {
          setIsDataExist(false)
          console.log("NO DATA");
        }
      })
  }
  const addDataHandle = () => {
    if (data.brideName === "" || data.groomName === "" || data.location === "" || data.date === "" || Object.keys(data).length < 4) {
      console.log("empty input");
    } else {
      const newData = { ...data, date: (data.date.toString()).toString() }
      console.log({ data });
      invitationRef
        .doc(firebaseSDK.uid)
        .set(newData)
        .then((ref) => {

          setShowForm(false)
          checkData()
        })

    }
  }
  const handleCancel = () => {
    // setData({})
    setShowForm(false)
  }
  return (
    <View style={{ flex: 1, marginTop: 55, alignItems: 'center', flexDirection: "column" }}>
      <Button style={{ alignSelf: 'flex-end', marginRight: 20 }} color="red" mode="outlined" onPress={logout}>LOGOUT</Button>
      <View style={{ width: '100%', flexDirection: "row", justifyContent: "center", paddingVertical: 10 }}>
        <Text style={{ fontSize: 25 }}>Hai </Text>
        <Text style={{ fontSize: 26 }}>{firebaseSDK.displayName ? firebaseSDK.displayName : firebaseSDK.email}!</Text>
      </View>
      <ScrollView style={{width: "100%"}}>
      <View style={{ height: "60%", justifyContent: 'flex-start', paddingVertical: 20, width: '100%', paddingHorizontal: 10 }}>

        {Object.keys(data).length < 4 ?
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Card style={{ width: '100%', alignItems: 'center', padding: 10 }}>
              <Text style={{ fontSize: 20 }}>You dont have an E-Invitation</Text>
              <Button onPress={() => setShowForm(true)}>Create one</Button>
            </Card>
          </View> :
          <>
            {/* <Text style={{alignSelf:'center'}}>asdada/{firebaseSDK.uid}</Text> */}
            {/* <TouchableOpacity onPress={() => {
                let url = `whatsapp://send?text=asdada/${firebaseSDK.uid}`;
                Linking.openURL(url).then((data) => {
                  console.log('open whatsapp', data)
                }).catch(() => {
                  console.log('App not installed')
                });
              }} >
                <Text>Share</Text>
                <AntDesign name="sharealt" size={24} color="black" /> 
          </TouchableOpacity> */}
            <Button onPress={() => goToInvitation()}>View Invitation Card</Button>
            <Button onPress={() => setShowForm(true)}>Edit data</Button>
          </>

        }
        {
          !showForm ? null :
            <Card style={{ width: '100%', padding: 10, paddingTop: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1, marginRight: 5 }}
                  label="Bride's Name"
                  mode="outlined"
                  defaultValue={data.brideName}
                  // value={text}
                  onChangeText={text => setData({ ...data, brideName: text })}
                />
                <TextInput
                  style={{ flex: 1 }}
                  label="Groom's Name"
                  defaultValue={data.groomName}
                  mode="outlined"
                  // value={text} 
                  onChangeText={text => setData({ ...data, groomName: text })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ flex: 1, marginRight: 5 }}
                  label="Date"
                  mode="outlined"
                  editable={false}
                  value={(new Date(data.date)).toLocaleDateString()}
                // defaultValue={`${(new Date(data?.date))?.getMonth()}`}  value={data?.date? "":data?.date?.toLocaleString('id')} 
                />
                <Button style={{ justifyContent: 'center', }} onPress={showDatePicker} >Pick A Date</Button>
              </View>
              <TextInput
                style={{ marginRight: 5 }}
                label="Wedding Location"
                defaultValue={data.location}
                mode="outlined"
                multiline={true}
                numberOfLines={3}
                onChangeText={text => setData({ ...data, location: text })}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                <Button onPress={() => addDataHandle()}>Save Data</Button>
                <Button onPress={() => handleCancel()}>Cancel</Button>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Card>
            
        }
        {/* </View> */}
        {/* <Text style={{fontSize:15}}> Input your wedding data to create Invitation</Text> */}
        
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
  }
})
