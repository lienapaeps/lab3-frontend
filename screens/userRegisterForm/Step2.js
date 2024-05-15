import React from 'react';
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';
import InputField from '../../components/InputField';

const Step2 = () => {
  return (
    <SafeAreaView style={styles.container}>
        {/* title */}
        <View style={styles.form}>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
        </View>
        {/* input fields */}
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.inputs}>
              <InputField label="Straat*" placeholder="Straat"/>
              <InputField label="Huisnummer*" placeholder="Huisnummer"/>
              <InputField label="Postcode*" placeholder="Postcode"/>
              <InputField label="Stad*" placeholder="Stad"/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Step2;

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
