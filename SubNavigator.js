import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle schermen ivm inloggen en registreren
import Subscription from './screens/Subscription';
import SubscriptionUser from './screens/userSubscriptionForm/SubscriptionUser';


import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const SubNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Subscription" component={Subscription} options={{headerShown:false}}/>
        <Stack.Screen name="SubscriptionUser" component={SubscriptionUser} options={NavigationOptions}/>
    </Stack.Navigator>
  );
};

export default SubNavigator;
