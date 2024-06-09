import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { fetchUserData, fetchSubscriptionData, getUserIdAndToken } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';

const HomeUser = ({ navigation, route }) => {
    const [userData, setUserData] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const goToCalendar = () => {
        navigation.navigate('AppStack', { screen: 'Calendar' });
    };

    const goToFarm = () => {
        navigation.navigate('App', { screen: 'FarmUser' });
    };    

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData, subscriptionData }});
    }; 

    const goToPackageDetails = (packageId, farmId, userId, packageName) => {
        navigation.navigate('AppStack', { screen: 'PackageDetail', params: { packageId, farmId, userId, packageName }});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { token, userId } = await getUserIdAndToken();

                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                const userDataResponse = await fetchUserData(token, userId);
                if (userDataResponse && userDataResponse.data && userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                    // console.log('userData:', userData);
                } else {
                    console.error('Invalid user data response');
                    return;
                }

                const subscriptionDataResponse = await fetchSubscriptionData(token, userId);
                setSubscriptionData(subscriptionDataResponse.data);
                // console.log('subscriptionData:', subscriptionData);

                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [isFocused, route.params?.reload]);

    useEffect(() => {
        // console.log('userData:', userData);
        // console.log('subscriptionData:', subscriptionData);
    }, [userData, subscriptionData]);

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header with profile pic and notification bell */}
            {userData && (
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                        <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                        <Text style={globalStyles.headerTextSmaller}>{userData.firstname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notification}>
                        <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
            )}
            {/* weergave van huidig pakket */}
            <View>
                <Text style={globalStyles.headerTextSmall}>Huidig Pakket</Text>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    {Platform.OS === "web" ? (
                        <ActivityIndicator size="small" color={COLORS.offBlack} />
                    ) : (
                        <ActivityIndicator size="medium" color={COLORS.offBlack} />
                    )}
                </View>
            ) : (
                subscriptionData ? (
                    subscriptionData.package ? (
                        // er is een pakket
                        <TouchableOpacity onPress={() => goToPackageDetails(subscriptionData.package._id, subscriptionData.farm._id, userData._id, subscriptionData.package.name)}>
                            <View style={styles.packageCard}>
                                <Text style={{...globalStyles.headerText, ...styles.packageFarm}}>{subscriptionData.farm.name}</Text>
                                <Image style={styles.packageImage} source={{ uri: subscriptionData.farm.farmImage }}/>
                                <View style={styles.overlayImage}></View>
                                <View style={styles.packageLabel}>
                                    <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white}}>{subscriptionData.package.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        // er is nog geen pakket
                        <View style={styles.packageEmpty}>
                            <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')}/>
                            <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                            <TouchableOpacity style={styles.button} onPress={goToFarm}>
                                <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek Boerderij</Text>
                            </TouchableOpacity>
                        </View>
                    )
                ) : (
                    // er is nog geen abonnement data beschikbaar
                    <View style={styles.packageEmpty}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')}/>
                        <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                        <TouchableOpacity style={styles.button} onPress={goToFarm}>
                            <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek Boerderij</Text>
                        </TouchableOpacity>
                    </View>
                )
            )}
            {/* weergave van kalender */}
            <View>
                <Text style={globalStyles.headerTextSmaller}>Kalender</Text>
            </View>
            <View style={globalStyles.Header}>
                <Pressable style={styles.button} onPress={goToCalendar}>
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
            <View>
            </View>
            {/* weergave van activiteiten */}
            <View>
                <Text style={globalStyles.headerTextSmaller}>Activiteiten</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
    },
    emptyText: {
        marginBottom: 30,
        textAlign: 'center',
    },
    iconImage: {
        marginBottom: 15,
        width: 22,
        height: 24,
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    profileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
    notification: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 100, 
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,    
    },
    notificationImage: {
        width: 22,
        height: 24,
    },
    packageEmpty: {
        paddingVertical: 40,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    packageCard: {
        marginTop: 15,
    },
    packageImage: {
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
        position: 'relative',
    },
    packageFarm: {
        position: 'absolute',
        top: 20,
        left: 15,
        color: COLORS.white,
        zIndex: 1,
    },
    overlayImage: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        height: 150,
    },
    packageLabel: {
        position: 'absolute',
        bottom: 35,
        left: 15,
        backgroundColor: COLORS.orange,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        zIndex: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
      }
});

export default HomeUser;