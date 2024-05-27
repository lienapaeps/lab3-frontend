import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import Button from '../../components/Button';

const Profile = ({ navigation, route }) => {

    return (
        <View style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Profiel</Text>
            </View>
            <View>
                <Image/>
                <Text>Naam</Text>
            </View>
            <View>
                <View>
                    <Image/>
                    <Text>Mijn account</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 1,
        borderRadius: 50,
        padding: 10,
        margin: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
});

export default Profile;