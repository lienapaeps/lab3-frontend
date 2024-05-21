import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';

import FarmCard from '../components/FarmCard';
import Filter from '../components/Filter';
import Search from '../components/Search';
import MapButton from '../components/MapButton';

import { checkStatus, calculateDistance, getUserLocation } from '../utils/utils';

const FarmUser = ({ navigation }) => {
    const [farmData, setFarmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [openNowFilter, setOpenNowFilter] = useState('All');
    const [distanceFilter, setDistanceFilter] = useState(0)
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchFarmData = async () => {
            try {
                const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/farms', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                setFarmData(data.data.farms);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmData();

        const fetchUserLocation = async () => {
            try {
                const location = await getUserLocation();
                setUserLocation(location);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUserLocation();
    }, []);

    const handleSearchTermChange = (text) => setSearchTerm(text);

    const handleFilterChange = (status) => setOpenNowFilter(status);

    const handleDistanceFilterChange = (distance) => setDistanceFilter(distance);

    const handleFarmCardPress = (id) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails', params: { id } });
    };

    const filteredFarmData = farmData.filter((farm) => {
        const matchesSearchTerm = farm.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOpenNow = openNowFilter === 'All' || (openNowFilter === 'Open' && checkStatus(farm.openinghours));
        const matchesDistance = distanceFilter === 0 || (userLocation && calculateDistance(
            userLocation.coords.latitude,
            userLocation.coords.longitude,
            farm.coordinates.latitude,
            farm.coordinates.longitude
        ) <= distanceFilter);

        return matchesSearchTerm && matchesOpenNow && matchesDistance;
    });

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Laden...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Error: {error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.options}>
                <Search placeholder={"Zoek een boerderij"} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
                <Filter onFilterChange={handleFilterChange} onDistanceFilterChange={handleDistanceFilterChange} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredFarmData}
                    keyExtractor={item => item._id}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 90 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <FarmCard farmData={item} onPress={() => handleFarmCardPress(item._id)}/>}
                />
            </View>
            <View style={styles.map}>
                <MapButton />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    map: {
        alignItems: 'center',
    }
});

export default FarmUser;
