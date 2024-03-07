import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FarmHeader from '../components/FarmHeader';
import FarmTab from '../components/FarmTab';
import { NavigationContainer } from '@react-navigation/native';
 
const PackageScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={globalStyles.headerText}>Farm Package</Text>
        </View>
    </SafeAreaView>
  )
}

export default PackageScreen;
