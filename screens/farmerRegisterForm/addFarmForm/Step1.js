import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../styles/global';
import InputField from '../../../components/InputField';

const Step1 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
        </View>
        {/* input fields */}
        <ScrollView>
          <View>
              <InputField label="E-mail*" placeholder="E-mail"/>
              <InputField label="Telefoon*" placeholder="Telefoon"/>
              <InputField label="Openingsuren*" placeholder="Openingsuren"/>
              <InputField label="Sluitingsuren*" placeholder="Sluitingsuren"/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Step1;
