import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CodeInput from '../components/CodeInput';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [enteringVerificationCode, setEnteringVerificationCode] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            setErrorMessage('Vul een e-mailadres in.');
            return;
        }
    
        try {
            setLoading(true);
    
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage('Een e-mail met verdere instructies is verstuurd.');
                // succes message leegmaken na 5 seconden
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000);

                setEnteringVerificationCode(true);

                setEmailSent(true);
                setErrorMessage('');
            } else {
                setLoading(false);
                setErrorMessage(data.message || 'Er is iets misgegaan.');
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message || 'Er is iets misgegaan.');
        }
    };
    
    const handleVerifyCode = async () => {

        if (!verificationCode) {
            setSuccessMessage('');
            setErrorMessage('Vul de verificatiecode in.');
            return;
        }
    
        try {
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/users/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }),
            });
    
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                navigation.navigate('ResetPassword', {
                    token: verificationCode,
                    email: email,
                });
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Er is iets misgegaan.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.message || 'Er is iets misgegaan.');
        }
    };
    

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* title */}
            <View>
                <Text style={{...globalStyles.headerText, marginBottom: 10}}>
                    {enteringVerificationCode ? 'Vul verificatie code in' : 'Wachtwoord vergeten?'}
                </Text>
            </View>
            {/* succes en foutmeldingen */}
            {successMessage !== '' && (
                <View style={styles.successMessageContainer}>
                    <Text style={globalStyles.successText}>{successMessage}</Text>
                </View>
            )}
            {errorMessage !== '' && (
                <View style={styles.errorMessageContainer}>
                    <Text style={globalStyles.errorText}>{errorMessage}</Text>
                </View>
            )}
            {!emailSent ? (
                <>
                    <View>
                        <Text style={{...globalStyles.bodyText, marginBottom: 5}}>Voer het e-mailadres in dat is gekoppeld aan je account.</Text>
                    </View>
                    <View>
                        <InputField
                            label="E-mail*"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={{marginTop: 25}}>
                        <Button
                            title={loading ? 'Aan het versturen...' : 'Verstuur code'}
                            onPress={handleForgotPassword}
                            filled
                            disabled={loading}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Text style={{...globalStyles.bodyText, marginBottom: 5}}>Voer de verificatiecode in die naar je e-mailadres is gestuurd. Dit kan enkele seconden duren.</Text>
                    </View>
                    <View>
                        <CodeInput
                            value={verificationCode}
                            onChange={setVerificationCode}
                        />
                    </View>
                    <View style={{marginTop: 25}}>
                        <Button
                            title="Verifieer code"
                            onPress={handleVerifyCode}
                            filled
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = {
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    successMessageContainer: {
        backgroundColor: '#d4edda',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    }
};

export default ForgotPassword;