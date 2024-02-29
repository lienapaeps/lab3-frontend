import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';

import FarmCard from '../components/FarmCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const FarmUser = ({ navigation }) => {
    const goToDetails = (farmData) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails' , params: { farmData }});
    };

    // Dummy data
    const farmData = [
        {
            id: '1',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            adres: "Grote Molenweg, 1980 Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '2',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            adres: "Grote Molenweg, 1980 Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '3',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            adres: "Grote Molenweg, 1980 Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '4',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            adres: "Grote Molenweg, 1980 Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        },
        {
            id: '5',
            image: "https://lh3.googleusercontent.com/p/AF1QipNzZYFue1aA2L0m0PlzqV02CXjen_n9ICNjSsAl=s1360-w1360-h1020",
            title: "Vlinderveld",
            adres: "Grote Molenweg, 1980 Zemst",
            rating: "4.9",
            kilometer: "3.2km",
            status: "Open",
        }
    ]

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.buttons}>
                <Search/>
                <Filter/>
            </View>
            <View style={{flex: 1}}>
                <FlatList
                    data={farmData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <FarmCard farmData={item} onPress={goToDetails} />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingBottom: -30,
        backgroundColor: COLORS.offWhite,
    },
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