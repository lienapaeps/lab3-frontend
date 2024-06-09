import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'

import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';
import { updateUserEmail } from '../../../../utils/fetchHelpers';

const Email = ({ navigation, route }) => {
    const userData = route.params.userData;
    const [email, setEmail] = useState(userData.email);
    const [showSuccess, setShowSuccess] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailError('');
    }

    const clearEmail = () => {
        setEmail('');
        setEmailError('');
    }

    const updateEmail = () => {
        // Call the changeEmail function from fetchHelpers to update the email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        updateUserEmail(userData._id, email)
            .then(() => {
                setShowSuccess(true);
                // Handle success
                console.log('Email updated successfully');
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating email:', error);
            });
    }
    // Function to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Succes message disappears after 3 seconds
    useEffect(() => {
        if (showSuccess) {
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [showSuccess]);

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Email</Text>
            </View>
            <View style={styles.content}>
                {showSuccess && (
                    <Text style={styles.successMessage}>Email changed successfully</Text>
                )}
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Enter new email"
                    />
                    <TouchableOpacity style={styles.buttonSmall} onPress={clearEmail}>
                        <Image style={styles.notificationImage} source={require('../../../../assets/icons/cross-black.png')} />
                    </TouchableOpacity>
                </View>

                {emailError !== '' && (
                    <Text style={globalStyles.errorText}>{emailError}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={updateEmail}>
                    <Text style={styles.buttonText}>Update Email</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderRadius: 10,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,

    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
    },
    buttonText: {
        color: COLORS.white,
    },
    notificationImage: {
        width: 15,
        height: 15,
        margin: 20,
    },
    successMessage: {
        color: COLORS.green,
        marginBottom: 20,
    },

});

export default Email;