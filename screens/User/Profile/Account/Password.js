import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native';

import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';

const Password = ({ navigation, route }) => {

    const userData = route.params.userData;
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const updatePassword = () => {

    }
    // Function to validate old password
    // Function to validate new password

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
                <Text style={globalStyles.headerText}>Password</Text>
            </View>
            <View style={styles.content}>
                {showSuccess && (
                    <Text style={styles.successMessage}>Password changed successfully</Text>
                )}
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="password"
                    />

                    {newPasswordError !== '' && (
                        <Text style={globalStyles.errorText}>{emailError}</Text>
                    )}

                </View>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        placeholder="New password"
                    />
                </View>

                {newPasswordError !== '' && (
                    <Text style={globalStyles.errorText}>{emailError}</Text>
                )}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Update Password</Text>
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
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
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

export default Password;