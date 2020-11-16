import React from 'react'
import { Image, View } from 'react-native'
import { Button, Divider, List, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'
import {bookNow} from '../store/actions/wednessAction'


export default function ProfileScreen(props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const { id, name, type, data } = route.params
  const [expanded, setExpanded] = React.useState(true);
  const vendor_type = 'venue'

  const handlePress = () => setExpanded(!expanded);
  console.log(data, "<><><><><><><><><");
  const handleChat = () => {
    console.log("chat")
  }  
    // subtotal: DataTypes.INTEGER, 
    // vendor_type: DataTypes.STRING,
    // VendorId: DataTypes.INTEGER,
  const handleBook = () => {
    console.log(id,"chat")
    dispatch(bookNow({VendorId:id,vendor_type,subtotal:data.price},success))
  }
  const success = () =>{
    console.log("success");
    navigation.replace('Home')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <View
        style={{
          backgroundColor: "floralwhite",
          width: '100%',
          height: 250,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <Image
          style={{ width: "100%", height: "100%", resizeMode: 'cover' }}
          source={{
            uri: `${data.avatar}`,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, width: '100%', }}>
        <List.Section titleStyle={{ fontSize: 20 }} title={data.title}>
          <List.Accordion
            title="Detail"
          > 
            <View >
              <View style={{}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Phone Number: </Text>
                <Text>{data.phone_number}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Type: </Text>
                <Text>{data.type}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Capacity: </Text>
                <Text>{data.capacity}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>price: </Text>
                <Text>{data.price}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Address: </Text>
                <Text>{data.address}</Text>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <Divider style={{ marginVertical: 5 }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Decription: </Text>
          <Text>{data.description}</Text>
        <Divider style={{ marginVertical: 5 }} />
      </View>
      <Button onPress={handleChat}>Chat</Button>
      <Button onPress={handleBook}>Book Now</Button>
      <View>
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </View>
    </View>
  );
}