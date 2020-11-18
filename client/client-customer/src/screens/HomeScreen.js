import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from 'react-native-paper'
import CardService from '../components/CardService'
import { fetchCatering, fetchOrganizer, fetchVenue } from '../store/actions/wednessAction'
import Carousel from '@dkbrothers/react-native-banner-carousel';
import { BANNER1, BANNER2, BANNER3 } from '../../assets';


export default function HomeScreen(props) {
  const { route, navigation } = props
  const data = useSelector(state => state.Reducer)
  const [dataVenues, setDataVenues] = useState([])
  const [dataCaterings, setDataCaterings] = useState([])
  const [dataOrganizers, setDataOrganizers] = useState([])
  const dispatch = useDispatch()

  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 180;

  const images = [
    BANNER2,
    BANNER1,
    BANNER3
  ];
  const renderPage = (image, index) => {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={image} />
      </View>
    );
  }

  const { venues, organizers, caterings } = data
  useEffect(() => {
    dispatch(fetchVenue())
    dispatch(fetchOrganizer())
    dispatch(fetchCatering())
  }, [])

  useEffect(() => {
    setDataVenues(data.venues)
    setDataCaterings(data.caterings)
    setDataOrganizers(data.organizers)
  }, [data])

  const goToDetail = (type) => {
    console.log({ type })
    navigation.navigate('Vendors', { screen: type })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 18 }}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {images.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
      {/* <Divider style={styles.divider} /> */}

      <View style={styles.vendorContainer}> 
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 20, fontSize: 22, color:"#81A68A", fontWeight:"bold"}}>Venues</Text>
          <Button style={{ marginRight: 10 }} color="#81A68A" mode="outlined" onPress={() => goToDetail('Venues')} >See All</Button>
        </View>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataVenues?.length == 0 ? null :
              dataVenues.map((venue, i) => (
                <CardService vendor={venue} key={i} />
              ))
          }
        </ScrollView>
        {/* <Divider style={styles.divider} />  */}
      </View>
 
      <View style={styles.vendorContainer}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 20, fontSize: 22, color:"#81A68A", fontWeight:"bold"}}>Caterings</Text>
          <Button style={{ marginRight: 10 }} color="#81A68A" mode="outlined" onPress={() => goToDetail('Caterings')} >See All</Button>
        </View>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataOrganizers?.length == 0 ? null :
            dataOrganizers.map((organizer, i) => (
              <CardService vendor={organizer} key={i} />
              ))
          }
        </ScrollView> 
      </View>

      <View style={styles.vendorContainer}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 20, fontSize: 22, color:"#81A68A", fontWeight:"bold"}}>Organizers</Text>
          <Button style={{ marginRight: 10 }} color="#81A68A" mode="outlined" onPress={() => goToDetail('Organizers')} >See All</Button>
        </View>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataCaterings?.length == 0 ? null :
              dataCaterings.map((catering, i) => (
                <CardService vendor={catering} key={i} />
              ))
          }
        </ScrollView> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F2DDD0',
    // alignItems: 'center',
    marginTop: '6%',
    flexDirection: "column"
  },

  vendorContainer: {
    flex: 1,
    marginTop: 15,
    minHeight: 250,
    maxHeight: 250
  },
  divider: {
    marginVertical: 10
  }
})