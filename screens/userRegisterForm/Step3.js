import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';
import InputField from '../../components/InputField';

const Step3 = () => {
  return (
    <SafeAreaView style={styles.container}>
        {/* title */}
        <View style={styles.form}>
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
})