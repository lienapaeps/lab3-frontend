import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle extra/detail schermen ivm de inhoud vd app
import HomeFarmer from './screens/FarmerScreens/HomeFarmer';
import FarmFarmer from './screens/FarmerScreens/FarmFarmer';
import CalendarFarmer from './screens/FarmerScreens/CalendarFarmer';
import ChatFarmer from './screens/FarmerScreens/ChatFarmer';

import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const AppStackNavigatorFarmer = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeFarmer" component={HomeFarmer}/>
        <Stack.Screen name="FarmFarmer" component={FarmFarmer} options={NavigationOptions}/>
        <Stack.Screen name="CalendarFarmer" component={CalendarFarmer} options={NavigationOptions}/>
        <Stack.Screen name="ChatFarmer" component={ChatFarmer} options={NavigationOptions}/>
    </Stack.Navigator>
  );
};

export default AppStackNavigatorFarmer;
