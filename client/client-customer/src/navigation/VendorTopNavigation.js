import React from 'react'
import {View} from 'react-native'
import { Button, Text } from 'react-native-paper' 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {VenueScreen, OrganizerScreen, CateringScreen} from '../screens'

const Tab = createMaterialTopTabNavigator(); 
 

export default function VendorTab() {
  return (
    <Tab.Navigator style={{marginTop:50}}>
      <Tab.Screen name="Venues" component={VenueScreen} />
      <Tab.Screen name="Organizers" component={OrganizerScreen} />
      <Tab.Screen name="Caterings" component={CateringScreen} />
    </Tab.Navigator>
  );
}

