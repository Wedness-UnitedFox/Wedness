import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreen, PlanScreen, ConversationsScreen, ProfileScreen, VendorsScreen } from '../screens'
import AsyncStorage from '@react-native-community/async-storage'
import VendorTopNavigation from './VendorTopNavigation'


const Tab = createMaterialBottomTabNavigator();
 
export default function BottomTab() {

  const readUser = async () => {
    const user = await AsyncStorage.getItem('user')
    console.log(user, "<--");
  }

  useEffect(() => {
    readUser()
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#81A68A"
      inactiveColor="#808C88"
      barStyle={{ backgroundColor: '#808C88' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Vendors"
        component={VendorTopNavigation}
        options={{
          tabBarLabel: 'Vendors',
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Conversation"
        component={ConversationsScreen}
        options={{
          tabBarLabel: 'Conversations',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatboxes" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          tabBarLabel: 'Your Plan',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-alt" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}