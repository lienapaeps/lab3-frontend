import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import Search from '../components/Search';
import Filter from '../components/Filter';
import AcitvityCard from '../components/ActivityCard';
import { ScrollView } from 'react-native-gesture-handler';

const Explore = ({ navigation }) => {

    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/activities', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                // console.log(data.data.farms);
                const sortedActivities = data.data.activities.sort((a, b) => new Date(a.start.date) - new Date(b.start.date));

                setActivityData(sortedActivities);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivityData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Loading...</Text>
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

    const handleActivityCardPress = (activityId, farmName) => {
        // console.log('Activity ID:', activityId);
        // console.log('Farm Name:', farmName);
        navigation.navigate('AppStack', { screen: 'ActivityDetail', params: { id: activityId, farmName: farmName}});
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Explore</Text>
            </View>
            <View style={styles.options}>
                <Search placeholder={"Zoek een activiteit"} />
                <Filter />
            </View>
            <View>
                <Text style={globalStyles.headerTextSmall}>Nieuwste</Text>
                <View style={styles.cards}>
                    <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 15}}
                    >
                        {activityData.map((activity) => {
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    cards: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
})

export default Explore;