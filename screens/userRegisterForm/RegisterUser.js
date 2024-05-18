import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        street: '',
        streetnumber: '',
        zipcode: '',
        city: '',
        password: '',
        confirmPassword: ''
    });

    // Huidige stapnummer en progressie
    const [currentStep, setCurrentStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const progress = (currentStep + 1) / totalSteps;

    // Functie om naar de volgende stap te gaan
    const nextStep = () => {
        if (validateStep()) {
            setErrorMessage('');
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    // Functie om terug te gaan naar de vorige stap
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Functie om formuliergegevens bij te werken
    const updateFormData = (key, value) => {
        // console.log(formData);
        setFormData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // Functie om het formulier te verzenden
    const submitForm = async () => {
        console.log('submit data:' + JSON.stringify(formData));
        try {
            const response = await fetch("https://lab3-backend-w1yl.onrender.com/users/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(formData),
            });

            const json = await response.json();

            if (json.status === 'success') {
                // Sla JWT token op in local storage
                await AsyncStorage.setItem('token', json.data.token);

                console.log(json.data.token);

                // Navigeer naar de volgende pagina (bijv. HomeUser)
                navigation.navigate('App', { screen: 'HomeUser' });
            } else {
                // Toon een foutmelding als registratgegevens onjuist zijn
                setErrorMessage(json.message);
            }
        } catch (error) {
            console.error('Fout bij het registreren:', error);
            // Toon een algemene foutmelding als er een fout optreedt
            setErrorMessage('Er is een fout opgetreden bij het registreren');
        }
    };

    const validateStep = () => {
        switch (currentStep) {
            case 0:
                return validateStep1();
            case 1:
                return validateStep2();
            case 2:
                return validateStep3();
            default:
                return true;
        }
    };

    const validateStep1 = () => {
        const { firstname, lastname, email, telephone } = formData;
        if (!firstname || !lastname || !email || !telephone) {
            setErrorMessage('Alle velden zijn verplicht.');
            return false;
        }
        // E-mail validatie
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Voer een geldig e-mailadres in.');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        const { street, streetnumber, zipcode, city } = formData;
        if (!street || !streetnumber || !zipcode || !city) {
            setErrorMessage('Alle velden zijn verplicht.');
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        const { password, confirmPassword } = formData;
        if (!password || !confirmPassword) {
            setErrorMessage('Alle velden zijn verplicht.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Wachtwoorden komen niet overeen.');
            return false;
        }
        return true;
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
                        {/* foutmelding */}
                        {errorMessage !== '' && (
                            <View style={styles.errorMessageContainer}>
                                <Text style={globalStyles.errorText}>{errorMessage}</Text>
                            </View>
                        )}
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
                        {/* foutmelding */}
                        {errorMessage !== '' && (
                            <View style={styles.errorMessageContainer}>
                                <Text style={globalStyles.errorText}>{errorMessage}</Text>
                            </View>
                        )}
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
                            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Straat*" placeholder="Straat" value={formData.street} onChangeText={text => updateFormData('street', text)}/>
                            <InputField label="Huisnummer*" placeholder="Huisnummer" value={formData.streetnumber} onChangeText={text => updateFormData('streetnumber', text)}/>
                            <InputField label="Postcode*" placeholder="Postcode" value={formData.zipcode} onChangeText={text => updateFormData('zipcode', text)}/>
                            <InputField label="Stad*" placeholder="Stad" value={formData.city} onChangeText={text => updateFormData('city', text)}/>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                    {/* foutmelding */}
                        {errorMessage !== '' && (
                            <View style={styles.errorMessageContainer}>
                                <Text style={globalStyles.errorText}>{errorMessage}</Text>
                            </View>
                        )}
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Account maken</Text>
                            <Text style={globalStyles.bodyTextMedium}>Wachtwoord instellen</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry value={formData.password} onChangeText={text => updateFormData('password', text)}/>
                            <InputField label="Wachtwoord*" placeholder="Wachtwoord" secureTextEntry value={formData.confirmPassword} onChangeText={text => updateFormData('confirmPassword', text)}/>
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
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
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginTop: -15,
        marginBottom: 30
    },
});

export default RegisterUser;
