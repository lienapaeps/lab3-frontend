import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Fout', 'Vul een e-mailadres in.');
            return;
        }

        try {
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Succes', 'Een e-mail met verdere instructies is verstuurd.');
                navigation.navigate('Login'); // Navigeer naar het login scherm na succesvolle aanvraag
            } else {
                Alert.alert('Fout', data.message || 'Er is iets misgegaan.');
            }
        } catch (error) {
            Alert.alert('Fout', error.message || 'Er is iets misgegaan.');
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* title */}
            <View>
                <Text style={{...globalStyles.headerText, marginBottom: 10}}>Wachtwoord vergeten?</Text>
            </View>
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
                {/* <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address" /> */}
            </View>
            <View style={{marginTop: 25}}>
                <Button title="Verstuur code" onPress={handleForgotPassword} filled/>
            </View>
        </SafeAreaView>
    );
}

export default ForgotPassword;