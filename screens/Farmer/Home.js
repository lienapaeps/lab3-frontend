import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';

const HomeFarmer = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const goToProfile = () => {
        navigation.navigate('AppStack', { screen: 'Profile', params: { userData }});
    }; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                let userId = await AsyncStorage.getItem('uid');

                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                if (userId && userId.startsWith('"') && userId.endsWith('"')) {
                    userId = userId.substring(1, userId.length - 1);
                }

                const userDataResponse = await fetchUserData(token, userId);
                if (userDataResponse && userDataResponse.data && userDataResponse.data.user) {
                    setUserData(userDataResponse.data.user);
                    console.log("user data: " + userDataResponse.data.user)
                } else {
                    console.error('Invalid user data response');
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const fetchUserData = async (token, userId) => {
        const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };
    
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header with profile pic and notification bell */}
            {userData && (
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn} onPress={goToProfile}>
                        <Image style={styles.profileImage} source={{ uri: userData.profilePicture }}/>
                        <Text style={globalStyles.headerTextSmaller}>{userData.firstname} {userData.lastname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notification}>
                        <Image style={styles.notificationImage} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
            )}
            <View>
                <Text style={globalStyles.headerText}>Home pagina Landbouwer</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    profileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
    notification: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 100, 
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,  
    },
    notificationImage: {
        width: 22,
        height: 24,
    },
});

export default HomeFarmer;