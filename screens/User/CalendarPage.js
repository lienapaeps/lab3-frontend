import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'
import { globalStyles } from '../../styles/global';

const CalendarPage = ({ navigation, route }) => {

  const daysinMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }
  
 
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
  },
  week: {
    flexDirection: 'row',
   
  },
  calendarBlock: {
    width: 20,
    height: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
  },
});

export default CalendarPage;