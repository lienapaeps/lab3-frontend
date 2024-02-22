import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

import FarmCard from '../components/FarmCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const FarmUser = ({ navigation }) => {
    const goToDetails = () => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails' });
    };
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.buttons}>
                <Search/>
                <Filter/>
            </View>
            <View>
                <FarmCard 
                    image="https://via.placeholder.com/100"
                    title="Boerderij 1"
                    adres="Adres 1"
                    rating="4.5"
                    kilometer="5 km"
                    status="Open"
                    link={goToDetails}
                />                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
});

export default FarmUser;