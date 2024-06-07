import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { globalStyles } from '../../../../styles/global';
import Button from '../../../../components/Button';
import packages from './farmPackages/packages';
import COLORS from '../../../../constants/color';

const AddPackages = ({ navigation, route }) => {
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [packagePrices, setPackagePrices] = useState({});
    const [isPackageSelected, setIsPackageSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { farmId } = route.params.params;

    const handlePackageSelection = (index) => {
        if (selectedPackages.includes(index)) {
            setSelectedPackages(selectedPackages.filter(item => item !== index));
        } else {
            setSelectedPackages([...selectedPackages, index]);
        }
        setIsPackageSelected(selectedPackages.length > 0);
    };

    const handlePriceChange = (index, price) => {
        setPackagePrices({ ...packagePrices, [index]: price });
    };

    const handleSumbit = async () => {

        if (selectedPackages.length === 0) {
            setErrorMessage('Selecteer minstens één pakket.');
            return;
        }

        for (const index of selectedPackages) {
            if (!packagePrices[index]) {
                setErrorMessage('Vul de prijs in voor elk geselecteerd pakket.');
                return;
            }
        }

        setErrorMessage('');

        const packagesToSubmit = selectedPackages.map(index => ({
            name: packages[index].name,
            description: packages[index].description,
            price: parseFloat(packagePrices[index]),
            farm: farmId, 
        }));

        // console.log(packagesToSubmit);

        try {
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/packages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    packages: packagesToSubmit
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Pakketten succesvol toegevoegd');
                // Navigatie of andere acties hier
                navigation.navigate('AppFarmer', { screen: 'HomeFarmer' });
            } else {
                Alert.alert('Error', data.message || 'Er is iets misgegaan');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Er is iets misgegaan');
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* title */}
                <View style={styles.form}>
                    <Text style={{...globalStyles.headerText, marginBottom: 5}}>Pakketten toevoegen</Text>
                    <Text style={globalStyles.bodyTextMedium}>Welke diensten wilt u bieden aan uw klanten?</Text>
                </View>
                {/* foutmelding */}
                {errorMessage !== '' && (
                <View style={styles.errorMessageContainer}>
                    <Text style={globalStyles.errorText}>{errorMessage}</Text>
                </View>
                )}
                {/* input fields */}
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.packages}>
                        {packages.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePackageSelection(index)}>
                            <View style={styles.packageContainer}>
                                <View>
                                    <CheckBox
                                        checked={selectedPackages.includes(index)}
                                        onPress={() => handlePackageSelection(index)}
                                        containerStyle={styles.checkBoxContainer}
                                        checkedColor={COLORS.orange}  // Change the checked color
                                        uncheckedColor={COLORS.veryLightOffBlack}
                                    />
                                </View>
                                <View style={styles.packageInfo}>
                                    <Text style={{ ...globalStyles.headerTextSmaller, marginBottom: 5 }}>{item.name}</Text>
                                    <Text style={globalStyles.bodyText}>{item.description}</Text>
                                    {selectedPackages.includes(index) && (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Prijs"
                                            keyboardType="numeric"
                                            value={packagePrices[index] || ''}
                                            onChangeText={(price) => handlePriceChange(index, price)}
                                        />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                    </View>
                    {/* buttons */}
                    <View>
                        <Button title="Toevoegen" onPress={handleSumbit} filled />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
        marginTop: 10,
    },
    form: {
        marginBottom: 20,
    },
    packages: {
        marginBottom: 10,
    },
    packageContainer: {
        flexDirection: 'row',
        paddingVertical: 30,
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
    errorMessageContainer: {
        marginBottom: 20,
    },
    checkBoxContainer: {
        padding: 0,
        margin: 0,
        marginLeft: 15,
    },
    input: {
        marginTop: 20,
        marginRight: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
    },
});

export default AddPackages;
