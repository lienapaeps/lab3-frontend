import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';

import { fetchFarmData } from '../../utils/fetchHelpers';
import { getCurrentLocation, stringifyData } from '../../utils/utils';
import loadGoogleMapsAPI from './webMap';

import COLORS from '../../constants/color';
import Search from '../../components/Search';
import { globalStyles } from '../../styles/global';

let MapViewMob, MarkerMob;

const Map = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [region, setRegion] = useState(null);
    const [farmData, setFarmData] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

    if (Platform.OS === "android" || Platform.OS === "ios") {
        MapViewMob = require("react-native-maps").default;
        MarkerMob = require("react-native-maps").Marker;
    }
      
    if (Platform.OS === "web") {
        MapView = require("@preflower/react-native-web-maps").default;
        MarkerWeb = require("@preflower/react-native-web-maps").Marker;
    }

    const handleFarmCardPress = (id) => {
        navigation.navigate('AppStack', { screen: 'FarmUserDetails', params: { id }});
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const farmDataResponse = await fetchFarmData();
                setFarmData(farmDataResponse.data.farms);
                // console.log("Map farm data: " + stringifyData(farmData));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // console.log("Farm data: ", farmData);

        const fetchUserLocation = async () => {
            try {
                const location = await getCurrentLocation();
                setCurrentLocation(location);
                // console.log("Current location: ", location)
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

        if (Platform.OS === "web") {
            loadGoogleMapsAPI(() => {
                setGoogleMapsLoaded(true);
                // console.log("Google Maps API loaded: " + googleMapsLoaded);
            });
        }

        if (farmData.length > 0) {
            // console.log("First farm coordinates:  ", farmData[0].coordinates);
        }
    }, []);
    
    if (loading || !region || !currentLocation || !farmData || farmData.length === 0) {
        return (
            <View style={globalStyles.loadingContainer}>
                {Platform.OS === "web" ? (
                    <ActivityIndicator size="small" color={COLORS.offBlack} />
                ) : (
                    <ActivityIndicator size="medium" color={COLORS.offBlack} />
                )}
                <Text style={styles.loadingText}>Map is aan het laden...</Text>
            </View>
        );
    }
    
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

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
                {googleMapsLoaded && Platform.OS === "web" ? (
                    <MapView
                        style={styles.map}
                        initialRegion={region}
                        region={region}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                    >
            
                    {(searchResults.length > 0 ? searchResults : farmData).map((farm, id) => (
                        <MarkerWeb
                            key={id}
                            coordinate={{
                                latitude: farm.coordinates.latitude,
                                longitude: farm.coordinates.longitude,
                            }}
                            onPress={() => handleFarmCardPress(farm._id)}
                        >
                        </MarkerWeb>
                        ))}
                    </MapView>
                ) : Platform.OS === "android" || Platform.OS === "ios" ? (
                    <MapViewMob
                        style={styles.map}
                        initialRegion={region}
                        region={region}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                    >
                    {(searchResults.length > 0 ? searchResults : farmData).map((farm, id) => (
                        <MarkerMob
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
                        </MarkerMob>
                        ))}
                        {currentLocation && (
                            <MarkerMob
                            coordinate={{
                                latitude: currentLocation.coords.latitude,
                                longitude: currentLocation.coords.longitude,
                            }}
                            title="Uw locatie"
                            >
                            <View style={styles.currentLocationMarker} />
                        </MarkerMob>
                        )}
                    </MapViewMob>
                ) : (
                    <View>
                        <ActivityIndicator size="large" color={COLORS.offBlack} />
                        <Text style={styles.loadingText}>Map is aan het laden...</Text>
                    </View>
                )}
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
