import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';
import InputField from '../../components/InputField';

const Step3 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
            <Text style={globalStyles.bodyTextMedium}>Wachtwoord instellen</Text>
        </View>
        {/* input fields */}
        <View>
            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry/>
            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry/>
        </View>
    </SafeAreaView>
  );
};

export default Step3;
