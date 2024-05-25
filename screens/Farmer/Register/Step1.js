import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../styles/global';
import InputField from '../../../components/InputField';

const Step1 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 5}}>Account maken</Text>
            <Text style={globalStyles.bodyTextMedium}>Contactgegevens</Text>
        </View>
        {/* input fields */}
        <ScrollView>
          <View>
              <InputField label="Voornaam*" placeholder="Voornaam"/>
              <InputField label="Achternaam*" placeholder="Achternaam"/>
              <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address"/>
              <InputField label="Telefoon*" placeholder="Telefoon"/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Step1;
