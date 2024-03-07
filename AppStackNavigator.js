import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle extra/detail schermen ivm de inhoud vd app
import HomeUser from './screens/HomeUser';
import Calendar from './screens/CalendarPage';
import FarmUserDetails from './screens/FarmUserDetails';
import Map from './screens/Map';
import FarmHeader from './components/FarmHeader';

import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeUser" component={HomeUser} options={NavigationOptions}/>
      <Stack.Screen name="Calendar" component={Calendar} options={NavigationOptions}/>
      <Stack.Screen name="FarmUserDetails" component={FarmUserDetails}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="Map" component={Map}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
