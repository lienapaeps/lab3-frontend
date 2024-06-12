import React, { useState, useEffect, } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const MyAccount = ({ navigation, route }) => {
    const userData = route.params.userData;

    const handleGoToEmail = async () => {
        navigation.navigate('AppStack', { screen: 'Email', params: { userData: userData } });
    }

    const handleGoToPhone = async () => {
        navigation.navigate('AppStack', { screen: 'Phone', params: { userData: userData } });
    }

    const handleGoToPassword = async () => {
        navigation.navigate('AppStack', { screen: 'Password', params: { userData: userData } });
    }

    //delete account
    const handleDeleteAccount = async () => {
        try {
            // remove user data from database
            // code here
            // remove user data from async storage
            await AsyncStorage.removeItem('userData');
            navigation.navigate('AppStack', { screen: 'Login' });
        } catch (error) {
            console.log(error);
        }
    }

    //Deactivate account
    const handleDeactivateAccount = async () => {
        try {
            // deactivate user account
            // code here
            // remove user data from async storage
            await AsyncStorage.removeItem('userData');
            navigation.navigate('AppStack', { screen: 'Login' });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn account</Text>
            </View>
            {/* update account information */}
            <Text style={globalStyles.bodyTextRegular}>Accountinformatie</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleGoToEmail}>
                    <Text style={globalStyles.headerTextSmaller}>E-mail</Text>
                    <Text style={styles.buttonData}>{userData.email}</Text>
                    <Image style={styles.icon} source={require('../../../assets/arrow-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGoToPhone}>
                    <Text style={globalStyles.headerTextSmaller}>Telefoon</Text>
                    <Text style={styles.buttonData}>{userData.telephone}</Text>
                    <Image style={styles.icon} source={require('../../../assets/arrow-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGoToPassword}>
                    <Text style={globalStyles.headerTextSmaller}>Wachtwoord</Text>
                    <Image style={styles.icon} source={require('../../../assets/arrow-right.png')} />
                </TouchableOpacity>
            </View>
            {/* account management */}
            <Text style={globalStyles.headerSmallerText}>Accountmanagement</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text style={globalStyles.headerTextSmaller}>Account uitschakelen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={globalStyles.headerTextSmaller}>Account verwijderen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
    },

    container: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        paddingLeft: 20,

        left: 0,
        height: 40,
    },
    buttonData: {
        fontWeight: '300',
        marginLeft: 20,

    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
});

export default MyAccount;
