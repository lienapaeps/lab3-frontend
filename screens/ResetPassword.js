import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ResetPassword = ({ route, navigation }) => {

    const { email, token } = route.params || {};
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      if (!token) {
            setErrorMessage('Geen geldige token ontvangen.');
            navigation.navigate('ForgotPassword');
      }
    }, [token, email]);

    const handleResetPassword = async () => {

      try {
          const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/reset-password/${token}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                verificationCode: token, 
                newPassword: password
            }),
          });
          const data = await response.json();

          if (data.status === 'success') {
                // alert success
                Alert.alert('Wachtwoord resetten', 'Je wachtwoord is succesvol veranderd.', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]);
          } else {
                setErrorMessage(data.message || 'Er is iets misgegaan.');
          }
      } catch (error) {
            setErrorMessage(data.message || 'Er is iets misgegaan.');
      }
    };

    return (
      <SafeAreaView style={globalStyles.container}>
          {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Je wachtwoord resetten</Text>
        </View>
        {errorMessage !== '' && (
            <View style={styles.errorMessageContainer}>
                <Text style={globalStyles.errorText}>{errorMessage}</Text>
            </View>
        )}
        <View>
            <Text style={{...globalStyles.bodyText, marginBottom: 5}}>Voer je nieuwe wachtwoord in.</Text>
        </View>
        <View>
            <InputField 
              label="Nieuw wachtwoord*" 
              placeholder="Nieuw wachtwoord" 
              secureTextEntry
              value={password} 
              onChangeText={setPassword} 
            />
            {/* <InputField label="Nieuw wachtwoord*" placeholder="Nieuw wachtwoord" secureTextEntry value={password} onChangeText={} /> */}
        </View>
        <View style={{marginTop: 25}}>
            <Button title="Wachtwoord resetten" onPress={handleResetPassword} filled/>
        </View>
    </SafeAreaView>
    );
}

const styles = {
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 15,
        marginBottom: 20,
        borderRadius: 5,
    },
};

export default ResetPassword;