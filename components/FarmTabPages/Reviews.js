import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
 
const Reviews = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>8 recensies</Text>
                <TouchableOpacity style={styles.filter}>
                    <Text style={globalStyles.headerTextSmaller}>Meest recent</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    }
      
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontFamily: 'Baloo2_500Medium',
        color: COLORS.offBlack,
    },
    filter: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.lightOffBlack,
    }
})

export default Reviews;
