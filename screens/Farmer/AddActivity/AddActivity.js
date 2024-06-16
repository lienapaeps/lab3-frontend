import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

import { uploadToCloudinary } from '../../../utils/uploadHelpers';

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
    const activityCategories = ['workshop'];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
    const [fields, setFields] = useState({
        start: null,
        end: null,
    });

    const [selectedField, setSelectedField] = useState(null);

    const handlePickDateTime = (field) => {
        setIsDateTimePickerVisible(true);
        setSelectedField(field); 
    };

    const handleDateTimePicked = (date) => {
        const formattedDate = format(date, 'dd-MM-yyyy');
        const formattedTime = format(date, 'HH:mm');
    
        const updatedStart = selectedField === 'start' ? { date: formattedDate, time: formattedTime } : { ...activityData.start };
        const updatedEnd = selectedField === 'end' ? { date: formattedDate, time: formattedTime } : { ...activityData.end };
    
        setActivityData(prevData => ({
            ...prevData,
            start: updatedStart,
            end: updatedEnd,
        }));
    
        setFields(prevFields => ({
            ...prevFields,
            [selectedField]: date,
        }));
    
        setIsDateTimePickerVisible(false);
    };

    const [activityData, setActivityData] = useState({
        title: '',
        category: '',
        start: {
            date: '',
            time: '',
        },
        end: {
            date: '',
            time: '',
        },
        description: '',
        image: '',
        farm: farmId,
    });

    const handleSelectCategory = (selectedItem, index) => {
        setSelectedCategory(selectedItem);
        handleChange('category', selectedItem);
    };

    const renderDropdownButton = (selectedItem, isOpened) => {
        return (
            <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem) || 'Selecteer categorie'}
                </Text>
                <Image source={require('../../../assets/arrow-down.png')} style={styles.dropdownButtonArrowStyle} />
            </View>
        );
    };

    const renderDropdownItem = (item, index, isSelected) => {
        return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#E4D9D5' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
        );
    };

    const handleChange = (field, value) => {
        setActivityData({
            ...activityData,
            [field]: value,
        });
    };
    
    const handleImageSelected = async (uri) => {
        setIsLoadingImage(true);
        try {
            const imageUrl = await uploadToCloudinary(uri); 
            setSelectedImageUri(imageUrl);
            console.log('Image URL:', imageUrl); // Voeg deze regel toe voor debuggen
            setIsLoadingImage(false);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            setErrorMessage('Er is iets misgegaan bij het uploaden van de afbeelding.');
            setIsLoadingImage(false);
        }
    };

    const nextStep = async () => {
        const isValid = await validateStep();
    
        if (isValid) {
            setErrorMessage('');
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const validateStep = () => {
        switch (currentStep) {
            case 0:
                return validateStep1();
            case 1:
                return validateStep2();
            default:
                return true;
        }
    };

    const validateStep1 = () => {
        if (activityData.title === '' || activityData.category === '' || activityData.start.date === '' || activityData.start.time === '' || activityData.end.date === '' || activityData.end.time === '') {
            setErrorMessage('Vul alle verplichte velden in.');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (activityData.description === '' || selectedImageUri === '') {
            setErrorMessage('Vul alle verplichte velden in.');
            return false;
        }
        return true;
    };

    const submitForm = async () => {
        setIsProcessing(true);
        try {

            const formattedData = {
                ...activityData,
                image: selectedImageUri,
                start: {
                    date: new Date(activityData.start.date), // Zorg ervoor dat dit een Date object is
                    time: activityData.start.time
                },
                end: {
                    date: new Date(activityData.end.date), // Zorg ervoor dat dit een Date object is
                    time: activityData.end.time
                }
            };

            console.log('Submitting form with data:', formattedData);

            const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            const json = await response.json();

            if (json.status === 'success') {
                console.log('Activity added successfully:', json);
                setSuccessfullyAdded(true);
                // navigation.navigate('AppStackFarmer', { screen: 'CalendarFarmer',});
                navigation.goBack();
            } else {
                setErrorMessage(json.message);
            }

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
                                <InputField
                                    label="Naam activiteit*"
                                    placeholder="Naam activiteit"
                                    value={activityData.title}
                                    onChangeText={(text) => handleChange('title', text)}
                                />

                                <Text style={styles.label}>Categorie*</Text>
                                <SelectDropdown
                                    data={activityCategories}
                                    onSelect={handleSelectCategory}
                                    renderButton={renderDropdownButton}
                                    renderItem={renderDropdownItem}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />                       
                                
                                {/* Begin datum en tijd */}
                                <Text style={styles.label}>Begin*</Text>
                                <TouchableOpacity style={styles.input} onPress={() => handlePickDateTime('start')}>
                                    <Text>
                                        {fields.start ? `${format(fields.start, 'dd-MM-yyyy HH:mm')}` : 'Selecteer begindatum en tijd'}
                                    </Text>
                                </TouchableOpacity>

                                {/* Eind datum en tijd */}
                                <Text style={styles.label}>Einde*</Text>
                                <TouchableOpacity style={styles.input} onPress={() => handlePickDateTime('end')}>
                                    <Text>
                                        {fields.end ? `${format(fields.end, 'dd-MM-yyyy HH:mm')}` : 'Selecteer einddatum en tijd'}
                                    </Text>
                                </TouchableOpacity>

                                <DateTimePicker
                                    isVisible={isDateTimePickerVisible}
                                    mode="datetime"
                                    onConfirm={handleDateTimePicked}
                                    onCancel={() => setIsDateTimePickerVisible(false)}
                                    textColor='#000000'
                                />

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
                                <ImageUpload
                                    title="een afbeelding"
                                    onImageSelected={handleImageSelected}
                                />
                                <InputField
                                    multiline={true}
                                    label="Beschrijving*"
                                    placeholder="Beschrijving"
                                    value={activityData.description}
                                    onChangeText={(text) => handleChange('description', text)}
                                />
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
                            <View style={{marginBottom: 25}}>
                                {isLoadingImage ? (
                                    <Text style={globalStyles.bodyText}>Afbeelding wordt geladen ...</Text>
                                ) : selectedImageUri ? (
                                    <Image
                                        source={{ uri: selectedImageUri }}
                                        style={{ width: '100%', height: 160, marginBottom: 10, borderRadius: 10}}
                                    />
                                ) : (
                                    <Text style={globalStyles.bodyText}>Geen afbeelding geselecteerd</Text>
                                )}

                                {/* Naam en categorie */}
                                <Text style={{...globalStyles.headerTextSmall, ...globalStyles.capitalize, marginBottom: 10}}>{activityData.category}: {activityData.title}</Text>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10, gap: 10}}>
                                    {/* Datum en tijd */}
                                    <View style={{flexDirection: 'row', marginBottom: 10, gap: 10}}>
                                        <Image source={require('../../../assets/icons/date-black.png')} style={{width: 20, height: 22}} />
                                        <Text style={globalStyles.bodyText}>
                                            {activityData.start.date}
                                        </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', marginBottom: 10, gap: 10}}>
                                        <Image source={require('../../../assets/icons/clock-black.png')} style={{width: 20, height: 20}} />
                                        <Text style={globalStyles.bodyText}>
                                            {activityData.start.time} - {activityData.end.time}
                                        </Text>
                                    </View>
                                </View>

                                {/* Beschrijving */}
                                <Text style={globalStyles.headerTextSmaller}>Beschrijving</Text>
                                <Text style={globalStyles.bodyText}>{activityData.description}</Text>
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
    dropdownButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 18,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        color: COLORS.offBlack,
        textTransform: 'capitalize',
    },
    dropdownButtonArrowStyle: {
        width: 20,
        height: 20,
        tintColor: COLORS.offBlack,
        marginRight: 10,
    },
    dropdownItemStyle: {
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
    },
    dropdownItemTxtStyle: {
        fontSize: 16,
        color: COLORS.offBlack,
        textTransform: 'capitalize',
    },
    dropdownMenuStyle: {
        marginTop: 2,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
        borderRadius: 10,
        width: '90%',
        maxHeight: 200,
    },
});

export default AddActivity;
