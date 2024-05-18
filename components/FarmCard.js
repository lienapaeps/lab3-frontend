import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const FarmCard = ({ farmData, onPress }) => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // update elke minuut
        return () => clearInterval(interval);
    }, []);

    const handlePress = () => {
        onPress(farmData._id);
        // console.log(farmData._id);
    }

    const checkLocation = (location) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            const farmLocation = {
                latitude: farmData.coordinates.latitude,
                longitude: farmData.coordinates.longitude,
            };
            const distance = getDistance(userLocation, farmLocation);
            console.log(distance);
        });
    }

    const checkStatus = (openingHours) => {
        const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        const currentDayIndex = currentTime.getDay(); // Hier de verklaring van currentDayIndex
        const currentDay = dayNames[currentDayIndex];
        // console.log(currentDay);

        const todayOpeningHours = openingHours.find((hours) => hours.day === currentDay);

        if (!todayOpeningHours || !todayOpeningHours.openinghour || !todayOpeningHours.closinghour) {
            return "Gesloten";
        }

        const [openingHour, openingMinute] = todayOpeningHours.openinghour.split(':').map(Number);
        const [closingHour, closingMinute] = todayOpeningHours.closinghour.split(':').map(Number);

        if (isNaN(openingHour) || isNaN(openingMinute) || isNaN(closingHour) || isNaN(closingMinute)) {
            return "Gesloten";
        }

        const openingTime = new Date(currentTime);
        openingTime.setHours(openingHour, openingMinute, 0, 0);

        const closingTime = new Date(currentTime);
        closingTime.setHours(closingHour, closingMinute, 0, 0);

        console.log(openingTime.toISOString(), closingTime.toISOString(), currentTime.toISOString());

        if (currentTime >= openingTime && currentTime <= closingTime) {
            return "Open";
        } else {
            return "Gesloten";
        }
    };

    const status = checkStatus(farmData.openinghours);
    const textColor = status === "Open" ? COLORS.green : COLORS.alert;
    const imageSource = status === "Open" ? require('../assets/icons/clock.png') : require('../assets/icons/clock-inactive.png');

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={handlePress} style={styles.card}>
                <View>
                    <Image style={styles.cardImage} source={{uri: farmData.farmImage }} />
                </View>
                <View>
                    <View style={styles.header}>
                        <Text style={globalStyles.headerTextSmaller}>{farmData.name}</Text>
                        <View style={styles.adress}>
                            <Text style={globalStyles.bodyText}>{farmData.adress.street}</Text>
                            <Text style={globalStyles.bodyText}>{farmData.adress.number}</Text>
                        </View>
                        <View style={styles.adress}>
                            <Text style={globalStyles.bodyText}>{farmData.adress.city}</Text>
                            <Text style={globalStyles.bodyText}>{farmData.adress.zipcode}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        {/* <View style={styles.infoItem}>
                            <Image source={require('../assets/icons/star.png')} />
                            <Text style={{...globalStyles.bodyText, ...styles.label}}>{props.farmData.rating}</Text>
                        </View> */}
                        {/* <View style={styles.infoItem}>
                            <Image source={require('../assets/icons/locatie.png')} />
                            <Text style={{...globalStyles.bodyText, ...styles.label, ... {color:COLORS.orange}}}>{props.farmData.kilometer}</Text>
                        </View> */}
                        <View style={styles.infoItem}>
                            <Image source={imageSource} />
                            <Text style={{...globalStyles.bodyText, ...styles.label, ... {color: textColor}}}>{status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImage: {
        borderRadius: 8,
        width: 100,
        height: 100,
    },
    header: {
        gap: 2
    },
    label: {
        fontSize: 16,
        fontFamily: 'Quicksand_500Medium',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    adress: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    }
})

export default FarmCard;