import React, { useCallback, useEffect, YellowBox, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Divider } from 'react-native-paper'
import CardServiceBig from '../components/CardServiceBig' 

export default function HomeScreen() {
  const data = useSelector(state => state.Reducer)
  const [dataVenues, setDataVenues] = useState([])


  const { venues, organizers, caterings } = data
  useEffect(() => {
    setDataVenues(venues)
    console.log(dataVenues, "<<<");
  }, [])
  const goToDetail = (type) => {
    console.log({ type })
  }

  return (
    <ScrollView style={styles.container}>
      { 
        dataVenues?.length == 0 ? null :
          dataVenues.map((venue, i) => (
            <CardServiceBig vendor={venue} key={i}/>
            // <Text>{dataVenues.length}</Text>
          )) 
      }
      {/* <Text>{JSON.stringify(dataVenues)}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column"
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
    minHeight: 280,
    // backgroundColor: 'grey'
  },
  card: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "center",
  },

})