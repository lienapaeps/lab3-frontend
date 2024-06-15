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
import MySubscription from '../screens/User/Profile/MySubscription';
import Faq from '../screens/User/Profile/Faq';
import Email from '../screens/User/Profile/Account/Email';
import Phone from '../screens/User/Profile/Account/Phone';
import Password from '../screens/User/Profile/Account/Password';
import SubscribePackage from '../screens/User/subscribePackage/SubscribePackage';
import Access from '../screens/User/Profile/Settings/Access';
import Langauge from '../screens/User/Profile/Settings/Language';
import AddReview from '../screens/User/AddReview/AddReview';

import NavigationOptions from '../components/NavigationOptions';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeUser" component={HomeUser}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen name="Calendar" component={Calendar} options={NavigationOptions} />
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
      <Stack.Screen name="Profile" component={Profile} options={NavigationOptions} />
      <Stack.Screen name="MyAccount" component={MyAccount} options={NavigationOptions} />
      <Stack.Screen name="Settings" component={Settings} options={NavigationOptions} />
      <Stack.Screen name="MySubscription" component={MySubscription} options={NavigationOptions} />
      <Stack.Screen name="FAQ" component={Faq} options={NavigationOptions} />
      <Stack.Screen name="SubscribePackage" component={SubscribePackage}
        options={() => ({
          headerShown: false,
        })}

      />
      <Stack.Screen name="Email" component={Email} options={NavigationOptions} />
      <Stack.Screen name="Phone" component={Phone} options={NavigationOptions} />
      <Stack.Screen name="Password" component={Password} options={NavigationOptions} />
      <Stack.Screen name="Access" component={Access} options={NavigationOptions} />
      <Stack.Screen name="Language" component={Langauge} options={NavigationOptions} />
      <Stack.Screen name="AddReview" component={AddReview}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
