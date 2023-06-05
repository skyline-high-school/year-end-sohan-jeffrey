import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer"
import StackNavigator from "./StackNavigator";
import Home from "../Screens/Home"

const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>
{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={ClientScreen}/>
    </Drawer.Navigator>
  );
}


export default DrawerNavigator;