import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import ImageUpload from '../../../components/ImageUpload';

const AddActivity = ({ navigation, route }) => {
    const farmId = route.params.farmId;
    const totalSteps = 3;
    const [currentStep, setCurrentStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [successfullyAdded, setSuccessfullyAdded] = useState(false);

    const [activityData, setActivityData] = useState({
        title: '',
        category: '',
        start: {
            date: '',
            time: ''
        },
        end: {
            date: '',
            time: ''
        },
        description: '',
        image: '',
        farm: farmId,
    });

    const handleChange = (field, value) => {
        setActivityData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // const validateStep = () => {
    //     switch (currentStep) {
    //         case 0:
    //             return validateStep1();
    //         case 1:
    //             return validateStep2();
    //         case 2:
    //             return true;
    //         default:
    //             return true;
    //     }
    // };

    const submitForm = async () => {
        setIsProcessing(true);
        try {
            // Voeg hier de API-call toe om de activiteit op te slaan
            console.log('Submitting form with data:', activityData);
            // Als succesvol
            setSuccessfullyAdded(true);
            // navigation.goBack();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Er is iets misgegaan. Probeer het opnieuw.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Functie om de huidige stapinhoud te renderen
    const renderStep = () => {
            switch (currentStep) {
                case 0:
                    return (
                        <View style={styles.stepContainer}>
                            <View style={styles.header}>
                                {/* terug knop naar boerderij */}
                                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                    <Image source={require('../../../assets/Back-arrow.png')} style={styles.arrowImg} />
                                </TouchableOpacity>
                                {/* stap indicator */}
                                <Text style={{ ...globalStyles.bodyText, marginTop: 5 }}>Stap {currentStep + 1} van de {totalSteps}</Text>
                            </View>
                            {/* foutmelding */}
                            {errorMessage !== '' && (
                                <View style={styles.errorMessageContainer}>
                                    <Text style={globalStyles.errorText}>{errorMessage}</Text>
                                </View>
                            )}
                            {/* formulier */}
                            <Text style={globalStyles.headerText}>Activiteit toevoegen</Text>
                            <Text style={{ ...globalStyles.bodyText, marginBottom: 5 }}>Basis informatie</Text>
                            <View style={styles.inputs}>
                                <InputField label="Naam activiteit*" placeholder="Naam activiteit" value={activityData.title} onChangeText={(text) => handleChange('title', text)}/>
                                <InputField label="Soort activiteit*" placeholder="Soort activiteit" value={activityData.category} onChangeText={(text) => handleChange('category', text)}/>
                                
                                <Text style={styles.label}>Begin*</Text>
                                <View style={styles.date}>
                                    <TextInput style={styles.input} placeholder="Datum" value={activityData.start.date} onChangeText={(text) => handleChange('start.date', text)}/>
                                    <TextInput style={styles.input} placeholder="Tijd" value={activityData.start.time} onChangeText={(text) => handleChange('start.time', text)}/>
                                </View>
                                <Text style={styles.label}>Einde*</Text>
                                <View style={styles.date}>
                                    <TextInput style={styles.input} placeholder="Datum" value={activityData.end.date} onChangeText={(text) => handleChange('end.date', text)}/>
                                    <TextInput style={styles.input} placeholder="Tijd" value={activityData.end.time} onChangeText={(text) => handleChange('end.time', text)}/>
                                </View>
                                
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
                            {/* formulier */}
                            <Text style={globalStyles.headerText}>Activiteit toevoegen</Text>
                            <Text style={{ ...globalStyles.bodyText, marginBottom: 5 }}>Details</Text>
                            <View style={styles.inputs}>
                                <ImageUpload title="een afbeelding" onImageSelect={(url) => handleChange('image', url)} />
                                <InputField multiline={true} label="Beschrijving*" placeholder="Beschrijving" value={activityData.description} onChangeText={(text) => handleChange('description', text)}/>
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
                            {/* formulier */}
                            <Text style={globalStyles.headerText}>Activiteit toevoegen</Text>
                            <Text style={{ ...globalStyles.bodyText, marginBottom: 15 }}>Overzicht</Text>
                            <View>
                                <Text style={globalStyles.bodyText}>Afbeelding van de activiteit</Text>
                                <Text style={styles.label}>Naam activiteit</Text>
                                <Text style={globalStyles.bodyText}>Datum en tijd</Text>
                                <Text style={styles.label}>Beschrijving</Text>
                            </View>     
                        </View>
                    );
                default:
                    return null;
            }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* terug knop naar vorige stap */}
            {currentStep > 0 &&  (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.left} onPress={prevStep}>
                        <Image source={require('../../../assets/Back-arrow.png')} style={styles.arrowImg} />
                    </TouchableOpacity>
                    <Text style={{ ...globalStyles.bodyText, marginTop: 15, marginRight: 20 }}>Stap {currentStep + 1} van de {totalSteps}</Text>
                </View>
            )}          

            {/* Huidige stap inhoud */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.formContainer}>
                        {renderStep()}

                        {/* Knoppen voor navigatie */}
                        <View>
                            {currentStep < totalSteps - 1 ? (
                                <Button style={{marginTop: 30}} title="Volgende" onPress={nextStep} filled />

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    stepContainer: {
        marginTop: -20
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
    input: {
        padding: 18,
        height: 55,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
        flex: 1
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 15
    },
    label: {
        fontFamily: 'Baloo2_500Medium',
        fontSize: 16,
        color: COLORS.offBlack,
        marginBottom: 10,
        marginTop: 15,
    },
    checkBoxContainer: {
        padding: 15,
        marginLeft: 0,
        flex: 1,
        borderRadius: 10,
    },
});

export default AddActivity;
