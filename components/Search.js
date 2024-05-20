import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import COLORS from '../constants/color';

const InputField = ({ searchTerm, onSearchTermChange, placeholder}) => {
    return (
        <View style={styles.sectionStyle}>
            <Image style={styles.icon} source={require('../assets/icons/zoek.png')} />
            <TextInput
                style={styles.searchBar} 
                placeholder={placeholder}
                onChangeText={onSearchTermChange}
                value={searchTerm}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    sectionStyle: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
        height: 60,
        borderRadius: 10,
    },
    searchBar: {
        flex: 1,
        // padding: 10,
    },
})

export default InputField;