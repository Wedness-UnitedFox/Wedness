import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {HomeScreen,PlanScreen, ConversationsScreen, ProfileScreen} from '../screens'
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from 'react-native-paper';
import firebaseSDK from '../firebase';


const Tab = createMaterialBottomTabNavigator();
 

export default function MyTabs() {

  const readUser = async () => {
    const user = await AsyncStorage.getItem('user')
    console.log(user,"<--");
  }
  
  useEffect(() => {
    readUser()
  }, [])

  return (
    <Tab.Navigator> 
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