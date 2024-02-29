import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';
import farmData from '../data/farmData'; // dummy data

import FarmCard from '../components/FarmCard';
import Search from '../components/Search';
import Filter from '../components/Filter';
import MapButton from '../components/MapButton';

const FarmUser = ({ navigation }) => {
    const goToDetails = (farmData) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails', params: { farmData }});
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState(0);
    const [distanceFilter, setDistanceFilter] = useState('');

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    const handleFilterChange = (status) => {
        setStatusFilter(status);
    };

    const handleRatingFilterChange = (rating) => {
        setRatingFilter(rating);
    };

    const handleDistanceFilterChange = (distance) => {
        setDistanceFilter(distance);
    };

    const filteredFarmData = farmData.filter(farm => {
        const titleMatches = farm.title.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatches = statusFilter === 'All' || farm.status === statusFilter;
        const ratingMatches = farm.rating >= ratingFilter;
        const distanceMatches = !distanceFilter || parseFloat(farm.kilometer) <= parseFloat(distanceFilter);
        return titleMatches && statusMatches && ratingMatches && distanceMatches;
    });

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.buttons}>
                <Search searchTerm={searchTerm} onSearchTermChange={handleSearch} />
                <Filter
                    onFilterChange={handleFilterChange}
                    onRatingFilterChange={handleRatingFilterChange}
                    onDistanceFilterChange={handleDistanceFilterChange}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredFarmData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FarmCard farmData={item} onPress={goToDetails} />}
                />
            </View>
            <MapButton onPress={() => navigation.navigate('Map')} />
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
