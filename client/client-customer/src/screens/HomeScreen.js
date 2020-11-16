import React, { useCallback, useEffect, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'react-native-paper'
import CardService from '../components/CardService'
import {fetchVenue} from '../store/actions/wednessAction'
 

export default function HomeScreen() { 
  const data = useSelector(state => state.Reducer)
  const [dataVenues, setDataVenues] = useState([])
  const dispatch = useDispatch()

  const {venues, organizers, caterings} = data
  useEffect(() => {
    dispatch(fetchVenue()) 
  }, [])

  useEffect(() => { 
    setDataVenues(data.venues)
  }, [data])


  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setLevel(index)}
      >
        <View
          style={{
            backgroundColor: "floralwhite",
            borderRadius: 5,
            height: 150,
            paddingVertical: 50,
            paddingHorizontal: 20,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
        </View>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.text}</Text>
      </TouchableOpacity>
    );
  }, []);

  const goToDetail = (type) =>{
    console.log({type})
  }

  return (
    <View style={styles.container}>
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft:20,fontSize: 25, fontWeight: 'bold' }}>Venues</Text> 
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical:10 }}>
          {
            dataVenues?.length==0 ? null:
            dataVenues.map((venue)=>(
              <CardService venue={venue} />
            ))
          }
        </ScrollView>
        <Button style={{width:'80%', alignSelf:'center'}} color="blue" mode="outlined" onPress={()=>goToDetail('vendor')} >See All Venues</Button>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    // alignItems: 'center',
    marginTop: '15%',
    flexDirection: "column"
  },

  vendorContainer: {
    flex: 1, 
    minHeight: 250,
    maxHeight: 250
  }
})