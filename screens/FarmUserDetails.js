import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FarmHeader from '../components/FarmHeader';
import FarmTab from '../components/FarmTab';
import { NavigationContainer } from '@react-navigation/native';

const FarmUserDetails = ({ navigation, route }) => {

  const farmData = route.params.farmData;

  return <>

      <FarmHeader route={route}/>
      <FarmTab/>
  </>
}

export default FarmUserDetails;