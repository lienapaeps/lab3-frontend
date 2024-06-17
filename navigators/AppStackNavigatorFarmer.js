import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle extra/detail schermen ivm de inhoud vd app
import HomeFarmer from '../screens/Farmer/Home';
import FarmFarmer from '../screens/Farmer/MyFarm';
import CalendarFarmer from '../screens/Farmer/Calendar';
import ChatFarmer from '../screens/Farmer/Chat';
import PackageDetail from '../screens/Farmer/PackageDetail';
import UpdatePackage from '../screens/Farmer/UpdatePackage/UpdatePackage';
import EditPackages from '../screens/Farmer/EditPackages/EditPackages';
import AddActivity from '../screens/Farmer/AddActivity/AddActivity';
import AddNewPackage from '../screens/Farmer/AddNewPackage/AddNewPackage';
import ActivityDetail from '../screens/Farmer/ActivityDetail';

import NavigationOptions from '../components/NavigationOptions';

const Stack = createStackNavigator();

const AppStackNavigatorFarmer = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeFarmer" component={HomeFarmer} options={NavigationOptions}/>
        <Stack.Screen name="FarmFarmer" component={FarmFarmer} options={NavigationOptions}/>
        <Stack.Screen name="CalendarFarmer" component={CalendarFarmer} options={NavigationOptions}/>
        <Stack.Screen name="ChatFarmer" component={ChatFarmer} options={NavigationOptions}/>
        <Stack.Screen name="PackageDetail" component={PackageDetail}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="UpdatePackage" component={UpdatePackage} options={NavigationOptions}/>
        <Stack.Screen name="EditPackages" component={EditPackages} options={NavigationOptions}/>
        <Stack.Screen name="AddActivity" component={AddActivity}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="AddNewPackage" component={AddNewPackage} options={NavigationOptions}/>
        <Stack.Screen name="ActivityDetail" component={ActivityDetail}
          options={() => ({
            headerShown: false,
          })}
        />
    </Stack.Navigator>
  );
};

export default AppStackNavigatorFarmer;
