import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchUserData, getUserIdAndToken, fetchPackagesData, fetchFarmDataByOwnerWithoutToken, fetchReviewsData, fetchActivityDataFarm } from '../../utils/fetchHelpers';
import ActivityCard from '../../components/ActivityCard';
import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const HomeFarmer = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [farmData, setFarmData] = useState(null);
    const [reviewsData, setReviewsData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [packagesData, setPackagesData] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [loading, setLoading] = useState(true);

    const goToActivity = () => {
        if (farmData && farmData.data && farmData.data.farm && farmData.data.farm._id) {
            navigation.navigate('AppStackFarmer', {
                screen: 'AddActivity',
                params: { farmId: farmData.data.farm._id },
            });
        } else {
            console.error('Farm data is not available to navigate to AddActivity');
        }
    };

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData } });
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
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFarmData = async () => {
            if (userData && userData._id) {
                setLoading(true); // Set loading to true before fetching farm data
                try {
                    const farmResponse = await fetchFarmDataByOwnerWithoutToken(userData._id);
                    if (farmResponse && farmResponse.data && farmResponse.data.farm) {
                        setFarmData(farmResponse);
                        console.log('Farm Data:', farmResponse);
                    } else {
                        console.error('Invalid farm data response');
                    }
                } catch (error) {
                    console.error('Error fetching farm data:', error);
                } finally {
                    setLoading(false); // Ensure loading is set to false after fetching farm data
                }
            }
        };

        fetchFarmData();
    }, [userData]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (farmData && farmData.data && farmData.data.farm && farmData.data.farm._id) {
                setLoading(true);
                try {
                    const reviewsResponse = await fetchReviewsData(farmData.data.farm._id);
                    if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.reviews) {
                        setReviewsData(reviewsResponse);

                        // Calculate average rating
                        const reviews = reviewsResponse.data.reviews;
                        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
                        const avgRating = reviews.length ? (totalRatings / reviews.length).toFixed(1) : 0;
                        setAverageRating(avgRating);

                        console.log('Reviews Data:', reviewsResponse);
                    } else {
                        console.error('Invalid reviews data response');
                    }
                } catch (error) {
                    console.error('Error fetching reviews data:', error);
                } finally {
                    setLoading(false); // Ensure loading is set to false after fetching reviews
                }
            }
        };

        fetchReviews();
    }, [farmData]);

    useEffect(() => {
        const fetchActivityData = async () => {
            if (farmData && farmData.data && farmData.data.farm && farmData.data.farm._id) {
                setLoading(true);
                try {
                    const activityResponse = await fetchActivityDataFarm(farmData.data.farm._id);
                    if (activityResponse && activityResponse.data && activityResponse.data.activities) {
                        const filteredActivities = activityResponse.data.activities.filter(activity => activity.category === 'Workshop');
                        setActivityData({ data: { activities: filteredActivities } });
                        console.log('Activity Data:', activityResponse);
                    } else {
                        console.error('Invalid activity data response');
                    }
                } catch (error) {
                    console.error('Error fetching activity data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchActivityData();
    }, [farmData]);

    useEffect(() => {
        const fetchPackages = async () => {
            if (farmData && farmData.data && farmData.data.farm && farmData.data.farm._id) {
                setLoading(true);
                try {
                    const packageResponse = await fetchPackagesData(farmData.data.farm._id);
                    if (packageResponse && packageResponse.data && packageResponse.data.packages) {
                        const packages = packageResponse.data.packages;

                        const totalRevenue = packages.reduce((sum, pkg) => {
                            const packageRevenue = pkg.price * pkg.subscribedUsers.length;
                            return sum + packageRevenue;
                        }, 0).toFixed(2);
                        
                        setPackagesData(totalRevenue);
                        console.log('Total Revenue:', totalRevenue);
                    } else {
                        console.error('Invalid package data response');
                    }
                } catch (error) {
                    console.error('Error fetching package data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchPackages();
    }, [farmData]);

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </SafeAreaView>
        );
    }

    if (!userData || !farmData || !farmData.data || !farmData.data.farm || !reviewsData) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <Text style={globalStyles.bodyText}>Failed to load data. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={1}>
                    {/* header with profile pic and notification bell */}
                    {userData && (
                        <View style={styles.profile}>
                            <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                                <Image style={styles.profileImage} source={{ uri: userData.profilePicture }} />
                                <Text style={globalStyles.headerTextSmaller}>{userData.firstname} {userData.lastname}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.notification}>
                                <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                        <Text style={globalStyles.headerTextSmall}>Overzicht</Text>
                        <View style={styles.flexDirection}>
                            <View style={styles.card}>
                                <Image style={styles.icon} source={require('../../assets/icons/WinkelmandFarmer.png')} />
                                <Text style={globalStyles.bodyTextBold}>Pakketten</Text>
                                <View style={styles.alignCenter}>
                                    <Text style={globalStyles.headerTextSmall}>{farmData.data.farm.members?.length ?? 0}</Text>
                                </View>
                                <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                            </View>
                            <View style={styles.card}>
                                <Image style={styles.icon} source={require('../../assets/icons/DollarFarmer.png')} />
                                <Text style={globalStyles.bodyTextBold}>Omzet</Text>
                                <View style={styles.alignCenter}>
                                    <Text style={globalStyles.headerTextSmall}>{packagesData}</Text>
                                </View>
                                <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                            </View>
                        </View>

                        <View style={styles.flexDirection}>
                            <View style={styles.card}>
                                <Image style={styles.icon} source={require('../../assets/icons/FollowersFarmer.png')} />
                                <Text style={globalStyles.bodyTextBold}>Volgers</Text>
                                <View style={styles.alignCenter}>
                                    <Text style={globalStyles.headerTextSmall}>{activityData && activityData.data && activityData.data.activities && activityData.data.activities.length > 0
                                        ? activityData.data.activities[0].enrolledUsers.length : '0'}</Text>
                                </View>
                                <Text style={globalStyles.bodyText}>Voorbije maand</Text>
                            </View>
                            <View style={styles.card}>
                                <Image style={styles.icon} source={require('../../assets/icons/RatingFarmer.png')} />
                                <Text style={globalStyles.bodyTextBold}>Beoordeling</Text>
                                {activityData && activityData.data && activityData.data.activities && activityData.data.activities.length > 0 ? (
                                <View style={styles.alignCenter}>
                                    <Text style={globalStyles.headerTextSmall}>{averageRating || averageRating === '0' ? averageRating : '0'}/5</Text>
                                    <Text style={[globalStyles.bodyTextBold, styles.percent]}>{reviewsData.data.reviews?.length ?? 0} reviews</Text>
                                </View>
                                ) : (
                                    <View style={styles.alignCenter}>
                                        <Text style={[globalStyles.bodyTextBold, styles.percent]}>Geen reviews</Text>
                                    </View>
                                )}
                                <Text style={[globalStyles.bodyText, styles.marginAuto]}>Voorbije maand</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={[globalStyles.headerTextSmall, styles.activityTitle]}>Geplande evenementen</Text>
                            {activityData && activityData.data && activityData.data.activities && activityData.data.activities.length > 0 ? (
                                <FlatList 
                                    data={activityData.data.activities ?? []}
                                    style={styles.activities}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={true}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <ActivityCard activityData={item} farmData={farmData.data.farm} />
                                    )}
                                    contentContainerStyle={{ gap: 15 }}
                                />
                            ) : (
                                <View style={styles.packageEmpty}>
                                    <Image style={styles.iconImage} source={require('../../assets/icons/package-empty.png')} />
                                    <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je hebt nog geen evenementen aangemaakt, maak een evenement aan.</Text>
                                    <TouchableOpacity style={styles.button} onPress={goToActivity}>
                                        <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Maak evenement</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
    marginAuto: {
        marginTop: 'auto',
    },
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
    packageEmpty: {
        paddingVertical: 40,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    activities: {
        marginTop: 20,
        marginBottom: 20,
        gap: 15,
    },
    activityTitle: {
        marginTop: 20,
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
        marginTop: 10,
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
