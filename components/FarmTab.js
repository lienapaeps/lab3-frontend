import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import COLORS from '../constants/color';

import ChatUser from '../screens/ChatUser';
import FarmPackage from '../components/FarmPackage';
import { globalStyles } from '../styles/global';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: COLORS.white,
        elevation: 0,
        padding: 0,
        margin: 0,
        shadowOpacity: 0,
        backgroundColor: 'transparent',
    },
    tabBarLabelStyle: {
        color: COLORS.offBlack,
        fontSize: 12,
        padding: 0,
        margin: 0,
        textTransform: 'capitalize',
    },
    tabBarIndicatorStyle: {
        backgroundColor: COLORS.offBlack,
        margin: 0,
    },
    tabBarItemStyle: {
        padding: 0,
        margin: 0,
    }
}

const FarmTab = ()  => {
    return (
    <Tab.Navigator style={[globalStyles.container, styles.navigation]}>
        <Tab.Screen name="Services" component={FarmPackage} options={screenOptions}/>
        <Tab.Screen name="Agenda" component={ChatUser} options={screenOptions}/>
        <Tab.Screen name="Leden" component={ChatUser} options={screenOptions}/>
        <Tab.Screen name="Reviews" component={ChatUser} options={screenOptions}/>
        <Tab.Screen name="Contact" component={ChatUser} options={screenOptions}/>
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
    navigation: {
        borderBottomWidth: 20,
        borderColor: COLORS.orange,
    },
});

export default FarmTab;