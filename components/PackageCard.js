import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const getImageForPackage = (name) => {
    switch(name.toLowerCase()) {
        case 'groentepakketen':
            return require('../assets/packages/groentepakketten.png');
        case 'zelfoogst':
            return require('../assets/packages/zelfoogst.png');
        case 'meewerkpakket':
            return require('../assets/packages/meewerkpakket.png');
        default:
            return require('../assets/packages/groentepakketten.png');
    }
}

const PackageCard = ({ name, description, price }) => {

    const packageImage = getImageForPackage(name);

    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardImage}>
                <Image style={styles.image} source={packageImage} />
            </View>

            <View style={styles.cardInfo}>
                <Text style={{...globalStyles.headerTextSmaller, fontSize: 18}}>{name}</Text>
                <Text style={{...globalStyles.bodyText, color: COLORS.lightOffBlack, marginTop: 5 }}>€{price}/jaar</Text>
            </View>

            <View style={styles.cardEdit}>
                <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.orange}}>Bewerk</Text>
                <Image style={styles.editIcon} source={require('../assets/icons/link-arrow.png')}/>
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
        width: 200,
        paddingBottom: 20,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: 200,
        height: 120,
    },
    cardInfo: {
        marginLeft: 15,
        paddingTop: 10,
    },
    cardEdit: {
        marginLeft: 15,
        paddingTop: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    editIcon: {
        width: 10,
        height: 10,
        marginLeft: 5,
    }
})

export default PackageCard;