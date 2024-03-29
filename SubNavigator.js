import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// alle schermen ivm abonneren en abonnementen
import Subscription from './screens/Subscription';
import CooperateSubscription from './screens/userSubscription/cooperateSubscription';
import CollectiveSubscription from './screens/userSubscription/collectiveSubscription';
import TakeawaySubscription from './screens/userSubscription/takeawaySubscription';


import NavigationOptions from './components/NavigationOptions';

const Stack = createStackNavigator();

const SubNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Subscription" component={Subscription} options={{headerShown:false}}/>
        <Stack.Screen name="CooperateSubscription" component={CooperateSubscription} options={NavigationOptions}/>
        <Stack.Screen name="CollectiveSubscription" component={CollectiveSubscription} options={NavigationOptions}/>
        <Stack.Screen name="TakeawaySubscription" component={TakeawaySubscription} options={NavigationOptions}/>
    </Stack.Navigator>
  );
};

export default SubNavigator;
