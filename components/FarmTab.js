import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import COLORS from '../constants/color';

import ChatUser from '../screens/ChatUser';
import FarmPackage from '../components/FarmPackage';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: COLORS.white,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 20,
        backgroundColor: 'transparent',
    },
    tabBarLabelStyle: {
        color: COLORS.offBlack,
        fontWeight: 'bold',
    },
    tabBarIndicatorStyle: {
        backgroundColor: COLORS.orange,
    },


}

const FarmTab = ()  => {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Info" component={FarmPackage} options={screenOptions}/>
        <Tab.Screen name="Chat" component={ChatUser} options={screenOptions}/>
    </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'transparent',
        color: 'white',
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 20,
    },
});

export default FarmTab;