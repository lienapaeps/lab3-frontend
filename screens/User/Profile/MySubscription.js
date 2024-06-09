import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'


import { globalStyles } from '../../../styles/global';

const MySubscription = ({ navigation, route }) => {

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn abbonement</Text>
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
});

export default MySubscription;