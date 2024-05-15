import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';
import InputField from '../../components/InputField';

const Step1 = () => {
  return (
    <SafeAreaView style={styles.container}>
        {/* title */}
        <View style={styles.form}>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
            <Text style={globalStyles.bodyTextMedium}>Contactgegevens</Text>
        </View>
        {/* input fields */}
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.inputs}>
              <InputField label="Voornaam*" placeholder="Voornaam"/>
              <InputField label="Achternaam*" placeholder="Achternaam"/>
              <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address"/>
              <InputField label="Telefoon*" placeholder="Telefoon"/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,
      ...Platform.select({
        ios: {
          padding: 0,
          paddingLeft: 30,
          paddingRight: 30,
        },
      }),
    },
    form: {
      ...Platform.select({
        ios: {
          marginTop: -20,
        },
      }),
    },
    inputs: {
      paddingBottom: 20,
    },
})

export default Step1;
