import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { fetchUserData, fetchSubscriptionData, getUserIdAndToken, fetchActivityDataById } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import AgendaCard from '../../components/AgendaCard';

const HomeUser = ({ navigation, route }) => {
    const [userData, setUserData] = useState(null);
    const [agendaData, setAgendaData] = useState(null); 
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    const [activitiesData, setActivitiesData] = useState(null);

    const goToCalendar = () => {
        navigation.navigate('AppStack', { screen: 'Calendar' });
    };

    const goToFarm = () => {
        navigation.navigate('App', { screen: 'FarmUser' });
    };    

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData }});
    }; 

    const goToExplore = () => {
        navigation.navigate('App', { screen: 'Explore' });
    }

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
                    const user = userDataResponse.data.user;
                    setUserData(user);

                    if (user.agenda) {
                        setAgendaData(user.agenda);
                        // console.log('agendaData:', stringifyData(user.agenda));

                        // fetch activities by id in user agenda
                        const activities = await Promise.all(user.agenda.map(async (agendaItem) => {
                            const activityDataResponse = await fetchActivityDataById(agendaItem._id);
                            return activityDataResponse.data.activity;
                        }));
                        setActivitiesData(activities);
                    }

                } else {
                    console.error('Invalid user data response');
                    return;
                }

                const subscriptionDataResponse = await fetchSubscriptionData(token, userId);
                setSubscriptionData(subscriptionDataResponse.data);
                // console.log('subscriptionData:', subscriptionData);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isFocused, route.params?.reload]);

    useEffect(() => {
        // console.log('userData:', userData);
        // console.log('subscriptionData:', subscriptionData);
        // console.log('activitiesData:', activitiesData);
    }, [userData, subscriptionData, activitiesData]);

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </View>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* Header met profielfoto en meldingsbel */}
            {userData && (
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                        <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                        <Text style={{...globalStyles.headerTextSmaller, ...globalStyles.capitalize}}>{userData.firstname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notification}>
                        <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
            )}
    
            {/* Weergave van huidig pakket */}
            <View>
                <Text style={globalStyles.headerTextSmall}>Huidig Pakket</Text>
            </View>
    
            {/* Laadinidicator */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    {Platform.OS === "web" ? (
                        <ActivityIndicator size="small" color={COLORS.offBlack} />
                    ) : (
                        <ActivityIndicator size="medium" color={COLORS.offBlack} />
                    )}
                </View>
            ) : (
                // Pakketweergave
                <View>
                    {subscriptionData && subscriptionData.package ? (
                        // Er is een pakket
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
                        // Er is geen pakket
                        <View style={styles.packageEmpty}>
                            <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')}/>
                            <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                            <TouchableOpacity style={styles.button} onPress={goToFarm}>
                                <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek Boerderij</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
    
            {/* Weergave van kalender */}
            <View>
                <Text style={{...globalStyles.headerTextSmall, marginBottom: 10}}>Kalender</Text>
            </View>
    
            {/* Activiteiten weergave */}
            {activitiesData && activitiesData.length > 0 ? (
                    // Er zijn activiteiten in de kalender
                    <View>
                        {activitiesData.map((activity, index) => (
                            <AgendaCard key={index} activity={activity} />
                        ))}
                    </View>
                ) : (
                    // Er zijn geen activiteiten in de kalender
                    <View style={styles.calendarEmpty}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/date-black.png')}/>
                        <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je kalender is nog leeg want je hebt geen activiteiten.</Text>
                        <TouchableOpacity style={styles.button} onPress={goToExplore}>
                            <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek een activiteit</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView>
    );
};

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
    calendarEmpty: {
        paddingVertical: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
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
    },
});

export default HomeUser;