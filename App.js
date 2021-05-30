import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from './components/AppTabNavigator'
export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  BottomTab:{screen:AppTabNavigator}

})
const AppContainer = createAppContainer(switchNavigator);
