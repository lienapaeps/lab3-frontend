import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput, FlatList } from 'react-native'
import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

import AgendaCard from '../../components/AgendaCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CalendarPage = ({ navigation, route }) => {

  //______________________________________Actviteiten_______________________________________
  const activitiesData = route.params.activitiesData
  //______________________________________Test dummy data_______________________________________
  /*
  const activitiesData = [
    {
      _id: '4',
      title: 'Activiteit 2',
      start: {
        date: '2024-06-20T10:00:00.000Z',
      },
      end: {
        date: '2024-06-20T10:00:00.000Z',
      },
      farm: '4',
      enrolledUsers: [],
    },
    {
      _id: '5',
      title: 'Activiteit 3',
      start: {
        date: '2024-06-22T14:00:00.000Z',
      },
      end: {
        date: '2024-06-22T16:00:00.000Z',
      },
      farm: '5',
      enrolledUsers: [],
    },
    {
      _id: '6',
      title: 'Activiteit 4',
      start: {
        date: '2024-06-25T09:00:00.000Z',
      },
      end: {
        date: '2024-06-25T12:00:00.000Z',
      },
      farm: '6',
      enrolledUsers: [],
    },
    {
      _id: '7',
      title: 'Activiteit 5',
      start: {
        date: '2024-06-28T16:00:00.000Z',
      },
      end: {
        date: '2024-06-28T18:00:00.000Z',
      },
      farm: '7',
      enrolledUsers: [],
    },
    {
      _id: '8',
      title: 'Activiteit 6',
      start: {
        date: '2024-06-30T11:00:00.000Z',
      },
      end: {
        date: '2024-06-30T13:00:00.000Z',
      },
      farm: '8',
      enrolledUsers: [],
    },
  ];
  */
  //______________________________________Test dummy data_______________________________________

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

  const renderDot = (day) => {
    const isActivityDay = activitiesData.some(activity => {
      const activityDate = new Date(activity.start.date);
      return activityDate.getDate() === day && activityDate.getMonth() + 1 === currentMonth && activityDate.getFullYear() === currentYear;
    });
    if (isActivityDay) {
      return <View style={styles.dot} />;
    } else {
      return null;
    }

  };

  //_______________________________________________________________________________________

  const handleDayPress = (day) => {
    if (day !== null) {
      setSelectedDay(day);
    }
  };

  const goToExplore = () => {
    navigation.navigate('App', { screen: 'Explore' });
  };


  const handleAgendaCardPress = (activityId, farmName) => {
    navigation.navigate('AppStack', { screen: 'ActivityDetail', params: { id: activityId, farmName } });
  };



  const filterdActivities = activitiesData.filter(activity => {
    const activityDate = new Date(activity.start.date);
    return activityDate.getDate() === selectedDay && activityDate.getMonth() + 1 === currentMonth && activityDate.getFullYear() === currentYear;
  });

  const remainingActivities = activitiesData.filter(activity => {
    const activityDate = new Date(activity.start.date);
    return activityDate.getDate() !== selectedDay || activityDate.getMonth() + 1 !== currentMonth || activityDate.getFullYear() !== currentYear;
  });

  //_______________________________________________________________________________________


  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.headerText}>Kalender</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.calendarDay}>

          <TouchableOpacity style={styles.button} onPress={handlePreviousMonth}>
            <Image style={styles.icon} source={require('../../assets/Back-arrow.png')} />
          </TouchableOpacity>
          <Text style={styles.calendarText}>{currentMonthName}</Text>
          <TouchableOpacity style={styles.button} onPress={handleNextMonth}>
            <Image style={styles.icon} source={require('../../assets/arrow-right.png')} />
          </TouchableOpacity>
          <Text style={styles.calendarYear}>{currentYearName}</Text>
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
                day === null && { backgroundColor: Colors.transparent }
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
        <Text style={globalStyles.headerTextSmallerRegular}>Activiteiten op deze dag</Text>

      </View>
      {/* Activiteiten weergave */}
      {activitiesData && activitiesData.length > 0 ? (
        // Show activities for selected day first
        <View>
          {filterdActivities.length > 0 ? (
            <View style={styles.selectedDay}>
              <FlatList
                style={styles.flow}
                showsVerticalScrollIndicator={false}
                data={filterdActivities}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <AgendaCard activity={item} showFarmDetails={true} onPress={handleAgendaCardPress} />}
              />
            </View>
          ) : (
            <View style={styles.selectedDay}>
              <Text style={globalStyles.bodyText}>Geen activiteiten op deze dag.</Text>
            </View>
          )}

          {/* Show remaining activities */}
          {remainingActivities.length > 0 && (
            <View>
              <Text style={globalStyles.headerTextSmallerRegular}>Aankomende Activiteiten</Text>
              <FlatList
                style={styles.flow}
                showsVerticalScrollIndicator={false}
                data={remainingActivities}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <AgendaCard activity={item} showFarmDetails={true} onPress={handleAgendaCardPress} />}
              />
            </View>
          )}
        </View>
      ) : (
        // Er zijn geen activiteiten in de kalender
        <View style={styles.calendarEmpty}>
          <Image style={styles.iconImage} source={require('../../assets/icons/date-black.png')} />
          <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je kalender is nog leeg want je hebt geen activiteiten.</Text>
          <TouchableOpacity style={styles.button} onPress={goToExplore}>
            <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.white }}>Zoek een activiteit</Text>
          </TouchableOpacity>
        </View>
      )
      }

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  calendarText: {

    fontWeight: 'medium',
    width: 100,
    textAlign: 'center',
    fontSize: 16,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.offBlack,
    position: 'absolute',
    bottom: -5,
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
  selectedDay: {

    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightOrange,
    marginBottom: 20,

  },

});

export default CalendarPage;