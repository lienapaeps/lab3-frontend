import React from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';



const HomeUser = ({ navigation }) => {
    const goToAccount = () => {
        //nagiate to calendar page
        navigation.navigate('Sub', { screen: 'Account' });
    };
    const goToSettings = () => {
        //nagiate to subscription page
        navigation.navigate('Sub', { screen: 'Settings' });
    };
    const goToSubscription = () => {
        //nagiate to profile page
         navigation.navigate('Sub', { screen: 'Subscription' });
     };
     const goToQuestions = () => {
        //nagiate to profile page
         navigation.navigate('Sub', { screen: 'Questions' });
     };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.Header}>
                <Image style={styles.iconImage}
                    source={require('../assets/icon.png')} />
                <Text style={globalStyles.headerText}>Naam</Text>
            </View>
            <View style={styles.list}>
                <Pressable style={styles.button} onPress={goToAccount}>
                    <Image style={styles.iconImage}
                        source={require('../assets/icon.png')} />
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
            <View style={styles.list}>
                <Pressable style={styles.button} onPress={goToSettings}>
                    <Image style={styles.iconImage}
                        source={require('../assets/icon.png')} />
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
            <View style={styles.list}>
                <Pressable style={styles.button} onPress={goToSubscription}>
                    <Image style={styles.iconImage}
                        source={require('../assets/icon.png')} />
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
            <View style={styles.list}>
                <Pressable style={styles.button} onPress={goToQuestions}>
                    <Image style={styles.iconImage}
                        source={require('../assets/icon.png')} />
                    <Text style={styles.text}>Kalender</Text>
                </Pressable>
            </View>
          
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        marginBottom: 60,
        marginTop: 60,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        marginBottom: 60,
        marginTop: 60,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'Quicksand_400Regular',
        letterSpacing: 0.25,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
    }
   
});

export default HomeUser;