import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen,ChatScreen, ConversationsScreen} from '../screens'
import AsyncStorage from '@react-native-community/async-storage'


const Tab = createMaterialBottomTabNavigator();
 
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
        name="Settings"
        component={SettingsScreen}
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