import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

import { ChatScreen, LoginScreen, DetailScreen, RegisterScreen } from './src/screens'
import HomeNavigation from './src/navigation/BottomTabNavigation'
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator mode="modal" >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={HomeNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ChatRoom" component={ChatScreen}
              options={({ route }) => ({
                title: route.params.name
              })}
            />
            <Stack.Screen name="Detail" component={DetailScreen}
              options={({ route }) => ({
                title: route.params.name
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
