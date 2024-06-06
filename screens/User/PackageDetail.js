import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import { getISOWeek } from 'date-fns';

import { fetchFarmDataById, fetchPackageDataById } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

const PackageDetail = ({ navigation, route }) => {
    const [farmData, setFarmData] = useState([]);
    const [packageData, setPackageData] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const { farmId, packageId, userId, packageName } = route.params;

    const getWeek = (date) => {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + 6);
        const startDay = startDate.getDate();
        const startMonth = startDate.toLocaleDateString('nl-NL', { month: 'long' });
        const endDay = endDate.getDate();
        const endMonth = endDate.toLocaleDateString('nl-NL', { month: 'long' });
        return `Week ${getISOWeek(startDate)} (${startDay} - ${endDay} ${startMonth})`;
    };

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.backButton} source={require('../../assets/Back-arrow.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={1} style={{ paddingBottom: 50 }}>
                    <View style={styles.bgImg}>
                        <Image style={styles.headerImage} source={{ uri: farmData.farmImage }}/>
                        <Text style={{...globalStyles.headerText, ...styles.packageFarm}}>{farmData.name}</Text>
                        <View style={styles.overlayImage}></View>
                        <View style={styles.packageLabel}>
                            <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white}}>{packageName}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Text style={globalStyles.headerText}>Inhoud van je pakket</Text>
                            {/* <View style={styles.packageContainer}> */}
                                {/* <Text style={globalStyles.headerTextSmaller}>{packageData.name}</Text> */}
                                {/* <Text style={globalStyles.bodyText}>{packageData.description}</Text> */}
                                {/* <Text style={globalStyles.bodyText}>{packageData.price} euro</Text>  */}
                                {/* <View style={styles.dates}> */}
                                    {/* <Text style={globalStyles.bodyTextSmall}>Prijs: €{packageData.price}</Text> */}
                                    {/* <Text style={globalStyles.bodyTextSmall}>Start: {new Date(subscriptionDetails.startDate).toLocaleDateString()}</Text> */}
                                    {/* <Text style={globalStyles.bodyTextSmall}>Verloopt op: {new Date(subscriptionDetails.expirationDate).toLocaleDateString()}</Text>  */}
                                {/* </View>    */}
                            {/* </View> */}
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.dateContainer}>
                                <Text style={globalStyles.bodyTextSemiBold}>{getWeek(packageData.pickUpDate)}</Text>
                            </View>
                            {/* <Text style={globalStyles.headerTextSmall}>Inhoud van het pakket</Text> */}
                            <View style={styles.contentContainer}>
                            {packageData.contents && packageData.contents.length > 0 ? (
                                    packageData.contents.map(product => (
                                        <View style={styles.content} key={product._id}>
                                            <View style={styles.productImage}>
                                                <Image source={{ uri: product.imageUrl }} style={{ flex: 1, resizeMode: 'contain' }} />
                                            </View>
                                            <Text style={globalStyles.bodyTextSemiBold}>{product.item} ({product.quantity} {product.unit})</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={globalStyles.bodyText}>Geen inhoud beschikbaar</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
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
        bottom: 60,
        left: 20,
        color: COLORS.white,
        zIndex: 1,
    },
    overlayImage: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        height: 240,
    },
    packageLabel: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        backgroundColor: COLORS.orange,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        zIndex: 1,
    },
    infoContainer: {
        marginBottom: 10,
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
        marginVertical: 10,
        alignItems: 'center',
        gap: 15
    },
    dateContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    productImage: {
        width: 70,
        height: 70,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 5,
    },
});

export default PackageDetail;