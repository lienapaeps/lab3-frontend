import React from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// alle schermen ivm de inhoud vd app
import HomeScreenUser from '../screens/User/Home';
import FarmUser from '../screens/User/Farm';
import Explore from '../screens/User/Explore';
import ChatUser from '../screens/User/Chat';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  keyboardHidesTabBar: true,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    right: 0,
    left: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 100 : 90,
    elevation: 0,
  },
}

const AppTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          // Bepaal de bron van het icoon op basis van de route
          if (route.name === 'HomeUser') {
            iconSource = focused ? require('../assets/icons/home-icon-active.png') : require('../assets/icons/home-icon-inactive.png');
          } else if (route.name === 'FarmUser') {
            iconSource = focused ? require('../assets/icons/farm-icon-active.png') : require('../assets/icons/farm-icon-inactive.png');
          } else if (route.name === 'Explore') {
            iconSource = focused ? require('../assets/icons/explore-icon-active.png') : require('../assets/icons/explore-icon-inactive.png');
          } else if (route.name === 'ChatUser') {
            iconSource = focused ? require('../assets/icons/chat-icon-active.png') : require('../assets/icons/chat-icon-inactive.png');
          }

          return (
            <View style={{ marginTop: 10 }}>
              <Image source={iconSource} style={{ width: size, height: size }} />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          let labelText;

          // Bepaal de tekst op basis van de route
          if (route.name === 'HomeUser') {
            labelText = 'Home';
          } else if (route.name === 'FarmUser') {
            labelText = 'Boerderij';
          } else if (route.name === 'Explore') {
            labelText = 'Explore';
          } else if (route.name === 'ChatUser') {
            labelText = 'Chat';
          }

          return (
            <View style={{ marginBottom: Platform.OS === 'ios' ? -5 : 10 }}>
              <Text style={[globalStyles.tabBarLabel, focused ? globalStyles.tabBarLabelFocused : globalStyles.tabBarLabelNormal]}>
                {labelText}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeUser" component={HomeScreenUser} options={screenOptions}/>
      <Tab.Screen name="FarmUser" component={FarmUser} options={screenOptions}/>
      <Tab.Screen name="Explore" component={Explore} options={screenOptions}/>
      <Tab.Screen name="ChatUser" component={ChatUser} options={screenOptions}/>
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
