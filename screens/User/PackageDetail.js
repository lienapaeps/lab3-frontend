import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
import Button from '../../components/Button';

const PackageDetail = ({ navigation, route }) => {
    const [farmData, setFarmData] = useState([]);
    const [packageData, setPackageData] = useState([]);

    const farmId = route.params.farmId;
    const packageId = route.params.packageId;

    useEffect(() => {
        const fetchFarmData = async (farmId) => {
            try {
                const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                setFarmData(data.data.farm);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchPackageData = async (packageId) => {
            try {
                const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/packages/${packageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                // console.log(data.data.package);
                setPackageData(data.data.package);
            }
            catch (error) {
                console.error('Error:', error);
            }
        };

        fetchFarmData(farmId);
        fetchPackageData(packageId);
    }, []);

    return (
        <View>
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../../assets/Back-arrow.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
                <View style={styles.bgImg}>
                    <Image style={styles.headerImage} source={{ uri: farmData.farmImage }}/>
                    <Text style={{...globalStyles.headerText, ...styles.packageFarm}}>{farmData.name}</Text>
                    <View style={styles.overlayImage}></View>
                </View>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={globalStyles.headerText}>{packageData.name}</Text>
                        <Text style={globalStyles.bodyText}>{packageData.description}</Text>
                        <Text style={globalStyles.bodyText}>{packageData.price} euro</Text>    
                        <Text style={globalStyles.bodyText}>Start datum, verloopt op</Text>   
                        <Text style={globalStyles.bodyText}>Abonnement beheren</Text>    
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={globalStyles.headerTextSmall}>Inhoud van het pakket</Text>
                        <Text>bla bla bla</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: -30,
        paddingTop: 20,
    },
    btn: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 10,
        margin: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
    headerImage: {
        padding: 0,
        width: '100%',
        height: 240,
    },
    packageFarm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: COLORS.white,
        zIndex: 1,
    },
    overlayImage: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        height: 240,
    },
});

export default PackageDetail;