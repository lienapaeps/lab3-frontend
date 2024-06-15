import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { fetchPackagesData } from '../../../utils/fetchHelpers';

import { globalStyles } from '../../../styles/global';
import Button from '../../../components/Button';
import packages from './../Register/addFarmForm/farmPackages/packages';
import COLORS from '../../../constants/color';

const EditPackages = ({ navigation, route }) => {
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const farmId = route.params.farmId;

    // fetch packages from farm by farmId
    const fetchData = async () => {
        try {
            // Fetch packages already associated with the farm
            const packagesDataResponse = await fetchPackagesData(farmId);
            if (packagesDataResponse && packagesDataResponse.data && packagesDataResponse.data.packages) {
                setSelectedPackages(packagesDataResponse.data.packages);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const availablePackages = packages.filter(pkg => !selectedPackages.some(spkg => spkg.name === pkg.name));

    const handlePackageCardPress = (packageId) => {
        navigation.navigate('AppStackFarmer', { screen: 'PackageDetail', params: { id: packageId } });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{...globalStyles.headerTextSmall, marginBottom: 15}}>Huidig aanbod</Text>
                <ScrollView>
                    {selectedPackages.map((pkg, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePackageCardPress(pkg._id)}>
                            <View style={styles.packageContainer}>
                                <Text style={{...globalStyles.headerTextSmaller, marginLeft: 15}}>{pkg.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={{...globalStyles.headerTextSmall, marginBottom: 15}}>Aanbod uitbreiden</Text>
                <ScrollView>
                    {availablePackages.map((pkg, index) => (
                        <TouchableOpacity key={index}>
                            <View style={styles.packageContainer}>
                                <Text style={{...globalStyles.headerTextSmaller, marginLeft: 15, marginBottom: 5}}>{pkg.name}</Text>
                                <Text style={{...globalStyles.bodyTextSmall, marginBottom: 5, marginLeft: 15}}>{pkg.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
        marginTop: 50,
        marginHorizontal: 20,
    },
    form: {
        marginBottom: 20,
    },
    packages: {
        marginBottom: 10,
    },
    packageContainer: {
        flexDirection: 'column',
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
        justifyContent: 'center',
    },
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
    },
});

export default EditPackages;
