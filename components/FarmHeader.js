import React from  'react';
import { View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';
import Button from '../components/Button';

export default function FarmHeader ({ navigation, route }) {

    // console.log(route.params.farmData)

    const farmData = route.params.farmData;

    return (
        <SafeAreaView>
          <View style={styles.bgImg}>
            <Image style={styles.cardImage} source={{ uri: farmData.image }} />
          </View>
          <View style={styles.container}>
            <Text style={globalStyles.headerText}>Boerderij details</Text>
            <Text style={globalStyles.bodyText}>{farmData.street}, {farmData.postalcode} {farmData.city}</Text>
            <Text style={[globalStyles.bodyText, styles.text]}>Een zelfoogstboerderij voor groenten en kleinfruit op een dikke anderhalve kilometer van Zemst dorp. </Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.div,styles.memberButton]}>
            <Button title="Wordt Lid" filled/>
            </View>
          </View>
        </SafeAreaView>
    );
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
        padding: 0,
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
    },
  
    followButton: {
        backgroundColor: COLORS.green,
        color: COLORS.offBlack,  
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        textAlign: 'center', 
        width: '100%',
    },
    memberButton: {
      paddingBottom: 20,
    }
  })