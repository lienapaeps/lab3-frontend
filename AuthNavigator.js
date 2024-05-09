import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle schermen ivm inloggen en registreren
import Welcome from './screens/Welcome';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import RegisterUserScreen from './screens/userRegisterForm/RegisterUser';
import RegisterFarmerScreen from './screens/farmerRegisterForm/RegisterFarmer';

import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={NavigationOptions}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={NavigationOptions}/>
        <Stack.Screen name="registerUser" component={RegisterUserScreen} options={{headerShown:false}}/>
        <Stack.Screen name="registerFarmer" component={RegisterFarmerScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
