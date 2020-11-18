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
  const BannerHeight = 200;

  const images = [
    BANNER1,
    BANNER2,
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
      <View style={{marginTop:18}}>
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
      <Divider style={{ marginVertical: 5 }} />
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, }}>Venues</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataVenues?.length == 0 ? null :
              dataVenues.map((venue,i) => (
                <CardService vendor={venue} key={i} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('Venues')} >See All Venues</Button>
        <Divider style={{ marginVertical: 5 }} />
      </View>
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, }}>Caterings</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataCaterings?.length == 0 ? null :
              dataCaterings.map((catering, i) => (
                <CardService vendor={catering} key={i} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('Caterings')} >See All Caterings</Button>
        <Divider style={{ marginVertical: 5 }} />
      </View>
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, }}>Organizers</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataOrganizers?.length == 0 ? null :
              dataOrganizers.map((organizer, i) => (
                <CardService vendor={organizer} key={i} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('Organizers')} >See All Organizers</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    marginTop: '6%',
    flexDirection: "column"
  },

  vendorContainer: {
    flex: 1,
    minHeight: 250,
    maxHeight: 250
  }
})