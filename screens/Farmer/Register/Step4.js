import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../../styles/global';
import FarmRegistrationSucces from '../../../components/FarmRegistrationSucces';

const Step4 = ({ navigation }) => {

  return (
    <SafeAreaView style={globalStyles.container}>
        <FarmRegistrationSucces navigation={navigation} />
    </SafeAreaView>
  );
};

export default Step4;
