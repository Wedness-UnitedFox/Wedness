import React, { useCallback, useEffect, YellowBox, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Divider } from 'react-native-paper'
import CardServiceBig from '../components/CardServiceBig' 

export default function HomeScreen() {
  const data = useSelector(state => state.Reducer)
  const [dataCatering, setDataCatering] = useState([])


  const { caterings } = data
  useEffect(() => {
    setDataCatering(caterings)
    console.log(dataCatering, "<<<");
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Divider />
      { 
        dataCatering?.length == 0 ? null :
          dataCatering.map((catering, i) => (
            <CardServiceBig vendor={catering} key={i}/>
            // <Text>{dataCatering.length}</Text>
          )) 
      }
      {/* <Text>{JSON.stringify(dataCatering)}</Text> */}
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