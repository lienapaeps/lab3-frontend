import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import ProfileItem from '../../components/ProfileItem';

const Profile = ({ navigation, route }) => {

    const userData = route.params.userData;

    console.log(userData);

    const handleLogout = async () => {
        // Clear AsyncStorage
        try {
            await AsyncStorage.clear();
            navigation.navigate('Welcome');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                <Text style={{...globalStyles.headerTextSmall, ...styles.profileName}}>{userData.firstname} {userData.lastname}</Text>
            </View>
            <View style={styles.profileSection}>
                <ProfileItem title="Mijn account" icon={require('../../assets/icons/user-green.png')}/>
                <ProfileItem title="Instellingen" icon={require('../../assets/icons/settings-green.png')}/>
                <ProfileItem title="FAQ" icon={require('../../assets/icons/faq-green.png')}/>
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
    profileName: {
        textTransform: 'capitalize',
    },
    logout: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        alignItems: 'center',
    }
});

export default Profile;