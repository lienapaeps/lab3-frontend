import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const Settings = ({ navigation, route }) => {
    const userData = route.params.userData;

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn account</Text>
            </View>

            {/* update account information */}
          
                <Text style={globalStyles.headerSmallerText}>My account informatie</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Toegankelijkheid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Taal</Text>
                        <Text style={styles.buttonData}>{userData.taal}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Meldingen</Text>
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

export default Settings;