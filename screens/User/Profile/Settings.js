import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const Settings = ({ navigation, route }) => {
    const userData = route.params.userData;

    const handleGoToAccess = async () => {
        navigation.navigate('AppStack', { screen: 'Access', params: { userData: userData }});
    }

    const handleGoToLanguage = async () => {
        navigation.navigate('AppStack', { screen: 'Language', params: { userData: userData }});
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn account</Text>
            </View>

            {/* update account information */}
          
                <Text style={globalStyles.headerSmallerText}>My account informatie</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={handleGoToAccess}>
                        <Text style={globalStyles.headerTextSmaller}>Toegankelijkheid</Text>
                        <Image style={styles.icon} source={require('../../../assets/arrow-right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button } onPress={handleGoToLanguage}>
                        <Text style={globalStyles.headerTextSmaller}>Taal</Text>
                        <Text style={styles.buttonData}>{userData.taal}</Text>
                        <Image style={styles.icon} source={require('../../../assets/arrow-right.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={globalStyles.headerTextSmaller}>Meldingen</Text>
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
        marginLeft: 20,
       
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
});

export default Settings;