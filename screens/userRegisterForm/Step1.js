import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
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
        <View>
            <InputField label="Voornaam*" placeholder="Voornaam"/>
            <InputField label="Achternaam*" placeholder="Achternaam"/>
            <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address"/>
            <InputField label="Telefoon*" placeholder="Telefoon"/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,
      ...Platform.select({
        ios: {
          padding: 0,
          // flex: .8,
          paddingLeft: 30,
          paddingRight: 30,
          // justifyContent: 'flex-start',
        },
      }),
    },
    form: {
      ...Platform.select({
        ios: {
          // backgroundColor: 'red',
          marginTop: -20,
        },
      }),
    },
})

export default Step1;
