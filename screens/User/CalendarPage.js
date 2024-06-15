import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'
import { globalStyles } from '../../styles/global';

const CalendarPage = ({ navigation, route }) => {
  //get current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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


  const test = new Date(2024, 6, 0).getDay();
  console.log(test);



  const emptyBlocks = Array(firstDay).fill(null);

  const lastDay = new Date(currentYear, currentMonth, 0).getDate();
  console.log(lastDay);
  const lastDayIndex = new Date(currentYear, currentMonth - 1, lastDay - 1).getDay();
  console.log(lastDayIndex);


  const remainingDays = 6 - lastDayIndex;
  const emptyBlocksEnd = Array(remainingDays).fill(null);


  const combinedArray = [...emptyBlocks, ...daysArray, ...emptyBlocksEnd];

  const weekdays = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

  console.log(combinedArray);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.headerText}>Kalender</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Button title="Vorige maand" onPress={handlePreviousMonth} />
          <Text>{currentMonth}</Text>
          <Button title="Volgende maand" onPress={handleNextMonth} />
        </View>
        <View style={styles.calendar}>
          {/* Render weekdays */}
          <View style={styles.week}>
            {weekdays.map((weekday, index) => (
              <View key={index} style={styles.calendarBlock}>
                <Text>{weekday}</Text>
              </View>
            ))}
          </View>
          {/* Render days */}
          <View style={styles.week}>
            {combinedArray.map((day, index) => (
              <View key={index} style={styles.calendarBlock}>
                <Text>{day}</Text>

              </View>
            ))}
          </View>
        </View>

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
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '200px',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 210,
    flexWrap: 'wrap',

  },
  calendar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: 210,
    flexWrap: 'wrap',



  },
  calendarBlock: {
    width: 30,
    height: 30,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1,



  },
});

export default CalendarPage;