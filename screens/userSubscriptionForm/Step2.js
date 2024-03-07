import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../styles/global';
import InputField from '../../../components/InputField';

const Step2 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
        </View>
        {/* input fields */}
        <View>
            <InputField label="Naam*" placeholder="Naam"/>
            <InputField label="Achternaam*" placeholder="Achternaam"/>
            <InputField label="Postcode*" placeholder="Postcode"/>
            <InputField label="Stad*" placeholder="Stad"/>
        </View>
    </SafeAreaView>
  );
};

export default Step2;
