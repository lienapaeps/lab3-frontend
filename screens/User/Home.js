import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';


const HomeUser = ({ navigation }) => {
    const goToCalendar = () => {
        navigation.navigate('AppStack', { screen: 'Calendar' });
    };
    const goToFarm = () => {
       //nagiate to subscription page
        navigation.navigate('Sub', { screen: 'Subscription' });
    };


    console.log(AsyncStorage.getItem('token')); //_j

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    // Als er geen token is, stuur de gebruiker naar het inlogscherm
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Fout bij het ophalen van de token:', error);
                // Toon een foutmelding als er een fout optreedt bij het ophalen van de token
            }
        };

        checkAuthentication();
    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Home pagina Gebruiker</Text>
            </View>
            <View>
                <Text style={globalStyles.headerTextSmaller}>Huidig Pakket</Text>
            </View>
            <View style={globalStyles.Header}>
                <Image style={styles.iconImage}
                    source={require('../../assets/icon.png')} />
                <Text style={styles.subText}>Je hebt nog geen paketten.</Text>
                <Pressable style={styles.button} onPress={goToFarm}>
                    <Text style={styles.text}>Zoek Boerderij</Text>
                </Pressable>
            </View>
            <View>
                <Text style={globalStyles.headerTextSmaller}>Kalender</Text>
            </View>
            <View style={globalStyles.Header}>
                <Pressable style={styles.button} onPress={goToCalendar}>
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
            <View>
                <Text style={globalStyles.headerTextSmaller}>Activiteiten</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: COLORS.orange,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'Quicksand_400Regular',
        letterSpacing: 0.25,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
    },
    subText: {
        padding: 10,
        marginBottom: 10,
        fontFamily: 'Quicksand_400Regular',
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.offBlack,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
});

export default HomeUser;