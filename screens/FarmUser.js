import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

import FarmCard from '../components/FarmCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const FarmUser = ({ navigation }) => {
    const goToDetails = (farmData) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails' , params: { farmData }});
    };
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.buttons}>
                <Search/>
                <Filter/>
            </View>
            <View>
                <FarmCard 
                    farmData = {{
                        image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
                        title: "Vlinderveld",
                        adres: "Grote Molenweg, 1980 Zemst",
                        rating: "4.9",
                        kilometer: "3.2km",
                        status: "Open",
                    }}
                    onPress = {goToDetails}
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