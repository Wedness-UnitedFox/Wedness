import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper'
import CardService from '../components/CardService'
import { fetchCatering, fetchOrganizer, fetchVenue } from '../store/actions/wednessAction'
import Carousel from 'react-native-banner-carousel';
import { BANNER1,BANNER2,BANNER3 } from '../../assets';




export default function HomeScreen() {
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

  const renderPage = (image, index) =>{
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={ image } />
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

  const goToDetail = (type) => {
    console.log({ type })
  }

  return (
    <ScrollView style={styles.container}>
      <View>
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
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>Venues</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataVenues?.length == 0 ? null :
              dataVenues.map((venue) => (
                <CardService vendor={venue} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('vendor')} >See All Venues</Button>
      </View>
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>Caterings</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataCaterings?.length == 0 ? null :
              dataCaterings.map((catering) => (
                <CardService vendor={catering} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('vendor')} >See All Caterings</Button>
      </View>
      <View style={styles.vendorContainer}>
        <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>Organizers</Text>
        <ScrollView horizontal={true} style={{ flex: 1, paddingVertical: 10 }}>
          {
            dataOrganizers?.length == 0 ? null :
              dataOrganizers.map((organizer) => (
                <CardService vendor={organizer} />
              ))
          }
        </ScrollView>
        <Button style={{ width: '80%', alignSelf: 'center' }} color="blue" mode="outlined" onPress={() => goToDetail('vendor')} >See All Organizers</Button>
      </View>
    </ScrollView>
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