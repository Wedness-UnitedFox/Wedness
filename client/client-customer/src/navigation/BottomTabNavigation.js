import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen,ChatScreen, ConversationsScreen, ProfileScreen} from '../screens'
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
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversation"
        component={ConversationsScreen}
        options={{
          tabBarLabel: 'Conversations',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}