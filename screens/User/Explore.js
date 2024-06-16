import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchActivityData, fetchUserData, fetchSubscriptionDataWithoutToken, getUserIdAndToken, fetchActivityDataFarm } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import Search from '../../components/Search';
import ActivityCard from '../../components/ActivityCard';
import COLORS from '../../constants/color';

const Explore = ({ navigation }) => {
    const [activityData, setActivityData] = useState([]);
    const [farmData, setFarmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [farmId, setFarmId] = useState(null); // State to store farmId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchActivityData();
                const sortedActivities = data.data.activities.sort((a, b) => new Date(b.start.date) - new Date(a.start.date));
                setActivityData(sortedActivities);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserAndSubscriptionData = async () => {
            try {
                const { userId, token } = await getUserIdAndToken();
                const userDataResponse = await fetchUserData(token, userId);
                const userData = userDataResponse.data.user._id;
                const subscriptionDataResponse = await fetchSubscriptionDataWithoutToken(userData);
                const subscriptionData = subscriptionDataResponse.data;

                // Check if subscriptionData exists and has a package
                if (subscriptionData && subscriptionData.package) {
                    const farmId = subscriptionData.package.farm._id;
                    setFarmId(farmId); // Set farmId state
                } else {
                    setFarmId(null); // Set farmId state to null or handle accordingly
                }
            } catch (error) {
                console.error('Error fetching user and subscription data:', error);
                setError(error); // Set error state
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndSubscriptionData();
    }, []);

    const handleSearchTermChange = (text) => setSearchTerm(text);

    const allActivities = activityData.filter((activity) => {
        return (
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || activity.category === selectedCategory)
        );
    });

    const subscribedFarmActivities = activityData.filter((activity) => {
        return (
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || activity.category === selectedCategory) &&
            (farmId && activity.farm === farmId)
        );
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleActivityCardPress = (activityId, farmName) => {
        navigation.navigate('AppStack', { screen: 'ActivityDetail', params: { id: activityId, farmName: farmName}});
    }

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Error: {error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={1}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Explore</Text>
            </View>
            <View style={styles.options}>
                <Search width={'100%'} placeholder={"Zoek"} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
                {!searchTerm && (
                <View style={styles.filters}>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('All')}
                        activeOpacity={1}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'All' && styles.selectedCategoryButtonText]}>Alles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Workshop' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Workshop')}
                        activeOpacity={1}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Workshop' && styles.selectedCategoryButtonText]}>Workshop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Artikel' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Artikel')}
                        activeOpacity={1}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Artikel' && styles.selectedCategoryButtonText]}>Artikel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Recept' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Recept')}
                        activeOpacity={1}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Recept' && styles.selectedCategoryButtonText]}>Recept</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
            <View style={styles.section}>
                <Text style={globalStyles.headerTextSmall}>{searchTerm ? "Relevante zoekresultaten" : "Relevant voor jou"}</Text>
                {subscribedFarmActivities.length === 0 ? (
                    <Text style={globalStyles.bodyText}>Er zijn geen items beschikbaar.</Text>
                ) : (
                    <View style={styles.cards}>
                        <FlatList 
                            data={subscribedFarmActivities}
                            style={styles.activities}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <ActivityCard activityData={item} onPress={() => handleActivityCardPress(item._id, item.farmName)} />
                            )}
                            contentContainerStyle={{ gap: 15 }}
                        />
                    </View>
                )}
            </View>
            <View style={styles.section}>
                <Text style={globalStyles.headerTextSmall}>{searchTerm ? "Zoekresultaten" : "Nieuwste"}</Text>
                {allActivities.length === 0 ? (
                    <Text style={globalStyles.bodyText}>Er zijn geen items beschikbaar.</Text>
                ) : (
                    <View style={styles.cards}>
                        <FlatList 
                            data={allActivities}
                            style={styles.activities}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <ActivityCard key={item._id} activityData={item} onPress={() => handleActivityCardPress(item._id, item.farmName)}/>
                            )}
                            contentContainerStyle={{ gap: 15 }}
                        />
                    </View>
                )}
            </View>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cards: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    section: {
        marginBottom: 20,
    },
    filters:{
        marginTop: 20,
        flexDirection: "row",
        gap: 15
    },
    categoryButton: {
        backgroundColor: COLORS.veryLightOffBlack,
        padding: 12,
        borderRadius: 10,
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.offBlack,
    },
    categoryButtonText: {
        fontFamily: 'Quicksand_500Medium',
        fontSize: 16,
        color: COLORS.offBlack,
    },
    selectedCategoryButtonText: {
        color: COLORS.white,
        fontFamily: 'Quicksand_600SemiBold',
    },
});

export default Explore;