import React, { act, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import { fetchUserData, fetchSubscriptionData, getUserIdAndToken, fetchActivityDataById } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import AgendaCard from '../../components/AgendaCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import CalendarPage from './CalendarPage';
import { ScrollView } from 'react-native-gesture-handler';

const HomeUser = ({ navigation, route }) => {
    const [userData, setUserData] = useState(null);
    const [agendaData, setAgendaData] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    const [activitiesData, setActivitiesData] = useState(null);

    //------------------------------------------------

    // Get the current date
    const today = new Date();
    const currentDay = today.getDay();
    // Calculate the start and end of the current week
    const startOfWeek = new Date(today);
    //startOfWeek.setDate(today.getDate() - currentDay + 1);
    //start of the week is always monday
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + (startOfWeek.getDay() === 0 ? -6 : 1));
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - currentDay));

    // Create an array of the days of the week
    const week = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });
    //------------------------------------------------
  

    //navigations
    function goToCalendar() {
        navigation.navigate('AppStack', { screen: 'Calendar' , params: { activitiesData }});
    }

    const goToFarm = () => {
        navigation.navigate('App', { screen: 'FarmUser' });
    };

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData, subscriptionData } });
    };

    const goToExplore = () => {
        navigation.navigate('App', { screen: 'Explore' });
    }

    const goToPackageDetails = (packageId, farmId, userId, packageName) => {
        navigation.navigate('AppStack', { screen: 'PackageDetail', params: { packageId, farmId, userId, packageName } });
    };

    const handleAgendaCardPress = (activityId, farmId) => {
        navigation.navigate('AppStack', { screen: 'ActivityDetail', params: { id: activityId, farmId } });
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

// Check if the dates from activities are the same as a day in the calendar
const renderDot = (day) => {
    const isActivityDay = activitiesData.some(activity => {
        const activityDate = new Date(activity.start.date);
  
        return day.toDateString() === activityDate.toDateString();
    });
    if (isActivityDay) {
        return <View style={styles.dot} />;
    } else {
        return null;
    }
    
};
return (
    <SafeAreaView style={globalStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            {userData && (
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                        <Image style={styles.profileImage} source={{ uri: userData.profilePicture }} />
                        <Text style={{ ...globalStyles.headerTextSmaller, ...globalStyles.capitalize }}>{userData.firstname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notification}>
                        <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Package Section */}
            <View>
                <Text style={globalStyles.headerTextSmall}>Huidig Pakket</Text>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="medium" color={COLORS.offBlack} />
                    </View>
                ) : (
                    <View>
                        {subscriptionData && subscriptionData.package ? (
                            <TouchableOpacity onPress={() => goToPackageDetails(subscriptionData.package._id, subscriptionData.farm._id, userData._id, subscriptionData.package.name)}>
                                <View style={styles.packageCard}>
                                    <Text style={{ ...globalStyles.headerText, ...styles.packageFarm }}>{subscriptionData.farm.name}</Text>
                                    <Image style={styles.packageImage} source={{ uri: subscriptionData.farm.farmImage }} />
                                    <View style={styles.overlayImage}></View>
                                    <View style={styles.packageLabel}>
                                        <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>{subscriptionData.package.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.packageEmpty}>
                                <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')} />
                                <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                                <TouchableOpacity style={styles.button} onPress={goToFarm}>
                                    <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek Boerderij</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </View>

            {/* Calendar Section */}
            <View>
                <Text style={{ ...globalStyles.headerTextSmall, marginBottom: 10 }}>Kalender</Text>
                <TouchableOpacity style={styles.calendar} onPress={goToCalendar}>
                    {week.map((day, index) => (
                        <View key={index} style={{ ...styles.calendarBlock, backgroundColor: day.getDate() === today.getDate() ? COLORS.orange : COLORS.lightOrange }}>
                            <Text style={[globalStyles.bodyTextSmallUppercased, { color: day.getDate() === today.getDate() ? COLORS.white : COLORS.offBlack }]}>
                                {day.toLocaleDateString('nl-NL', { weekday: 'short' })}</Text>
                            <Text style={[globalStyles.headerTextMedium, { color: day.getDate() === today.getDate() ? COLORS.white : COLORS.offBlack }]}>
                                {day.getDate()}</Text>
                            {renderDot(day)}
                        </View>
                    ))}
                </TouchableOpacity>
            </View>

            {/* Agenda Section */}
            {activitiesData && activitiesData.length > 0 ? (
                <View style={{ paddingBottom: 20 }}>
                    <FlatList
                        data={activitiesData}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <AgendaCard activity={item} showFarmDetails={true} onPress={() => handleAgendaCardPress(item._id, item.farm)} />}
                        scrollEnabled={false}
                    />
                </View>
            ) : (
                <View style={styles.calendarEmpty}>
                    <Image style={styles.iconImage} source={require('../../assets/icons/date-black.png')} />
                    <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je kalender is nog leeg want je hebt geen activiteiten.</Text>
                    <TouchableOpacity style={styles.button} onPress={goToExplore}>
                        <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek een activiteit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
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

    calendar: {
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.offBlack,
        position: 'absolute',
        bottom: -5,
        
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
    calendarBlock: {
        width: 44,
        height: 60,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightOrange,
        shadowColor: 'rgba(0,0,0, .1)',
        textTransform: 'uppercase',
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