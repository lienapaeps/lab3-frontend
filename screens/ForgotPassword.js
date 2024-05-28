import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ForgotPassword = ({ navigation }) => {

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
                <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address" />
            </View>
            <View style={{marginTop: 25}}>
                <Button title="Verstuur code" onPress={() => console.log("Pressed")} filled/>
            </View>
        </SafeAreaView>
    );
}

export default ForgotPassword;