import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

const Filter = ({ navigation }) => (
  <TouchableOpacity style={styles.filter}>
    <Image source={require('../assets/icons/filters.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    filter: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
    },
});

export default Filter;