import React, { useState, useEffect, } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';


const MyAccount = ({ navigation, route }) => {
    const userData = route.params.userData;

    const handleGoToEmail = async () => {
        navigation.navigate('AppStack', { screen: 'Email', params: { userData: userData }});
    }

    const handleGoToPhone = async () => {
        navigation.navigate('AppStack', { screen: 'Phone', params: { userData: userData }});
    }

    const handleGoToPassword = async () => {
        navigation.navigate('AppStack', { screen: 'Password', params: { userData: userData }});
    }

   

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn account</Text>
            </View>

            {/* update account information */}
          
                <Text style={globalStyles.headerSmallerText}>My account informatie</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={handleGoToEmail}>
                        <Text style={styles.buttonText}>E-mail</Text>
                        <Text style={styles.buttonData}>{userData.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleGoToPhone}>
                        <Text style={styles.buttonText}>Telefoon</Text>
                        <Text style={styles.buttonData}>{userData.telefoon}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleGoToPassword}>
                        <Text style={styles.buttonText}>Wachtwoord</Text>
                    </TouchableOpacity>
                </View>
        
            {/* account management */}
         
                <Text style={globalStyles.headerSmallerText}>Accountmanagement</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Account uitschakelen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Account verwijderen</Text>
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
       
       
        left: 0,
        height: 40,
    },
    buttonData: {
    fontWeight: '300',
        marginLeft: 20,
       
    },
});

export default MyAccount;