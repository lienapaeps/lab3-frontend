import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ChatUser from '../screens/ChatUser';
import FarmPackage from '../components/FarmPackage';


const Tab = createMaterialTopTabNavigator();

const FarmTab = ()  => {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Info" component={FarmPackage}/>
        <Tab.Screen name="Chat" component={ChatUser}/>
    </Tab.Navigator>
    );
};

export default FarmTab;