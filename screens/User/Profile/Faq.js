import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const Faq = ({ navigation, route }) => {

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text>FAQ</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
    },
});

export default Faq;