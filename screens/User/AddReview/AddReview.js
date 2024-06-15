import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';

import { getUserIdAndToken, fetchUserDataById } from '../../../utils/fetchHelpers';

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

const AddReview = ({ navigation, route }) => {
    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const farmId = route.params.data;

    const fetchUserData = async () => {
        try {
            const { token, userId } = await getUserIdAndToken();
            const data = await fetchUserDataById(userId);
            setUserData(data.data.user);
        } catch (error) {
            console.error('Fout bij het ophalen van gebruikersgegevens:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const submitReview = async () => {
        const userId = userData._id;

        if (!reviewText || !starRating || !userId || !farmId) {
            setErrorMessage('Vul alle velden in om een review te plaatsen.');
            return;
        }

        try {
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: reviewText,
                    user: userId,
                    farm: farmId,
                    date: new Date().toISOString(),
                    rating: starRating,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Review toegevoegd:', data);
            Alert.alert('Review toegevoegd', 'Bedankt voor je review!');
            navigation.goBack();

        } catch (error) {
            setErrorMessage('Er is iets fout gegaan bij het toevoegen van de review. Probeer het later opnieuw.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View>
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../../../assets/icons/cross-black.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {/* foutmelding */}
                {errorMessage !== '' && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={globalStyles.errorText}>{errorMessage}</Text>
                    </View>
                )}

                {/* Profielfoto en naam van de gebruiker */}
                <View style={styles.userContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: userData.profilePicture }}
                    />
                    <Text style={globalStyles.headerTextSmall}>{userData.firstname} {userData.lastname}</Text> 
                </View>

                {/* Aantal sterren */}
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setStarRating(star)}
                        >
                            <Text style={[styles.star, star <= starRating ? styles.filledStar : null]}>★</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tekst van de review */}
                <InputField
                    placeholder="Schrijf hier je review"
                    value={reviewText}
                    onChangeText={(text) => setReviewText(text)}
                    multiline
                    numberOfLines={4}
                />

                {/* Knop om de review te verzenden */}
                <Button
                    title="Review posten"
                    onPress={submitReview}
                    filled
                    style={{marginTop: 25}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 80,
    },
    btn: {
        marginHorizontal: 20,
        marginTop: 60,
        marginBottom: 60,
    },
    backButton: {
        width: 22,
        height: 22,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: -10,
    },
    star: {
        fontSize: 38,
        color: COLORS.veryLightOffBlack,
    },
    filledStar: {
        color: 'gold',
    },
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginTop: -15,
        marginBottom: 30
    },
});

export default AddReview;
