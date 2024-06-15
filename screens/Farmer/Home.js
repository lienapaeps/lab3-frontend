import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchUserData, getUserIdAndToken } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';

const HomeFarmer = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData }});
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
                } else {
                    console.error('Invalid user data response');
                    return;
                }

                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </SafeAreaView>
        );
    }
    
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header with profile pic and notification bell */}
            {userData && (
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                        <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                        <Text style={globalStyles.headerTextSmaller}>{userData.firstname} {userData.lastname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notification}>
                        <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
            )}
            <View>
                <Text style={globalStyles.headerText}>Overzicht</Text>
                <View style={styles.flexDirection}>
                    <View style={styles.card}>
                        <Image style={styles.icon} source={require('../../assets/icons/WinkelmandFarmer.png')}/>
                        <Text style={globalStyles.bodyTextBold}>Pakketten</Text>
                        <View style={styles.alignCenter}>
                            <Text style={globalStyles.headerTextSmall}>45</Text>
                            <Text style={[globalStyles.bodyTextBold, styles.percent]}>+3.4%</Text>
                        </View>
                        <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                    </View>
                    <View style={styles.card}>
                        <Image style={styles.icon} source={require('../../assets/icons/DollarFarmer.png')}/>
                        <Text style={globalStyles.bodyTextBold}>Omzet</Text>
                        <View style={styles.alignCenter}>
                            <Text style={globalStyles.headerTextSmall}>€815.17</Text>
                            <Text style={[globalStyles.bodyTextBold, styles.percent]}>+4.1%</Text>
                        </View>
                        <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                    </View>
                </View>

                <View style={styles.flexDirection}>
                    <View style={styles.card}>
                        <Image style={styles.icon} source={require('../../assets/icons/WinkelmandFarmer.png')}/>
                        <Text style={globalStyles.bodyTextBold}>Volgers</Text>
                        <View style={styles.alignCenter}>
                            <Text style={globalStyles.headerTextSmall}>63</Text>
                            <Text style={[globalStyles.bodyTextBold, styles.percent]}>+1.6%</Text>
                        </View>
                        <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                    </View>
                    <View style={styles.card}>
                        <Image style={styles.icon} source={require('../../assets/icons/WinkelmandFarmer.png')}/>
                        <Text style={globalStyles.bodyTextBold}>Beoordeling</Text>
                        <View style={styles.alignCenter}>
                            <Text style={globalStyles.headerTextSmall}>4.5/5</Text>
                            <Text style={[globalStyles.bodyTextBold, styles.percent]}>6 reviews</Text>
                        </View>
                        <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
        flex: 1,
        padding: 15,
        marginTop: 20,
    },
    flexDirection: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    percent: {
        color: COLORS.orange,
    },
    alignCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    }
});

export default HomeFarmer;