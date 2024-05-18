import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import Button from '../components/Button';
import OptionButton from '../components/OptionButton';

const Register = ({ navigation }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePress = (option) => {
        setSelectedOption(option);
        setErrorMessage('');
    }

    const handleNext = () => {
        if (selectedOption === null) {
            setErrorMessage('U moet een optie selecteren voordat u verder kunt gaan.');
        } else {
            let screenName;
            if (selectedOption === 'registerUser') {
                screenName = 'registerUser';
            } else if (selectedOption === 'registerFarmer') {
                screenName = 'registerFarmer';
            }
            navigation.navigate(screenName);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header */}
            <View>
                <Text style={globalStyles.headerText}>Account maken</Text>
                <Text style={{...globalStyles.bodyText, marginTop: 15}}>Als wie wilt u een account aanmaken?</Text>
                <Text style={{...globalStyles.bodyText, fontFamily:'Quicksand_600SemiBold', marginTop: 20}}>Let op: U kunt maar één keer kiezen als wie u een account aanmaakt. Eens uw account geregistreerd is, kunt u dit niet meer wijzigen.</Text>
            </View>
            {/* error message */}
            {errorMessage !== '' && (
                <View style={styles.errorMessageContainer}>
                    <Text style={globalStyles.errorText}>{errorMessage}</Text>
                </View>
            )}
            {/* keuze maken tussen gebruiker of landbouwer*/}
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 25 }}>
                <OptionButton
                    onPress={() => handlePress('registerUser')}
                    imageSource={require('../assets/gebruiker.png')}
                    buttonText="Gebruiker"
                    isSelected={selectedOption === 'registerUser'}
                />

                <OptionButton
                    onPress={() => handlePress('registerFarmer')}
                    imageSource={require('../assets/landbouwer.png')}
                    buttonText="Landbouwer"
                    isSelected={selectedOption === 'registerFarmer'}
                />
            </View>

            {/* volgende knop */}
            <View style={{marginTop: 30}}>
                {/* navigeer naar de volgende pagina met de waarde van de geselecteerde optie */}
                <Button title="Volgende" filled onPress={handleNext} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginTop: -15,
        marginTop: 20,
    },
});

export default Register;