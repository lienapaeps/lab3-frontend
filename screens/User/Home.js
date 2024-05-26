import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeUser = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [farmData, setFarmData] = useState(null);
    const [packageData, setPackageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const userId = await AsyncStorage.getItem('userId');

                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                const userDataResponse = await fetchUserData(token, userId);
                setUserData(userDataResponse.data.user);

                const subscriptionDataResponse = await fetchSubscriptionData(token, userId);
                setSubscriptionData(subscriptionDataResponse.data);

                if (subscriptionDataResponse.data.isSubscribedToPackage) {
                    const farmDataResponse = await fetchFarmData(token, subscriptionDataResponse.data.farmId);
                    setFarmData(farmDataResponse.data.farm);

                    const packageDataResponse = await fetchPackageData(token, subscriptionDataResponse.data.packageId);
                    setPackageData(packageDataResponse);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const fetchUserData = async (token, userId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const fetchSubscriptionData = async (token, userId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/check-subscription/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const fetchFarmData = async (token, farmId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const fetchPackageData = async (token, packageId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/packages/${packageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const goToCalendar = () => {
        navigation.navigate('AppStack', { screen: 'Calendar' });
    };
    const goToFarm = () => {
       //nagiate to subscription page
        navigation.navigate('Sub', { screen: 'Subscription' });
    };    

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header with profile pic and notification bell */}
            {userData && (
                <View style={styles.profile}>
                    <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                    <Text style={globalStyles.headerTextSmaller}>{userData.firstname}</Text>
                </View>
            )}
            {/* weergave van huidig pakket */}
            <View>
                <Text style={globalStyles.headerTextSmall}>Huidig Pakket</Text>
            </View>
            {subscriptionData && subscriptionData.isSubscribedToPackage ? (
                <TouchableOpacity>
                    <View style={styles.packageCard}>
                        <Text style={{...globalStyles.headerText, ...styles.packageFarm}}>{farmData.name}</Text>
                        <Image style={styles.packageImage} source={{ uri: farmData.farmImage }}/>
                        <View style={styles.overlayImage}></View>
                        <View style={styles.packageLabel}>
                            <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white}}>{packageData.data.package.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ) : (
                <View style={styles.packageEmpty}>
                    <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')}/>
                    <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                    <Pressable style={styles.button} onPress={goToFarm}>
                        <Text style={{...globalStyles.bodyText, color: COLORS.white }}>Zoek Boerderij</Text>
                    </Pressable>
                </View>
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: COLORS.orange,
    },
    emptyText: {
        marginBottom: 30,
        textAlign: 'center',
    },
    iconImage: {
        marginBottom: 15,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
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
});

export default HomeUser;