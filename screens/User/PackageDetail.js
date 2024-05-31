import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'

import { fetchFarmDataById, fetchPackageDataById } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

const PackageDetail = ({ navigation, route }) => {
    const [farmData, setFarmData] = useState([]);
    const [packageData, setPackageData] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const { farmId, packageId, userId } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const farmResponse = await fetchFarmDataById(farmId);
                setFarmData(farmResponse.data.farm);

                const packageResponse = await fetchPackageDataById(packageId, userId);
                setPackageData(packageResponse.packageData);
                setSubscriptionDetails(packageResponse.subscriptionDetails);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [farmId, packageId, userId]);

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
                <Text>Laden...</Text>
            </View>
        );
    }

    if (!farmData || !packageData || !subscriptionDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

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
                        <Text style={globalStyles.headerTextSmall}>Details van je pakket</Text>
                        <View style={styles.packageContainer}>
                            <Text style={globalStyles.headerTextSmaller}>{packageData.name}</Text>
                            <Text style={globalStyles.bodyText}>{packageData.description}</Text>
                            {/* <Text style={globalStyles.bodyText}>{packageData.price} euro</Text>  */}
                            <View style={styles.dates}>
                                {/* <Text style={globalStyles.bodyTextSmall}>Prijs: €{packageData.price}</Text> */}
                                <Text style={globalStyles.bodyTextSmall}>Start: {new Date(subscriptionDetails.startDate).toLocaleDateString()}</Text>
                                <Text style={globalStyles.bodyTextSmall}>Verloopt op: {new Date(subscriptionDetails.expirationDate).toLocaleDateString()}</Text> 
                            </View>   
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        {/* <Text style={globalStyles.headerTextSmall}>Inhoud van het pakket</Text> */}
                        <View style={styles.contentContainer}>
                        {packageData.contents && packageData.contents.length > 0 ? (
                                packageData.contents.map(product => (
                                    <View style={styles.content} key={product._id}>
                                        <Text style={globalStyles.bodyTextSemiBold}>{product.item} ({product.quantity} {product.unit})</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={globalStyles.bodyText}>Geen inhoud beschikbaar</Text>
                            )}
                        </View>
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
    infoContainer: {
        marginBottom: 20,
    },
    packageContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
    },
    dates: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    contentContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
    },
});

export default PackageDetail;