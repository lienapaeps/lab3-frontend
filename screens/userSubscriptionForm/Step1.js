import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';
import Button from '../../../components/Button';
import OptionButton from '../../../components/OptionButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const Step1 = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* header */}
      <View>
        <Text style={globalStyles.headerText}>Je koos voor het Meewerkpakket</Text>
      </View>
      {/* keuze maken tussen de drie Abonnementen*/}
      <View style={styles.card}>
        <Text style={globalStyles.headerTextSmaller}>Meewerpakket</Text>
        <Text style={[globalStyles.bodyTextMedium, styles.text]}>Help op het veld, oogst je eigen planten, en draag actief bij aan lokale voedselproductie</Text>
        <Text style={[globalStyles.bodyTextMedium, styles.text]}>De Samenvatting: Je helpt op het veld in groep.Oogst je eigen planten, en draagt actief bij aan lokale voedselproductie</Text>
        <Text style={[globalStyles.bodyTextMedium, styles.text]}>De prijs bedraagt 10 euro per maand.</Text>
        
      </View>
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 150,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: 'space-around',
    gap: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

})

export default Step1;
