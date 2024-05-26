import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';

const AddFarm = ({ navigation, route }) => {
    const totalSteps = 4; // Totaal aantal stappen in het formulier

    const farmerId = route.params.params.userId;

    // Initialisatie van formuliergegevens
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        farmImage: '',
        //
        adress: {
            street: '',
            number: '',
            zipcode: '',
            city: '',
        },
        coordinates: {
            latitude: '',
            longitude: '',
        },
        //
        openinghours: [
            { day: 'Maandag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Dinsdag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Woensdag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Donderdag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Vrijdag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Zaterdag', openinghour: '09:00', closinghour: '17:00' },
            { day: 'Zondag', openinghour: '09:00', closinghour: '17:00' },
        ],
        //
        contact: {
            number: '',
            email: '',
            website: '',
        },
        owner: farmerId,
    });

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTimeField, setSelectedTimeField] = useState(null);

    const showTimePicker = (field) => {
        setSelectedTimeField(field);
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        const formattedTime = format(date, 'HH:mm');
        updateFormData(selectedTimeField, formattedTime);
        hideTimePicker();
    };

    // Huidige stapnummer en progressie
    const [currentStep, setCurrentStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const progress = (currentStep + 1) / totalSteps;

    const getCoordinates = async () => {
      const address = `${formData.adress.street} ${formData.adress.number} ${formData.adress.zipcode} ${formData.adress.city}`;

      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA77msktu9JGTv3EpKeXIX-lwfjjYYoX_s`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const coordinates = data.results[0].geometry.location;
          return coordinates;
        } else {
            throw new Error('Geen coördinaten gevonden voor het opgegeven adres');
        }
      } catch (error) {
          throw new Error('Fout bij het ophalen van coördinaten: ' + error.message);
      }
    };

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

    const updateFormData = (key, value) => {
      // Als de sleutel 'adress' bevat, update adress
      if (key.startsWith('adress')) {
          const subKey = key.split('.')[1]; // Haal de sub-sleutel op (bijv. street, number, etc.)
          setFormData(prevState => ({
              ...prevState,
              adress: {
                  ...prevState.adress,
                  [subKey]: value,
              },
          }));
      }
      // Als de sleutel 'openinghours' bevat, update openingstijden
      else if (key.startsWith('openinghours')) {
          const [, index, field] = key.match(/\[(\d+)\]\.(openinghour|closinghour)/); // Haal index en veld op
          setFormData(prevState => ({
              ...prevState,
              openinghours: prevState.openinghours.map((item, i) => {
                  if (i === parseInt(index)) {
                      return {
                          ...item,
                          [field]: value
                      };
                  }
                  return item;
              })
          }));
      }
      // Als de sleutel 'contact' bevat, update contactgegevens
      else if (key.startsWith('contact')) {
          const subKey = key.split('.')[1]; // Haal de sub-sleutel op (bijv. number, email, etc.)
          setFormData(prevState => ({
              ...prevState,
              contact: {
                  ...prevState.contact,
                  [subKey]: value,
              },
          }));
      }
      // Anders update de rest van de velden
      else {
          setFormData(prevState => ({
              ...prevState,
              [key]: value,
          }));
      }
    };

    // Functie om het formulier te verzenden
    const submitForm = async () => {
        console.log('submit data:' + JSON.stringify(formData));
        try {

            const coordinates = await getCoordinates();

            console.log('coordinates:', coordinates);

            const updatedFormData = {
              ...formData,
              coordinates: {
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
              },
          };

            console.log('form data na coords:', updatedFormData);

            const response = await fetch("https://lab3-backend-w1yl.onrender.com/api/farms", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(updatedFormData),
            });

            const json = await response.json();

            if (json.status === 'success') {
                // Sla JWT token op in local storage
                const farmId = json.data.farm._id;
                console.log('Nieuwe boerderij toegevoegd, id is:', farmId);
                // console.log(json.data.farm._id);

                navigation.navigate('AddPackages', { params: { farmId: farmId } });
            } else {
                // Toon een foutmelding als registratgegevens onjuist zijn
                setErrorMessage(json.message);
            }
        } catch (error) {
            console.error('Fout bij het toevoegen van boerderij:', error);
            // Toon een algemene foutmelding als er een fout optreedt
            setErrorMessage('Er is een fout opgetreden bij het toevoegen van boerderij');
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
            case 3:
                return validateStep4();
            default:
                return true;
        }
    };

    const validateStep1 = () => {
        const { name, description, farmImage } = formData;
        if (!name || !description || !farmImage) {
            setErrorMessage('Alle velden zijn verplicht.');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        const { street, number, zipcode, city } = formData.adress;
        if (!street || !number || !zipcode || !city) {
            setErrorMessage('Alle velden zijn verplicht.');
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
      const { openinghours } = formData;
      // Controleer eerst of openinghours gedefinieerd is en een array is
      if (!openinghours || !Array.isArray(openinghours)) {
          setErrorMessage('Geen openingstijden ingevuld.');
          return false;
      }
      // Controleer vervolgens de lengte van openinghours
      if (openinghours.length === 0) {
          setErrorMessage('Geen openingstijden ingevuld.');
          return false;
      }
      // Controleer elk item in openinghours
      for (let i = 0; i < openinghours.length; i++) {
          const { openinghour, closinghour } = openinghours[i];
          if (!openinghour || !closinghour) {
              setErrorMessage('Alle velden zijn verplicht.');
              return false;
          }
      }
      return true;
  };

    const validateStep4 = () => {
      const { number, email, website } = formData.contact;
      if (!number || !email || !website) {
          setErrorMessage('Alle velden zijn verplicht.');
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
                            <Image source={require('../../../../assets/Back-arrow.png')} style={styles.arrowImg} />
                        </TouchableOpacity>
                        {/* foutmelding */}
                        {errorMessage !== '' && (
                            <View style={styles.errorMessageContainer}>
                                <Text style={globalStyles.errorText}>{errorMessage}</Text>
                            </View>
                        )}
                        {/* title */}
                        <View style={styles.form}>
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
                            <Text style={globalStyles.bodyTextMedium}>Details</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Naam boerderij*" placeholder="Naam boerderij" value={formData.name} onChangeText={text => updateFormData('name', text)}/>
                            <InputField label="Beschrijving*" placeholder="Beschrijving" value={formData.description} onChangeText={text => updateFormData('description', text)}/>
                            <InputField label="Afbeelding van boerderij*" placeholder="Afbeelding" value={formData.farmImage} onChangeText={text => updateFormData('farmImage', text)}/>
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
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
                            <Text style={globalStyles.bodyTextMedium}>Adres</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Straat*" placeholder="Straat" value={formData.adress.street} onChangeText={text => updateFormData('adress.street', text)}/>
                            <InputField label="Huisnummer*" placeholder="Huisnummer" value={formData.adress.number} onChangeText={text => updateFormData('adress.number', text)}/>
                            <InputField label="Postcode*" placeholder="Postcode" value={formData.adress.zipcode} onChangeText={text => updateFormData('adress.zipcode', text)}/>
                            <InputField label="Stad*" placeholder="Stad" value={formData.adress.city} onChangeText={text => updateFormData('adress.city', text)}/>
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
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
                            <Text style={globalStyles.bodyTextMedium}>Openingsuren</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                        {formData.openinghours.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <TouchableOpacity onPress={() => showTimePicker(`openinghours[${index}].openinghour`)}>
                                        <InputField
                                            label={`${item.day} - Opening`}
                                            placeholder="Opening"
                                            value={item.openinghour}
                                            editable={false}
                                            onPress={() => showTimePicker(`openinghours[${index}].openinghour`)}
                                            fullWidth
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity onPress={() => showTimePicker(`openinghours[${index}].closinghour`)}>
                                        <InputField
                                            label={"Sluiting"}
                                            placeholder="Sluiting"
                                            value={item.closinghour}
                                            editable={false}
                                            onPress={() => showTimePicker(`openinghours[${index}].closinghour`)}
                                            fullWidth
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                      </View>             
                    </View>
                );
            case 3:
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
                            <Text style={{...globalStyles.headerText, marginBottom: 10}}>Boerderij toevoegen</Text>
                            <Text style={globalStyles.bodyTextMedium}>Contact</Text>
                        </View>
                        {/* input fields */}
                        <View style={styles.inputs}>
                            <InputField label="Telefoonnummer*" placeholder="Telefoonnummer" value={formData.contact.number} onChangeText={text => updateFormData('contact.number', text)}/>
                            <InputField label="Email*" placeholder="Email" keyboardType="email-address" value={formData.contact.email} onChangeText={text => updateFormData('contact.email', text)}/>
                            <InputField label="Website*" placeholder="Website" value={formData.contact.website} onChangeText={text => updateFormData('contact.website', text)}/>
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
                    <Image source={require('../../../../assets/Back-arrow.png')} style={styles.arrowImg} />
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
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
                textColor="#000000"
            />
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
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
});

export default AddFarm;
