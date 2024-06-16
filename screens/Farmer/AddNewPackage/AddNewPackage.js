import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native'

import { globalStyles } from '../../../styles/global'
import COLORS from '../../../constants/color'

import packages from '../Register/addFarmForm/farmPackages/packages'
import { set } from 'date-fns'

const AddNewPackage = ({ navigation, route }) => {
    const { packageName, farmId } = route.params;
    const [selectedPackage, setSelectedPackage] = useState(packages.filter(pkg => pkg.name === packageName));
    const [price, setPrice] = useState('');

    const handlePriceChange = (price) => {
        setPrice(price);
    }

    const handleSubmit = async () => {
        if (!price) {
            Alert.alert('Vul een prijs in');
            return;
        }

        const packageToSubmit = {
            name: selectedPackage[0].name,
            description: selectedPackage[0].description,
            price: parseFloat(price),
            farm: farmId,
        }

        console.log(packageToSubmit);

        try {
            const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/packages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    packages: [packageToSubmit]
                })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Pakket toegevoegd');
                navigation.navigate('AppFarmer', { screen: 'FarmFarmer' });
            } else {
                Alert.alert('Error', data.message || 'Er is iets misgegaan');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Er is iets misgegaan', 'Probeer het later opnieuw');
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={{...globalStyles.headerTextSmall, textAlign: 'center'}}>Voeg een nieuw pakket toe</Text>
            </View>
            <Text style={{ ...globalStyles.headerTextMedium, marginBottom: 15 }}>Geselecteerde pakket</Text>
            <View style={styles.packageContainer}>
                <Text style={{...globalStyles.headerTextSmaller, marginTop: 10}}>{selectedPackage[0].name}</Text>
                <Text style={{...globalStyles.bodyText, marginTop: 10, marginBottom: 10}}>{selectedPackage[0].description}</Text>
            </View>

            <Text style={{ ...globalStyles.headerTextMedium, marginBottom: 15 }}>Prijs pakket</Text>
            <View style={styles.priceInputContainer}>
                <TextInput
                    placeholder='Prijs'
                    style={styles.input}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={handlePriceChange}
                />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                <Text style={styles.confirmButtonText}>Voeg pakket toe</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 2,
        marginBottom: 30,
    },
    packageContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    priceInput: {
        padding: 18,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: COLORS.green,
        padding: 18,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
    input: {
        flex: 1,
        padding: 18,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        marginRight: 15
    },
});

export default AddNewPackage;