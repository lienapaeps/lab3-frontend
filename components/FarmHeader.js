import React, { useState, useEffect } from  'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';
import Button from '../components/Button';

export default function FarmHeader ({ navigation, route }) {
  const [farmData, setFarmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const id = route.params;
    console.log(id);

    useEffect(() => {
      const fetchFarmDataById = async (id) => {
        try {
          const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          });
          const data = await response.json();
          setFarmData(data.data.farm);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      const { id } = route.params;
      fetchFarmDataById(id);
    }, []);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    return (
        <SafeAreaView>
          <View style={styles.bgImg}>
            <Image style={styles.cardImage} source={{ uri: farmData.farmImage }} />
          </View>
          <View style={styles.container}>
            <Text style={globalStyles.headerText}>{farmData.name}</Text>
            <Text style={globalStyles.bodyText}>{farmData.adress.street} {farmData.adress.number}, {farmData.adress.zipcode} {farmData.adress.city}</Text>
            <Text style={[globalStyles.bodyText, styles.text]}>{farmData.description}</Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.div,styles.memberButton]}>
            <Button title="Word Lid" filled/>
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