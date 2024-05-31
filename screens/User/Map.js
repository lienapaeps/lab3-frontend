import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import { fetchFarmData } from '../../utils/fetchHelpers';
import { getCurrentLocation } from '../../utils/utils';

import COLORS from '../../constants/color';
import Search from '../../components/Search';

const Map = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [region, setRegion] = useState(null);
    const [farmData, setFarmData] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    const handleFarmCardPress = (id) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails', params: { id }});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const farmDataResponse = await fetchFarmData();
                setFarmData(farmDataResponse.data.farms);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const fetchUserLocation = async () => {
            try {
                const location = await getCurrentLocation();
                setCurrentLocation(location);
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUserLocation();
    }, []);
    
    if (loading || !region) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.offBlack} />
                <Text style={styles.loadingText}>Map is aan het laden...</Text>
            </View>
        );
    }
    
      if (error) {
        return <Text>Error: {error.message}</Text>;
      }

    const handleSearch = (text) => {
        setSearchText(text);
        const results = farmData.filter(farm => farm.name.toLowerCase().includes(text.toLowerCase()));
        setSearchResults(results);

        // Zoom in op de locatie van de eerste gevonden marker (als er resultaten zijn)
        if (results.length > 0) {
            const firstResult = results[0];
            console.log(firstResult); 
            setRegion({
                latitude: firstResult.coordinates.latitude,
                longitude: firstResult.coordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        } else {
            // Als er geen resultaten zijn, reset de regio naar de standaardregio
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Search
                    searchTerm={searchText}
                    onSearchTermChange={handleSearch}
                    placeholder="Zoek een boerderij"
                    width={'100%'}
                />
            </View>
            <MapView
                style={styles.map}
                region={region}
                zoomControlEnabled={true}
                loadingEnabled={true}
            >
                {(searchResults.length > 0 ? searchResults : farmData).map((farm, id) => (
                    <Marker
                        key={id}
                        coordinate={{
                            latitude: farm.coordinates.latitude,
                            longitude: farm.coordinates.longitude,
                        }}
                        onPress={() => handleFarmCardPress(farm._id)}
                    >
                        <View style={styles.marker}>
                            <Image source={require('../../assets/icons/marker.png')} style={{ width: 45, height: 45 }} />
                            <View style={styles.markerBox}>
                                <Text style={styles.markerText}>{farm.name}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
                {currentLocation && (
                    <Marker
                    coordinate={{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    }}
                    title="Uw locatie"
                    >
                    <View style={styles.currentLocationMarker} />
                </Marker>
                )}
            </MapView>
            <View>
                <TouchableOpacity style={styles.lijst} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Lijst tonen</Text>
                    <Image style={styles.arrow} source={require('../../assets/arrow-up.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchContainer: {
        position: 'absolute',
        top: 60,
        left: 30,
        right: 30,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerBox: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: COLORS.offWhite,
        borderRadius: 10,
    },
    markerText: {
        fontSize: 14,
        fontFamily: "Quicksand_600SemiBold"
    },
    lijst: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "Baloo2_600SemiBold",
        color: COLORS.offBlack,
    },
    arrow: {
        width: 24,
        height: 24,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: COLORS.offBlack,
    },
    currentLocationMarker: {
        width: 25,
        height: 25,
        borderRadius: 30,
        backgroundColor: "#378ee3",
        borderWidth: 4,
        borderColor: "white",
    },
});

export default Map;
