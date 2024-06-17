import React, { useState, useEffect, } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, Linking } from 'react-native'

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const Settings = ({ navigation, route }) => {
    const userData = route.params.userData;

    const handleGoToAccess = async () => {
        Linking.openSettings();
    }

    const handleGoToLanguage = async () => {
        navigation.navigate('AppStack', { screen: 'Language', params: { userData: userData }});
    }

    const handleGoToNotifications = async () => {
        Linking.openSettings();

    }

    return (
        <SafeAreaView style={{...globalStyles.container, marginHorizontal: 20}}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn account</Text>
            </View>

            {/* update account information */}
          
                <Text style={globalStyles.headerTextSmallerRegular}>App-instellingen</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={handleGoToAccess}>
                        <Text style={globalStyles.headerTextSmallerMedium}>Toegankelijkheid</Text>
                        <Image style={styles.icon} source={require('../../../assets/arrow-right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button } onPress={handleGoToLanguage}>
                        <Text style={globalStyles.headerTextSmallerMedium}>Taal</Text>
                        <Text style={styles.buttonData}>Nederlands</Text>
                        <Image style={styles.icon} source={require('../../../assets/arrow-right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleGoToNotifications}>
                        <Text style={globalStyles.headerTextSmallerMedium}>Meldingen</Text>
                        <Image style={styles.icon} source={require('../../../assets/arrow-right.png')}/>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
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
        left: 0,
        height: 40,
        paddingLeft: 20,
    },
    buttonText: {
        fontWeight: '300',
        marginLeft: 20,
        fontSize: 16,
    },
    buttonData: {
        fontWeight: '300',
        color: COLORS.offBlack,
        flex: 1,
        marginRight: 20,
        textAlign: 'right',
        
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
});

export default Settings;