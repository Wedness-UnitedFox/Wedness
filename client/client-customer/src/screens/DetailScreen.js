import React, { useState } from 'react'
import { Avatar } from "react-native-elements";
import { StyleSheet, Image, ImageBackground, View } from 'react-native'
import { Button, Divider, List, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'
import { bookNow } from '../store/actions/wednessAction'
import AwesomeAlert from 'react-native-awesome-alerts';


export default function ProfileScreen(props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const { id, data } = route.params
  const [expanded, setExpanded] = useState(true);
  const [swal, showSwal] = useState(false)
  const vendor_type = 'venue'

  const handlePress = () => setExpanded(!expanded);
  const handleChat = () => {
    console.log(data.User, "<><><><><><><><><");
    navigation.navigate('ChatRoom', { vendorEmail: data.User.email, name: data.User.email })
  }
  const handleConfirm = () => {
    showSwal(true)
  }

  const hideAlert = () => {
    showSwal(false)
  };
  const handleBook = () => {
    console.log(id, "chat")
    dispatch(bookNow({ VendorId: id, vendor_type: data.service_type, subtotal: data.price }, success))

  }
  const success = () => {
    console.log("success");
    navigation.replace('Home')
    hideAlert()
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

      <AwesomeAlert
        show={swal}
        showProgress={true}
        title="Book this service"
        // message={message.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Yes, Book now"
        confirmButtonColor="green"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          handleBook();
        }}
      />
      <View style={styles.container}>
        <ImageBackground source={{ uri: `${data.avatar}` }} blurRadius={2} style={styles.image}>
          <View
            style={{
              alignSelf: 'center',
              width: 120,
              height: 120,
              borderRadius: 100,
              backgroundColor: 'blue',
              overflow: 'hidden',
              justifyContent: 'center'
            }}
          >
            <Image
              style={{ width: "200%", height: "200%", alignSelf: 'center' }}
              resizeMode="cover"
              source={{
                uri: `${data.avatar}`
              }}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button color="white" style={{ borderWidth: 2, backgroundColor: "#808C88" }} onPress={handleConfirm}>Book Now</Button>
        <Button color="white" style={{ marginLeft: 10, borderWidth: 2, width: 120, backgroundColor: "#808C88" }} onPress={handleChat}>Chat</Button>
      </View>
      <View style={{ paddingHorizontal: 20, width: '100%', }}>
        <List.Section titleStyle={{ fontSize: 16, fontWeight: "bold" }}>
          <List.Accordion
            title={data.name} titleStyle={{ fontSize: 18, fontWeight: "bold" }}
          >
            <View >
              <View style={{}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Phone Number: </Text>
                <Text>{data.phone_number}</Text>
              </View>
              <Divider style={{ marginVertical: 5 }} />
              {data.service_type === "venue" ?
                <View>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Type: </Text>
                    <Text>{data.type}</Text>
                  </View>
                  <Divider style={{ marginVertical: 5 }} />
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Capacity: </Text>
                    <Text>{data.capacity}</Text>
                  </View>
                </View>
                : null
              }
              <Divider style={{ marginVertical: 5 }} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price: </Text>
                <Text>Rp. {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
              </View>
              <Divider style={{ marginVertical: 5 }} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Address: </Text>
                <Text>{data.address}</Text>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <Divider style={{ marginVertical: 5 }} />
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Description: </Text>
        <Text>{data.description}</Text>
        <Divider style={{ marginVertical: 20 }} />
      </View>

      <View>
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft:-400,
    width: '100%',
    maxHeight: 250,
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});