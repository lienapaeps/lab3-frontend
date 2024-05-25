import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../../styles/global';
// import InputField from '../../../components/InputField';
import Button from '../../../../components/Button';

const Step6 = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
        {/* title */}
        <View>
            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Welkom!</Text>
            <Text style={globalStyles.bodyTextMedium}>Je boerderij is succesvol toegevoegd!</Text>
        </View>
        {/* input fields */}
        <ScrollView>
          <View>
                <Button title="Aan de slag" onPress={() => {}}/>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Step6;
