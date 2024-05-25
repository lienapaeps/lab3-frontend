import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle schermen ivm inloggen en registreren
import Welcome from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import RegisterUserScreen from '../screens/User/Register/Register';
import RegisterFarmerScreen from '../screens/Farmer/Register/Register';
import OnBoarding from '../screens/User/Register/OnBoarding';
import RegistrationSucces from '../screens/Farmer/Register/RegistrationSucces';
import AddFarm from '../screens/Farmer/Register/addFarmForm/AddScreen';
import AddPackages from '../screens/Farmer/Register/addFarmForm/AddPackages';

import NavigationOptions from '../components/NavigationOptions';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={NavigationOptions}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={NavigationOptions}/>
        <Stack.Screen name="registerUser" component={RegisterUserScreen} options={{headerShown:false}}/>
        <Stack.Screen name="registerFarmer" component={RegisterFarmerScreen} options={{headerShown:false}}/>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown:false}}/>
        <Stack.Screen name="RegistrationSucces" component={RegistrationSucces} options={{headerShown:false}}/>
        <Stack.Screen name="AddFarm" component={AddFarm} options={{headerShown:false}}/>
        <Stack.Screen name="AddPackages" component={AddPackages} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
