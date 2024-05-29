import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import Services from './FarmTabPages/Services';
import Agenda from './FarmTabPages/Agenda';
import Members from './FarmTabPages/Members';
import Reviews from './FarmTabPages/Reviews';
import Contact from './FarmTabPages/Contact';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import { processFontFamily } from 'expo-font';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: COLORS.white,
        elevation: 0,
        padding: 0,
        margin: 0,
        shadowOpacity: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: COLORS.lightOffBlack,
    },
    tabBarLabelStyle: {
        color: COLORS.offBlack,
        fontSize: 14,
        padding: 0,
        margin: 0,
        textTransform: 'capitalize',
        fontWeight: '600',
        fontFamily: 'QuickSand-Regular',
    },
    tabBarIndicatorStyle: {
        backgroundColor: COLORS.offBlack,
        margin: 0,
        padding: 0,
    },
    tabBarItemStyle: {
        padding: 0,
        margin: 0,
    },
    tabBarIndicatorStyle: {
        backgroundColor: COLORS.offBlack,
        height: 3,
    },
}

const FarmTab = ()  => {
    return (
    <Tab.Navigator style={styles.navigation}>
        <Tab.Screen name="Services" component={Services} options={screenOptions}/>
        <Tab.Screen name="Agenda" component={Agenda} options={screenOptions}/>
        <Tab.Screen name="Leden" component={Members} options={screenOptions}/>
        <Tab.Screen name="Reviews" component={Reviews} options={screenOptions}/>
        <Tab.Screen name="Contact" component={Contact} options={screenOptions}/>
    </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'transparent',
        color: 'white',
        elevation: 0,
        shadowOpacity: 0,
    },
});

export default FarmTab;