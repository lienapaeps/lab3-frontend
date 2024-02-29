import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle extra/detail schermen ivm de inhoud vd app
import Calendar from './screens/CalendarPage';
import FarmUserDetails from './screens/FarmUserDetails';
import CustomBackButton from './components/CustomBackButton';


import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={Calendar} options={NavigationOptions}/>
      <Stack.Screen name="FarmUserDetails" component={FarmUserDetails}

        options={() => ({
          headerShown: false,
        })}
      />
     
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
