import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import Button from '../components/Button';
import SubscriptionCard from '../components/Subscription';

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
                <Text style={globalStyles.headerText}>Kies een pakket dat bij je past</Text>
            </View>
            {/* keuze maken tussen drie opties */}
            <View style={{ gap: 20, marginTop: 30 }}>
                <SubscriptionCard
                    onPress={() => handlePress('Groentenpakket')}
                
                    cardHeader="Groentenpakket"
                    cardBody="Weinig tijd maar toch wekelijks genieten van verse lokale biologische groenten"
                    isSelected={selectedOption === 'Groentenpakket'}
                />

                <SubscriptionCard
                    onPress={() => handlePress('Zelfoogstpakket')}
                 
                    cardHeader="Zelfoogstpakket"
                    cardBody="Oogst het hele jaar door verse seizoensgroenten met respect voor de natuur"
                    isSelected={selectedOption === 'Zelfoogstpakket'}
                />
                 <SubscriptionCard
                    onPress={() => handlePress('Meewerkpakket')}
                
                    cardHeader="Meewerkpakket"
                    cardBody="Help op het veld, oogst je eigen planten, en draag actief bij aan lokale voedselproductie"
                    isSelected={selectedOption === 'Meewerkpakket'}
                />

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