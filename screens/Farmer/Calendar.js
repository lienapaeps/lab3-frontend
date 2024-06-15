import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserIdAndToken, fetchFarmDataByOwner, fetchActivityDataFarm } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import AgendaCard from '../../components/AgendaCard';
import COLORS from '../../constants/color';

const CalendarFarmer = ({ navigation }) => {
    // const [user, setUser] = useState(null);
    const [farmData, setFarmData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { token, userId } = await getUserIdAndToken();

                console.log("User ID: ", userId)
                
                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                const farmDataResponse = await fetchFarmDataByOwner(token, userId);
                if (farmDataResponse && farmDataResponse.data && farmDataResponse.data.farm) {
                    setFarmData(farmDataResponse.data.farm);
                    console.log("Farm data: ", farmDataResponse.data.farm)
                } else {
                    console.error('Invalid farm data response');
                    return;
                }

                const farmId = farmData._id;
                console.log("Farm ID: ", farmId)

                const activityDataResponse = await fetchActivityDataFarm(farmId);
                // const filteredActivities = data.data.activities.filter(activity => activity.category === 'Workshop');
                setActivityData(activityDataResponse.data.activities);
                console.log("Activity data: ", activityDataResponse.data.activities)

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddActivity = () => {
        const farmId = farmData._id;
        console.log("add activity", farmId)
        navigation.navigate('AppStackFarmer', { screen: 'AddActivity', params: { farmId } });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const dayOfWeekNames = [
            "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"
        ];
        const dayOfWeek = dayOfWeekNames[date.getDay()];

        const day = date.getDate();
        const monthNames = [
            "januari", "februari", "maart", "april", "mei", "juni",
            "juli", "augustus", "september", "oktober", "november", "december"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
    
        return `${dayOfWeek} ${day} ${month} ${year}`;
    };

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.bodyText}>Laden...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={{...globalStyles.headerText, textAlign: 'center'}}>Agenda</Text>
            </View>
            <View style={styles.calendarContainer}>
            </View>
            <View>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}></View>
                    <Text style={globalStyles.bodyText}>Aankomende activiteiten</Text>
                    <View style={styles.divider}></View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activityData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{...globalStyles.bodyTextSemiBold, marginBottom: 10}}>{formatDate(item.start.date)}</Text>
                            <AgendaCard activity={item} />
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Image style={styles.iconImage} source={require('../../assets/icons/calendar-create.png')} />
                            <Text style={{...globalStyles.bodyText, ...styles.emptyText}}>Je hebt nog geen activiteiten toegevoegd.</Text>
                            <TouchableOpacity style={styles.button} onPress={handleAddActivity}>
                                <Text style={{...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Activiteit toevoegen</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    emptyState: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60
    },
    iconImage: {
        marginBottom: 15,
        width: 22,
        height: 24,
    },
    emptyText: {
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
    },
    calendarContainer: {
        backgroundColor: COLORS.veryLightOffBlack,
        paddingVertical: 50,
        marginBottom: 20,
        marginTop: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    divider: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.veryLightOffBlack,
        width: '25%',
        marginHorizontal: 10,
    },
});

export default CalendarFarmer;