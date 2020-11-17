import React from 'react'
import {View} from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import firebaseSDK from '../firebase'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function VenueScreen () {
  return (
    <Text>Venue</Text>
  )
}

function OrganizerScreen () {
  return (
    <Text>Organizer</Text>
  )
}
function CateringScreen () {
  return (
    <Text>Catering</Text>
  )
}

export default function VendorScreen() {
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Venues" component={VenueScreen} />
      <Tab.Screen name="Organizers" component={OrganizerScreen} />
      <Tab.Screen name="Catering" component={CateringScreen} />
    </Tab.Navigator>
  );
}

