import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../styles/global';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

const Step6 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
            <Text style={globalStyles.bodyTextMedium}>Welke diensten wilt u bieden aan de klanten?</Text>
        </View>
        {/* input fields */}
        <ScrollView>
          <View>
              <InputField label="Groentepakketten*" placeholder="Groentepakketten"/>
              <InputField label="Zelfoogstpakket*" placeholder="Zelfoogstpakket"/>
              <InputField label="Meewerkpakket*" placeholder="Meewerkpakket"/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Step6;
