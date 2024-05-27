import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const ProfileItem = ({ title, icon, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.profileItem}>
                <View style={styles.profileLeft}>
                    <View style={styles.itemContainer}>
                        <Image style={styles.itemIcon} source={icon}/>
                    </View>
                    <Text style={globalStyles.headerTextSmaller}>{title}</Text>
                </View>
                <Image style={styles.itemArrow} source={require('../assets/arrow-right.png')}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
        paddingBottom: 25,
        paddingTop: 15,
    },
    itemContainer: {
        backgroundColor: COLORS.lightGreen,
        padding: 15,
        borderRadius: 10,
    },
    itemIcon: {
        width: 32,
        height: 32,
    },
    itemArrow: {
        width: 30,
        height: 30,
    }
})

export default ProfileItem;