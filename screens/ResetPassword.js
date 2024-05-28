import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ResetPassword = ({ route, navigation }) => {

    const { token } = route.params;
    const [password, setPassword] = useState('');

    const handleResetPassword = async () => {
        console.log("Reset password");

        try {
            const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/reset-password/${token}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (data.status === 'success') {
              alert('Wachtwoord succesvol gewijzigd!');
              navigation.navigate('Login'); // Navigeer naar het login scherm na succesvolle reset
            } else {
              alert('Er is een fout opgetreden: ' + data.message);
            }
          } catch (error) {
            alert('Er is een fout opgetreden: ' + error.message);
          }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* title */}
            <View>
                <Text style={{...globalStyles.headerText, marginBottom: 10}}>Je wachtwoord resetten</Text>
            </View>
            <View>
                <Text style={{...globalStyles.bodyText, marginBottom: 5}}>Voer je nieuwe wachtwoord in.</Text>
            </View>
            <View>
                <TextInput
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

export default ResetPassword;