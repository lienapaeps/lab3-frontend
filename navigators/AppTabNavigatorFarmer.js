import React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// alle schermen ivm de inhoud vd app voor de landbouwer
import HomeFarmer from '../screens/Farmer/Home';
import FarmFarmer from '../screens/Farmer/MyFarm';
import CalendarFarmer from '../screens/Farmer/Calendar';
import ChatFarmer from '../screens/Farmer/Chat';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const Tab2 = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  keyboardHidesTabBar: true,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    right: 0,
    left: 0,
    bottom: 0,
    height: 95,
    elevation: 0,
  },
}

const AppTabNavigatorFarmer = () => {

  return (
    <Tab2.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          // Bepaal de bron van het icoon op basis van de route
          if (route.name === 'HomeFarmer') {
            iconSource = focused ? require('../assets/icons/home-icon-active.png') : require('../assets/icons/home-icon-inactive.png');
          } else if (route.name === 'FarmFarmer') {
            iconSource = focused ? require('../assets/icons/farm-icon-active.png') : require('../assets/icons/farm-icon-inactive.png');
          } else if (route.name === 'CalendarFarmer') {
            iconSource = focused ? require('../assets/icons/calendar-icon-active.png') : require('../assets/icons/calendar-icon-inactive.png');
          } else if (route.name === 'ChatFarmer') {
            iconSource = focused ? require('../assets/icons/chat-icon-active.png') : require('../assets/icons/chat-icon-inactive.png');
          }

          return (
            <View style={{paddingTop: 15}}>
              <Image source={iconSource} style={{ width: size, height: size }} />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          let labelText;

          // Bepaal de tekst op basis van de route
          if (route.name === 'HomeFarmer') {
            labelText = 'Home';
          } else if (route.name === 'FarmFarmer') {
            labelText = 'Boerderij';
          } else if (route.name === 'CalendarFarmer') {
            labelText = 'Kalender';
          } else if (route.name === 'ChatFarmer') {
            labelText = 'Chat';
          }

          return (
            <View>
              <Text style={[globalStyles.tabBarLabel, focused ? globalStyles.tabBarLabelFocused : globalStyles.tabBarLabelNormal]}>
                {labelText}
              </Text>
            </View>
          );
        },
      })}
    >
        <Tab2.Screen name="HomeFarmer" component={HomeFarmer} options={screenOptions}/>
        <Tab2.Screen name="FarmFarmer" component={FarmFarmer} options={screenOptions}/>
        <Tab2.Screen name="CalendarFarmer" component={CalendarFarmer} options={screenOptions}/>
        <Tab2.Screen name="ChatFarmer" component={ChatFarmer} options={screenOptions}/>
    </Tab2.Navigator>
  );
};

export default AppTabNavigatorFarmer;
