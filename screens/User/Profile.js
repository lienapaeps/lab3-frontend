import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { uploadToCloudinary } from '../../utils/uploadHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import ProfileItem from '../../components/ProfileItem';

const Profile = ({ navigation, route }) => {
    const [userData, setUserData] = useState(route.params.userData);
    const [isLoading, setIsLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
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

    const handleEditProfilePicture = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] });
        if (!pickerResult.canceled) {
            setShowOverlay(true);
            const { uri } = pickerResult.assets[0];
            uploadProfilePicture(uri);
        }
    };

    const uploadProfilePicture = async (uri) => {
        try {
            setIsLoading(true);

            const profilePicture = await uploadToCloudinary(uri);

            setUserData((prevUserData) => ({
                ...prevUserData,
                profilePicture: profilePicture,
            }));

            // Update profile picture in database
            const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profilePicture }),
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                setUserData(updatedUserData.data.user);
                Alert.alert('Success', 'Profielfoto bijgewerkt!');
            } else {
                throw new Error('Error updating profile picture');
            }
        }
        catch (error) {
            console.error('Error uploading profile picture:', error);
            Alert.alert('Error', 'Er is iets misgegaan bij het uploaden van de profielfoto.');
        } finally {
            setIsLoading(false);
            setShowOverlay(false);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <View>
                    {/* edit profile picture */}
                    <TouchableOpacity onPress={handleEditProfilePicture}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.profileImage} source={{ uri: userData.profilePicture }} />
                            {showOverlay && <View style={styles.overlay} />}
                            {isLoading && (
                                <ActivityIndicator style={styles.activityIndicator} size="large" color={COLORS.primary} />
                            )}
                        </View>
                        <View style={styles.plusBtn}>
                            <Image style={styles.plusIcon} source={require('../../assets/icons/pencil.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{...globalStyles.headerTextSmall, ...globalStyles.capitalize}}>{userData.firstname} {userData.lastname}</Text>
            </View>
            <View style={styles.profileSection}>
                <ProfileItem title="Mijn account" onPress={handleGoToAccount} icon={require('../../assets/icons/user-green.png')} />
                <ProfileItem title="Instellingen" onPress={handleGoToSettings} icon={require('../../assets/icons/settings-green.png')} />
                <ProfileItem title="Mijn abonnement" onPress={handleGoToMySubscription} icon={require('../../assets/icons/farm-icon-active.png')} />
                <ProfileItem title="FAQ" onPress={handleGoToFaq} icon={require('../../assets/icons/faq-green.png')} />
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
    imageContainer: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 105,
        height: 105,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 100,
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    logout: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    plusBtn: {
        position: 'absolute',
        bottom: 15,
        right: -10,
        backgroundColor: COLORS.orange,
        borderRadius: 50,
        padding: 10,
    },
    plusIcon: {
        width: 22,
        height: 22,
    },
});

export default Profile;