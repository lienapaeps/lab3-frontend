import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import React from 'react'
import COLORS from '../constants/color';

export default function FarmUserDetails( { navigation } ) {
  return (
    <SafeAreaView>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require('../assets/Back-arrow.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.bgImg}>
        <Image style={styles.cardImage} source={require('../assets/vlinderveld-cover.png')} />
      </View>
      <View style={styles.container}>
        <Text style={globalStyles.headerText}>Boerderij details</Text>
        <Text style={globalStyles.bodyText}>Grote Molenweg, 1980 Zemst</Text>
        <Text style={[globalStyles.headerTextSmaller, styles.text]}>Een zelfoogstboerderij voor groenten en kleinfruit op een dikke anderhalve kilometer van Zemst dorp. </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btn: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      backgroundColor: COLORS.white,
      borderRadius: 50,
      padding: 10,
      margin: 20,
  },
  backButton: {
      width: 30,
      height: 30,
  },
  cardImage: {
      width: '100%',
      height: 240,
  },
  container:{
      padding: 30,
      paddingBottom: -30,
      backgroundColor: '#F5F5F5',
  },
  text:{
      marginTop: 20,
  }
})