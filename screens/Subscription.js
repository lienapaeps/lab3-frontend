import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import Button from '../components/Button';
import OptionButton from '../components/OptionButton';

const Subscription = ({ navigation }) => {

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
                <Text style={globalStyles.headerText}>Account maken</Text>
            </View>
            {/* keuze maken tussen drie opties */}
            <View style={styles.card}>
        <Text style={globalStyles.headerTextSmaller}>Groentepakket</Text>
        <Text style={[globalStyles.bodyTextMedium, styles.text]}>Weinig tijd maar toch wekelijks genieten van verse lokale biologische groenten</Text>
      </View>
      <View style={styles.card}>
        <Text style={globalStyles.headerTextSmaller}>Zelfoogstpakket</Text>
        <Text style={[globalStyles.headerTextMedium, styles.text]}>Oogst het hele jaar door verse seizoensgroenten met respect voor de natuur</Text>
      </View>
      <View style={styles.card}>
        <Text style={globalStyles.headerTextSmaller}>Meewerpakket</Text>
        <Text style={[globalStyles.bodyTextMedium, styles.text]}>Help op het veld, oogst je eigen planten, en draag actief bij aan lokale voedselproductie</Text>
      </View>

            {/* volgende knop */}
            <View style={{marginTop: 30}}>
                {/* navigeer naar de volgende pagina met de waarde van de geselecteerde optie */}
                <Button title="Volgende" filled onPress={() => navigation.navigate(selectedOption)} />
            </View>
        </SafeAreaView>
    );
}

export default Subscription;