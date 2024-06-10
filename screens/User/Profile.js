import React  from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import ProfileItem from '../../components/ProfileItem';

const Profile = ({ navigation, route }) => {
    const userData = route.params.userData;
    const subscriptionData = route.params.subscriptionData;

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Welcome');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const handleGoToAccount = async () => {
        navigation.navigate('AppStack', { screen: 'MyAccount', params: { userData: userData }});
    }

    const handleGoToSettings = async () => {
        navigation.navigate('AppStack', { screen: 'Settings', params: { userData: userData }});
    }

    const handleGoToMySubscription = async () => {
        navigation.navigate('AppStack', { screen: 'MySubscription', params: { userData: userData, subscriptionData }});
    }

    const handleGoToFaq = async () => {
        navigation.navigate('AppStack', { screen: 'FAQ', params: { userData: userData }});
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                <Text style={{...globalStyles.headerTextSmall, ...globalStyles.capitalize}}>{userData.firstname} {userData.lastname}</Text>
            </View>
            <View style={styles.profileSection}>
                <ProfileItem title="Mijn account" onPress={handleGoToAccount} icon={require('../../assets/icons/user-green.png')}/>
                <ProfileItem title="Instellingen" onPress={handleGoToSettings} icon={require('../../assets/icons/settings-green.png')}/>
                <ProfileItem title="Mijn abbonement" onPress={handleGoToMySubscription} icon={require('../../assets/icons/farm-icon-active.png')}/>
                <ProfileItem title="FAQ" onPress={handleGoToFaq} icon={require('../../assets/icons/faq-green.png')}/>
            </View>
            <View style={styles.logout}>
                <Button title="Uitloggen" onPress={handleLogout} color={COLORS.alert}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 1,
        borderRadius: 50,
        padding: 10,
        margin: 20,
    },
    backButton: {
        width: 30,
        height: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
    },
    profileImage: {
        width: 105,
        height: 105,
        borderRadius: 100,
        marginBottom: 15,
    },
    logout: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
     

    }
});

export default Profile;