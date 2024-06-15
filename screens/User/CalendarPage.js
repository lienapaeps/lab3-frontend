import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'
import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

const CalendarPage = ({ navigation, route }) => {
  //get current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const weekdays = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

  const currentMonthName = new Intl.DateTimeFormat('nl-NL', { month: 'long' }).format(new Date(currentYear, currentMonth - 1));


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
              <View key={index} style={[
                styles.calendarBlock,
                day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear() && { backgroundColor: COLORS.orange }
              ]}>
                <Text style={[
                globalStyles.headerTextMedium,
                day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear() && { color: COLORS.white }
              ]}>
                  {day}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={globalStyles.headerTextSmallerRegular}>aankomende activiteiten</Text>

      </View>

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
  calendar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.veryLightOffBlack,
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
    margin: 10,
    fontWeight: 'medium',
    width: 100,
    textAlign: 'center',
    fontSize: 16,
  }

});

export default CalendarPage;