import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ResetPassword = ({ navigation }) => {

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
                <InputField label="Nieuw wachtwoord*" placeholder="Nieuw wachtwoord" secureTextEntry />
                <InputField label="Bevestig nieuw wachtwoord*" placeholder="Nieuw wachtwoord" secureTextEntry />
            </View>
            <View style={{marginTop: 25}}>
                <Button title="Wachtwoord resetten" onPress={() => console.log("Pressed")} filled/>
            </View>
        </SafeAreaView>
    );
}

export default ResetPassword;