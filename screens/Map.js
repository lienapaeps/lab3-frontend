import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from 'react-native';

import markers from '../data/markers';
import COLORS from '../constants/color';

const Map = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [region, setRegion] = useState({
        latitude: 51.004433,
        longitude: 4.472707,
        latitudeDelta: .05,
        longitudeDelta: .05,
    });

    const handleSearch = (text) => {
        setSearchText(text);
        const results = markers.filter(marker => marker.title.toLowerCase().includes(text.toLowerCase()));
        setSearchResults(results);

        // Zoom in op de locatie van de eerste gevonden marker (als er resultaten zijn)
        if (results.length > 0) {
            const firstResult = results[0];
            setRegion({
                latitude: firstResult.coordinate.latitude,
                longitude: firstResult.coordinate.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        } else {
            // Als er geen resultaten zijn, reset de regio naar de standaardregio
            setRegion({
                latitude: 51.004433,
                longitude: 4.472707,
                latitudeDelta: .05,
                longitudeDelta: .05,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('../assets/icons/zoek.png')}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Zoek een boerderij"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
             <MapView
                style={styles.map}
                region={region}
                zoomControlEnabled={true}
                loadingEnabled={true}
                >
                {markers.map((marker, id) => (
                    <Marker key={id} coordinate={marker.coordinate}>
                        <View style={styles.marker}>
                            <Image source={require('../assets/icons/marker.png')} style={{ width: 45, height: 45 }} />
                            <View style={styles.markerBox}>
                                <Text style={styles.markerText}>{marker.title}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <View>
                <TouchableOpacity style={styles.lijst} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Lijst tonen</Text>
                    <Image style={styles.arrow} source={require('../assets/arrow-up.png')} />
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
        top: 30,
        left: 30,
        right: 30,
        zIndex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
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
    }
});

export default Map;
