import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'

import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';
import { updateUserPhone } from '../../../../utils/fetchHelpers';

const Phone = ({ navigation, route }) => {
    const userData = route.params.userData;
    const [phone, setPhone] = useState(userData.telephone);
    const [showSuccess, setShowSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const handlePhoneChange = (text) => {
        setPhone(text);
        setPhoneError('');
    }

    const clearPhone = () => {
        setPhone('');
        setPhoneError('');
    }

    const updatePhone = () => {
        // Call the changeEmail function from fetchHelpers to update the phone
        if (!validatePhone(phone)) {
            setPhoneError('Please enter a valid phone address');
            return;
        }
        updateUserPhone(userData._id, phone)
            .then(() => {
                setShowSuccess(true);
                // Handle success
                console.log('Phone updated successfully');
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating phone:', error);
            });
    }
    // Function to validate phone number
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
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
                <Text style={globalStyles.headerText}>Telefoon</Text>
            </View>
            <View style={styles.content}>
                {showSuccess && (
                    <Text style={styles.successMessage}>Telefoonnummer is succesvol veranderd!</Text>
                )}
                <Text style={globalStyles.headerTextSmallerMedium}>Telefoon</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handlePhoneChange}
                        value={phone}
                        placeholder="Telefoon"
                    />
                    <TouchableOpacity style={styles.buttonSmall} onPress={clearPhone}>
                        <Image style={styles.notificationImage} source={require('../../../../assets/icons/cross-black.png')} />
                    </TouchableOpacity>
                </View>

                {phoneError !== '' && (
                    <Text style={globalStyles.errorText}>{phoneError}</Text>
                )}
                
                <TouchableOpacity style={styles.button} onPress={updatePhone}>
                    <Text style={globalStyles.buttonText}>Opslaan</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
    },
    inputContainer: {
        padding : 5,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,

    },
    button: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
       padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.green,
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

export default Phone;