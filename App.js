/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createSwitchNavigator } from 'react-navigation'

import AuthNav from './src/auth'
import HomeNav from './src/home'

const Nav = createSwitchNavigator(
  {
    AuthNav: AuthNav,
    HomeNav: HomeNav
  },
  {
    initialRouteName: 'AuthNav'
  }
)

export default class App extends Component {
  render() {
    return (
      <Nav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
