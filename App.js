import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from "@react-navigation/stack";


import DrawerNavigator from "./navigator/DrawerNavigator";

import firebase from "firebase";
import { firebaseConfig } from "./config";

import Login from "./Screens/Login"
import RegisterScreen from "./Screens/RegisterScreen"

global.__reanimatedWorkletInit = () => {};



//if (!firebase) {
  firebase.initializeApp(firebaseConfig) //initializes firebase
//}


const Stack = createStackNavigator();

const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="Login"  screenOptions={{ //sets the login screen to the deafault
    headerShown: false,
    gestureEnabled: false
  }}>
    <Stack.Screen name="Login" component={ClientLoginScreen} /> 
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>)
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>)

}

