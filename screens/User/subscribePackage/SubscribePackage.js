import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { fetchPackagesData, getUserIdAndToken } from '../../../utils/fetchHelpers';

import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';
import Button from '../../../components/Button';
import paymentMethods from './paymentMethods';

const SubscribePackage = ({ navigation, route }) => {

    const { farmId, farmName } = route.params;
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const totalSteps = 3;
    const [currentStep, setCurrentStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPackagesData(farmId);
                setPackages(response.data.packages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // sla user id op in state
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const { userId } = await getUserIdAndToken();
                setUserId(userId);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserId();
    }, []);

    const selectPackage = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handlePackageSelection = (pkg) => {
        if (pkg === selectedPackage) {
            setSelectedPackage(null);
        } else {
            setSelectedPackage(pkg);
        }
    };

    const selectPayment = (payment) => {
        setSelectedPayment(payment);
    };

    const handlePaymentSelection = (payment) => {
        if (payment === selectedPayment) {
            setSelectedPayment(null);
        } else {
        setSelectedPayment(payment);
        }
    };

    const handleSubmit = async () => {
        if (selectedPackage && selectedPayment && userId) {
            setIsProcessingPayment(true);
    
            try {
                setTimeout(async () => {
                    try {
                        const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/subscription/subscribe', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userId: userId,
                                packageId: selectedPackage._id,
                            }),
                        });
    
                        const data = await response.json();
                        console.log(data);
    
                        if (response.ok) {
                            console.log('Subscription successfull');
                            setPaymentSuccess(true);
                        } else {
                            setErrorMessage(data.message);
                        }
                    } catch (error) {
                        console.log(error);
                        setErrorMessage('Er is iets misgegaan');
                    } finally {
                        setIsProcessingPayment(false);
                    }
                }, 3000);
            } catch (error) {
                console.log(error);
                setErrorMessage('Er is iets misgegaan');
                setIsProcessingPayment(false);
            }
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

    const validateStep = () => {
        switch (currentStep) {
            case 0:
                return validateStep1();
            case 1:
                return validateStep2();
            case 2:
                return true;
            default:
                return true;
        }
    };

    const validateStep1 = () => {
        if (!selectedPackage || selectedPackage === null ) {
            setErrorMessage('Selecteer een pakket');
            return false;
        }
        return true;
    }

    const validateStep2 = () => {
        if (!selectedPayment || selectedPayment === null) {
            setErrorMessage('Selecteer een betaalmethode');
            return false;
        }
        return true;
    }

    // Functie om de huidige stapinhoud te renderen
    const renderStep = () => {
        if (isProcessingPayment) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.offBlack} />
                    <Text style={{ marginTop: 15, ...globalStyles.bodyText}}>Bezig met verwerken van betaling...</Text>
                </View>
            );
        } else {
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
                            {/* select package */}
                            <View style={styles.form}>
                                <Text style={{...globalStyles.headerText, marginBottom: 15}}>Kies een pakket dat bij je past</Text>
                                {packages.map(pkg => (
                                    <TouchableOpacity key={pkg._id} onPress={() => selectPackage(pkg)}>
                                        <View style={styles.packageContainer}>
                                            <View>
                                                <CheckBox
                                                    checked={pkg === selectedPackage} 
                                                    onPress={() => handlePackageSelection(pkg)}
                                                    containerStyle={styles.checkBoxContainer}
                                                    checkedColor={COLORS.orange}
                                                    uncheckedColor={COLORS.veryLightOffBlack}
                                                />
                                            </View>
                                            <View style={styles.packageInfo}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
                                                    <Text style={{ ...globalStyles.headerTextMedium, marginBottom: 5 }}>{pkg.name}</Text>
                                                    <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.orange, marginBottom: 5 }}>€{pkg.price}/jaar</Text>
                                                </View>
                                                <View>
                                                    <Text style={globalStyles.bodyText}>{pkg.description}</Text> 
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
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
                            {/* payment */}
                            <View style={styles.form}>
                                <Text style={{...globalStyles.headerText, marginBottom: 15}}>Kies hoe je wilt betalen</Text>
                                {/* // payment options */}
                                <View style={{ marginBottom: 15 }}>
                                    {paymentMethods.map((payment, index) => (
                                        <TouchableOpacity key={index} onPress={() => selectPayment(payment)} style={styles.payContainer}>
                                            <View>
                                                <CheckBox
                                                    checked={payment === selectedPayment} 
                                                    onPress={() => handlePaymentSelection(payment)}
                                                    containerStyle={styles.checkBoxContainer}
                                                    checkedColor={COLORS.orange}
                                                    uncheckedColor={COLORS.veryLightOffBlack}
                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={payment.image} style={{ width: 34, height: 24, marginRight: 15 }} />
                                                <Text style={globalStyles.bodyText}>{payment.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    );
                case 2:
                    return (
                        <View style={styles.stepContainer}>
                            <Text style={{...globalStyles.headerText, marginBottom: 15}}>Overzicht</Text>
                            <View>
                                {/* pakket overzicht */}
                                <Text style={{...globalStyles.bodyText, marginBottom: 15 }}>Je hebt gekozen voor:</Text>
                                <View style={styles.packageBox}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
                                        <Text style={{ ...globalStyles.headerTextMedium, marginBottom: 5 }}>{selectedPackage.name}</Text>
                                        <Text style={{ ...globalStyles.bodyTextSemiBold, color: COLORS.orange, marginBottom: 5 }}>€{selectedPackage.price}/jaar</Text>
                                    </View>
                                    <View>
                                        <Text style={globalStyles.bodyText}>{selectedPackage.description}</Text> 
                                        <Text style={{...globalStyles.bodyTextSemiBold, marginTop: 15 }}>Bij boerderij: {farmName}</Text>
                                    </View>
                                </View>

                                {/* betaalmethode overzicht */}    
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={{...globalStyles.bodyText, marginBottom: 15 }}>Betaalmethode:</Text>
                                    <View style={styles.payContainer}>
                                        <Image source={selectedPayment.image} style={{ width: 34, height: 24, marginRight: 15, marginLeft: 15 }} />
                                        <Text style={globalStyles.bodyText}>{selectedPayment.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* terug knop naar vorige stap */}
            {!isProcessingPayment && currentStep > 0 && !paymentSuccess &&  (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.left} onPress={prevStep}>
                        <Image source={require('../../../assets/Back-arrow.png')} style={styles.arrowImg} />
                    </TouchableOpacity>
                    <Text style={{ ...globalStyles.bodyText, marginTop: 15, marginRight: 20 }}>Stap {currentStep + 1} van de {totalSteps}</Text>
                </View>
            )}          

            {/* Huidige stap inhoud */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <View style={styles.formContainer}>
                    {paymentSuccess ? (
                    <View style={{...globalStyles.container, justifyContent: 'center', gap: 60 }}>
                        <View>
                            <Image source={require('../../../assets/success.png')} style={{ width: 140, height: 140, alignSelf: 'center', marginBottom: 60 }} />
                            <Text style={{...globalStyles.headerText, alignSelf: 'center'}}>Betaling succesvol!</Text>
                            <Text style={{...globalStyles.bodyText, marginTop: 5, alignSelf: 'center' }}>Welkom bij boerderij {farmName}</Text>
                        </View>
                        <View>
                            <Button title="Ga terug naar boerderij" onPress={() => navigation.navigate('App', {screen: 'HomeUser', params: { reload: true}})} filled />
                        </View>
                    </View>
                ) : (
                    <>
                        {renderStep()}

                        {/* Knoppen voor navigatie */}
                        {!paymentSuccess && !isProcessingPayment && (
                            <View>
                                {currentStep < totalSteps - 1 ? (
                                    <Button title="Volgende" onPress={nextStep} filled />

                                ) : (
                                    <Button title="Betalen" filled onPress={handleSubmit} />
                                )}
                            </View>
                        )}
                    </>
                )}
                </View>
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
    packageContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        marginBottom: 20,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
    },
    packageInfo: {
        flex: 1,
        marginLeft: 5,
    },
    packageBox: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
    },
    checkBoxContainer: {
        padding: 0,
        margin: 0,
        marginLeft: 15,
    },
    payContainer: {
        paddingVertical: 20,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderColor: COLORS.veryLightOffBlack,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default SubscribePackage;
