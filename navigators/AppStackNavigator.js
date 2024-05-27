import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle extra/detail schermen ivm de inhoud vd app
import HomeUser from '../screens/User/Home';
import Calendar from '../screens/User/CalendarPage';
import FarmUserDetails from '../screens/User/FarmDetails';
import Map from '../screens/User/Map';
import ActivityDetail from '../screens/User/ActivityDetail';
import PackageDetail from '../screens/User/PackageDetail';
import Profile from '../screens/User/Profile';
import MyAccount from '../screens/User/Profile/MyAccount';
import Settings from '../screens/User/Profile/Settings';
import Faq from '../screens/User/Profile/Faq';

import NavigationOptions from '../components/NavigationOptions';

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
      <Stack.Screen name="ActivityDetail" component={ActivityDetail}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="Map" component={Map}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="PackageDetail" component={PackageDetail}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="Profile" component={Profile} options={NavigationOptions}/>
      <Stack.Screen name="MyAccount" component={MyAccount} options={NavigationOptions}/>
      <Stack.Screen name="Settings" component={Settings} options={NavigationOptions}/>
      <Stack.Screen name="FAQ" component={Faq} options={NavigationOptions}/>
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
