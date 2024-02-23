import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import React from 'react'

export default function FarmUserDetails() {
  return (
    <SafeAreaView>
      <View>
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