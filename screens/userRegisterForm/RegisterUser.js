import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const RegisterUser = ({ navigation }) => {
    const totalSteps = 3; // Totaal aantal stappen in het formulier

    // Initialisatie van formuliergegevens
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        telephone: '',
        address: {
            street: '',
            number: '',
            zipcode: '',
            city: ''
        },
        password: ''
    });

    // Huidige stapnummer en progressie
    const [currentStep, setCurrentStep] = useState(0);
    const progress = (currentStep + 1) / totalSteps;

    // Functie om naar de volgende stap te gaan
    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Functie om terug te gaan naar de vorige stap
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Functie om het formulier te verzenden
    const submitForm = () => {
        // Verzend formuliergegevens naar API
        console.log('Verzend formuliergegevens:', formData);
    };

    // Functie om formuliergegevens bij te werken
    const updateFormData = (key, value) => {
        console.log(formData);
        setFormData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // Functie om de huidige stapinhoud te renderen
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <View style={styles.stepContainer}>
                        {/* terug knop naar registreer */}
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/Back-arrow.png')} style={styles.arrowImg} />
                        </TouchableOpacity>
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
                            <Text style={globalStyles.bodyTextMedium}>Contactgegevens</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Voornaam*" placeholder="Voornaam" value={formData.firstname} onChangeText={text => updateFormData('firstname', text)}/>
                            <InputField label="Achternaam*" placeholder="Achternaam" value={formData.lastname} onChangeText={text => updateFormData('lastname', text)}/>
                            <InputField label="E-mail*" placeholder="E-mail" keyboardType="email-address" value={formData.email} onChangeText={text => updateFormData('email', text)}/>
                            <InputField label="Telefoon*" placeholder="Telefoon" value={formData.telephone} onChangeText={text => updateFormData('telephone', text)}/>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
                            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Straat*" placeholder="Straat" value={formData.address.street} onChangeText={text => updateFormData('street', text)}/>
                            <InputField label="Huisnummer*" placeholder="Huisnummer" value={formData.address.number} onChangeText={text => updateFormData('number', text)}/>
                            <InputField label="Postcode*" placeholder="Postcode" value={formData.address.zipcode} onChangeText={text => updateFormData('zipcode', text)}/>
                            <InputField label="Stad*" placeholder="Stad" value={formData.address.city} onChangeText={text => updateFormData('city', text)}/>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
                            <Text style={globalStyles.bodyTextMedium}>Wachtwoord instellen</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry value={formData.password} onChangeText={text => updateFormData('password', text)}/>
                            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry/>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Progressiebalk */}
            <ProgressBar
                progress={progress}
                width={null}
                style={styles.progressBar}
                color={COLORS.green}
                height={20}
            />
            {/* terug knop naar vorige stap */}
            {currentStep > 0 && (
                <TouchableOpacity style={styles.left} onPress={prevStep}>
                    <Image source={require('../../assets/Back-arrow.png')} style={styles.arrowImg} />
                </TouchableOpacity>
            )}
            {/* Huidige stap inhoud */}
            <View style={styles.formContainer}>
                {renderStep()}

                {/* Knoppen voor navigatie */}
                <View>
                    {currentStep < totalSteps - 1 ? (
                        <Button title="Volgende" onPress={nextStep} filled />

                    ) : (
                        <Button title="Klaar" onPress={submitForm} filled />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginTop: 30
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
    stepContainer: {
        marginTop: -20
    },
    progressBar: {
        width: '100%',
        marginTop: 5,
        backgroundColor: COLORS.veryLightOffBlack,
        borderWidth: 0,
        borderRadius: 0,
        ...Platform.select({
            ios: {
                marginBottom: 20,
            },
        }),
    },
    backButton: {
        marginBottom: 30
    },
    left: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20
    },
    arrowImg: {
        width: 30,
        height: 30,
    },
});

export default RegisterUser;
