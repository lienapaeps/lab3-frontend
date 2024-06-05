import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { fetchActivityData } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import Search from '../../components/Search';
import AcitvityCard from '../../components/ActivityCard';
import COLORS from '../../constants/color';

const Explore = ({ navigation }) => {
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchActivityData();
                const sortedActivities = data.data.activities.sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
                setActivityData(sortedActivities);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchTermChange = (text) => setSearchTerm(text);

    const filteredActivities = activityData.filter((activity) => {
        return (
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || activity.category === selectedCategory)
        )
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
                {Platform.OS === "web" ? (
                    <ActivityIndicator size="small" color={COLORS.offBlack} />
                ) : (
                    <ActivityIndicator size="medium" color={COLORS.offBlack} />
                )}
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
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'All' && styles.selectedCategoryButtonText]}>Alles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Workshop' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Workshop')}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Workshop' && styles.selectedCategoryButtonText]}>Workshop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Artikel' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Artikel')}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Artikel' && styles.selectedCategoryButtonText]}>Artikel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Recept' && styles.selectedCategoryButton]}
                        onPress={() => handleCategoryChange('Recept')}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === 'Recept' && styles.selectedCategoryButtonText]}>Recept</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
            <View style={styles.section}>
                <Text style={globalStyles.headerTextSmall}>{searchTerm ? "Zoekresultaten" : "Nieuwste"}</Text>
                <View style={styles.cards}>
                    <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 15}}
                    >
                        {filteredActivities.map((activity) => {
                            return <AcitvityCard key={activity._id} activityData={activity} onPress={handleActivityCardPress}/>
                        })}
                    </ScrollView>
                </View>
            </View>
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
})

export default Explore;