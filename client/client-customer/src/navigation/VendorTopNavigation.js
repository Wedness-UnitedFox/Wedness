import React from 'react'
import {View} from 'react-native'
import { Button, Text } from 'react-native-paper' 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {VenueScreen} from '../screens'

const Tab = createMaterialTopTabNavigator(); 

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

export default function VendorTab() {
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Venues" component={VenueScreen} />
      <Tab.Screen name="Organizers" component={OrganizerScreen} />
      <Tab.Screen name="Catering" component={CateringScreen} />
    </Tab.Navigator>
  );
}

