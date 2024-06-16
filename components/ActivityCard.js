import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Platform, SafeAreaView } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const AcitvityCard = ({ activityData, onPress }) => {
    const [farmData, setFarmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const farmId = activityData.farm;

    const date = new Date(activityData.start.date);
    const options = { day: '2-digit', month: 'long'};
    const formattedDate = date.toLocaleDateString('nl-NL', options); // 06 juni
    const shortenedDate = formattedDate.replace(/(\d{2}) (\w{3})\w+/, '$1 $2'); // "06 jun"

    useEffect(() => {
        const fetchFarmDataById = async (id) => {
          try {
            const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}`, {
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

        const { id } = farmId
    
        fetchFarmDataById(id);
      }, []);
    
      if (loading) {
        return (
            <SafeAreaView style={styles.loading}>
                {Platform.OS === "web" ? (
                    <ActivityIndicator size="small" color={COLORS.offBlack} />
                ) : (
                    <ActivityIndicator size="medium" color={COLORS.offBlack} />
                )}
            </SafeAreaView>
        );
    }
    
      if (error) {
        return <Text>Error: {error.message}</Text>;
      }

      const handlePress = () => {
        onPress(activityData._id, farmData.name);
    }

      const category = activityData.category;
      const background = category === "Workshop" ? COLORS.orange : COLORS.green;

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1} style={styles.card}>
                <View style={styles.cardImage}>
                    <Image style={styles.image} source={{uri: activityData.image }} />
                </View>
                <View style={styles.cardTitle}>
                    <Text style={{...globalStyles.headerTextSmaller, fontSize: 18}}>{activityData.title}</Text>
                </View>
                <View style={styles.cardDate}>
                    <Text style={{...globalStyles.headerTextSmaller, color: COLORS.offBlack}}>{shortenedDate}</Text>
                </View>
                <View style={{...styles.cardType, backgroundColor: background}}>
                    <Text style={{...globalStyles.headerTextSmaller, color: COLORS.offWhite }}>{activityData.category}</Text>
                </View>
                {activityData.start.time && (
                    <View style={styles.cardTime}>
                        <Image style={styles.imgClock} source={require('../assets/icons/clock-black.png')} />
                        <Text style={{...globalStyles.bodyText, color: COLORS.offBlack}}>{activityData.start.time} - {activityData.end.time}</Text>
                    </View>
                )}
                <View style={styles.cardFarm}>
                    <Image style={styles.imgLocation} source={require('../assets/icons/locatie-black.png')} />
                    <Text style={{...globalStyles.bodyText, color: COLORS.offBlack}}>{farmData.name}</Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
        width: 210,
        paddingBottom: 20,
        position: 'relative',
    },
    cardTitle: {
        marginLeft: 15,
        paddingTop: 10,
    },
    cardDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 15,
        right: 15,
    },
    cardType: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        position: 'absolute',
        top: 15,
        left: 15,
    },
    cardTime: {
        marginLeft: 15,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardFarm: {
        marginLeft: 15,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: 210,
        height: 150,
    },
    imgClock: {
      width: 16,
      height: 16,
    },
    imgLocation: {
        width: 13,
        height: 16,
    },
    loading: {
        width: 210,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AcitvityCard;