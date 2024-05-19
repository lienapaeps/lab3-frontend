import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const AcitvityCard = () => {
    return (
        <TouchableOpacity style={styles.card}>
                <View style={styles.cardImage}>
                    <Image style={styles.image} source={require('../assets/onboarding/onboarding1.png')} />
                </View>
                <View style={styles.cardTitle}>
                    <Text style={{...globalStyles.headerTextSmaller, fontSize: 18}}>Koken met Koen</Text>
                </View>
                <View style={styles.cardDate}>
                    <Text style={{...globalStyles.headerTextSmaller, color: COLORS.offBlack}}>24 dec</Text>
                </View>
                <View style={styles.cardType}>
                    <Text style={{...globalStyles.headerTextSmaller, color: COLORS.white}}>Workshop</Text>
                </View>
                <View style={styles.cardTime}>
                    <Image source={require('../assets/icons/clock-black.png')} />
                    <Text style={{...globalStyles.bodyText, color: COLORS.offBlack}}>14:00 - 16:00</Text>
                </View>
                <View style={styles.cardFarm}>
                    <Image source={require('../assets/icons/locatie-black.png')} />
                    <Text style={{...globalStyles.bodyText, color: COLORS.OffBlack}}>Hof Ter Dreef</Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
        width: 210,
        paddingBottom: 20,
        position: 'relative',
    },
    cardTitle: {
        marginLeft: 15,
        paddingTop: 10,
    },
    cardDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 15,
        right: 15,
    },
    cardType: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
        position: 'absolute',
        top: 15,
        left: 15,
    },
    cardTime: {
        marginLeft: 15,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardFarm: {
        marginLeft: 15,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: 210,
        height: 150,
    }
})

export default AcitvityCard;