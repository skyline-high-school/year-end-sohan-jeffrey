import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import BottomTabNavigator from "./BottomTabNavigator";
import Login from "../Screens/Login"
const Stack = createStackNavigator();
const StackNavigator=()=>
{

    return(
      <Stack.Navigator initalRouteName="Tab" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={BottomTabNavigator}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    );

}


export default StackNavigator;