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

//kalender blokje

  //get current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  //slected day is set to current day
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());


  const today = new Date();

  //function to get days in specific month
  const daysinMonth = (month, year) => new Date(year, month, 0).getDate();
  console.log(currentMonth, currentYear);
  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(prevYear => prevYear - 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(prevYear => prevYear + 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }
  };

  const totalDays = daysinMonth(currentMonth, currentYear);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const firstDay = new Date(currentYear, currentMonth - 1, 0).getDay();
  const emptyBlocks = Array(firstDay).fill(null);

  const lastDay = new Date(currentYear, currentMonth, 0).getDate();
  const lastDayIndex = new Date(currentYear, currentMonth - 1, lastDay - 1).getDay();
  const remainingDays = 6 - lastDayIndex;
  const emptyBlocksEnd = Array(remainingDays).fill(null);

  const combinedArray = [...emptyBlocks, ...daysArray, ...emptyBlocksEnd];

  const weekdays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

  const currentMonthName = new Intl.DateTimeFormat('nl-NL', { month: 'long' }).format(new Date(currentYear, currentMonth - 1));
  const currentYearName = new Intl.DateTimeFormat('nl-NL', { year: 'numeric' }).format(new Date(currentYear, currentMonth - 1));

  const handleDayPress = (day) => {
    if (day !== null) {
      setSelectedDay(day);
    }
  };

    const handleAgendaCardPress = (activityId, farmId) => {
        navigation.navigate('AppStackFarmer', { screen: 'ActivityDetail', params: { id: activityId, farmId } });
    };

  console.log(activityData);

  //check if there are activities and render dot if there is an activity on that day in that month
    const renderDot = (day) => {
        if (activityData) {
            const activities = activityData.filter(activity => {
                const activityDate = new Date(activity.start.date);
                return activityDate.getDate() === day && activityDate.getMonth() + 1 === currentMonth && activityDate.getFullYear() === currentYear;
            });

            if (activities.length > 0) {
                return (
                    <View style={{ position: 'absolute', bottom: -5, right: 0, left: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 10, height: 10, backgroundColor: COLORS.offBlack, borderRadius: 50 }}></View>
                    </View>
                );
            }
        }
    };

      //fetch farm data and activity data
      useEffect(() => {
        const fetchData = async () => {
            try {
                const { userId, token } = await getUserIdAndToken();
                const farmDataResponse = await fetchFarmDataByOwner(token, userId);
                if (farmDataResponse && farmDataResponse.data && farmDataResponse.data.farm) {
                    setFarmData(farmDataResponse.data.farm);

                    if (farmDataResponse.data.farm._id) {
                        const activityDataResponse = await fetchActivityDataFarm(farmDataResponse.data.farm._id);
                        setActivityData(activityDataResponse.data.activities);
                    }
                } else {
                    setFarmData(null);
                }

                setLoading(false);
            } catch (error) {

                console.error('Error:', error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    console.log("Activity data: ", activityData);
    

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
            <View style={styles.header}>
                <Text style={{ ...globalStyles.headerText, textAlign: 'center' }}>Agenda</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.calendarDay}>

                    <TouchableOpacity style={styles.monthButton} onPress={handlePreviousMonth}>
                        <Image style={styles.icon} source={require('../../assets/Back-arrow.png')} />
                    </TouchableOpacity>
                    <Text style={[styles.calendarText, globalStyles.bodyTextBold, globalStyles.capitalize]}>{currentMonthName}</Text>
                    <TouchableOpacity style={styles.monthButton} onPress={handleNextMonth}>
                        <Image style={styles.icon} source={require('../../assets/arrow-right.png')} />
                    </TouchableOpacity>
                    <Text style={[styles.calendarYear, globalStyles.bodyTextBold]}>{currentYearName}</Text>
                </View>
                <View style={styles.calendar}>
                    {/* Render weekdays */}
                    <View style={styles.week}>
                        {weekdays.map((weekday, index) => (
                            <View key={index} style={styles.weekBlock}>
                                <Text style={globalStyles.headerTextMedium} >{weekday}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Render days */}
                    <View style={styles.week}>
                        {combinedArray.map((day, index) => (

                            <TouchableOpacity key={index} style={[
                                styles.calendarBlock,
                                day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear() && { backgroundColor: COLORS.green },
                                day === selectedDay && { backgroundColor: COLORS.orange },
                                day === null && { backgroundColor: COLORS.offWhite }
                            ]} onPress={() => handleDayPress(day)}>
                                <Text style={[
                                    globalStyles.headerTextMedium,
                                    day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear() && { color: COLORS.white },
                                    day === selectedDay && { color: COLORS.white },
                                ]}>
                                    {day}</Text>
                                {renderDot(day)}
                              
                               

                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
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
                            <Text style={{ ...globalStyles.bodyTextSemiBold, marginBottom: 10 }}>{formatDate(item.start.date)}</Text>
                            <AgendaCard activity={item} onPress={() => handleAgendaCardPress(item._id, item.farm)}/>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Image style={styles.iconImage} source={require('../../assets/icons/calendar-create.png')} />
                            <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je hebt nog geen activiteiten toegevoegd.</Text>
                            <TouchableOpacity style={styles.button} onPress={handleAddActivity}>
                                <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Activiteit toevoegen</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
      },
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
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
      },
      lineDirection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      line: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightOffBlack,
        width: 60,
        marginHorizontal: 30,
      },
      week: {
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    
      },
      calendarYear: {
        fontWeight: 'medium',
        width: 100,
        textAlign: 'center',
        fontSize: 16,
    
      },
      calendar: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: 20,
    
      },
      calendarBlock: {
        width: 40,
        height: 40,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: COLORS.lightOrange,
        borderRadius: 5,
      },
      weekBlock: {
        width: 40,
        height: 40,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
      },
      calendarDay: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignSelf: 'left',
      },
    emptyText: {
        marginBottom: 30,
        textAlign: 'center',
    },
    icon: {
        width: 20,
        height: 20,
      },
      monthButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
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
    calendarText: {
        fontWeight: 'medium',
        width: 100,
        textAlign: 'center',
        fontSize: 16,
      },
});

export default CalendarFarmer;