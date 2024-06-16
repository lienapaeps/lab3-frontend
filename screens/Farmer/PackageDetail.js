import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { fetchPackageData, updatePackage } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import Button from '../../components/Button';

const PackageDetail = ({ navigation, route }) => {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tempPrice, setTempPrice] = useState(null);
    const [tempPickUpDate, setTempPickUpDate] = useState(null);
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

    const { id } = route.params;

    const fetchData = async () => {
        try {
            const packageDataResponse = await fetchPackageData(id);
            setPackageData(packageDataResponse.data.package);
            setTempPrice(packageDataResponse.data.package.price.toString());

            if (packageDataResponse.data.package.pickUpDate) {
                setTempPickUpDate(new Date(packageDataResponse.data.package.pickUpDate));
            } else {
                setTempPickUpDate(null);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const handlePriceChange = (text) => {
        setTempPrice(text);
    };

    const handlePickUpDateChange = (date) => {
        setTempPickUpDate(date);
        setIsDateTimePickerVisible(false);
    };

    const handleConfirmChange = async () => {
        try {
            const updatedPackageData = {
                price: parseFloat(tempPrice),
                contents: packageData.contents,
                pickUpDate: tempPickUpDate ? tempPickUpDate.toISOString() : null,
            };
    
            console.log("updated package " + updatedPackageData);

            const response = await updatePackage(id, updatedPackageData);
    
            setPackageData(response.data.package);
    
            Alert.alert('Pakket is bijgewerkt', 'Het pakket is succesvol bijgewerkt.');
        } catch (error) {
            console.error('Error bij het bijwerken van de prijs:', error);
            Alert.alert('Fout bij bijwerken', 'Er is een fout opgetreden bij het bijwerken van het pakket.');
            setTempPrice(packageData.price.toString());
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            setPackageData((prevData) => {
                const updatedContents = prevData.contents.filter(item => item._id !== productId);
                return {
                    ...prevData,
                    contents: updatedContents
                };
            });
    
            Alert.alert('Product verwijderd', 'Het product is verwijderd uit het pakket.', [{ text: 'OK' }]);
    
            const updatedPackageData = {
                ...packageData,
                contents: packageData.contents.filter(item => item._id !== productId)
            };

            const response = await updatePackage(id, updatedPackageData);
    
            setPackageData(response.data.package);
        } catch (error) {
            console.error('Error bij het verwijderen van het product:', error);
            Alert.alert('Fout bij verwijderen', 'Er is een fout opgetreden bij het verwijderen van het product.');
        }
    };

    const handleAddProducts = () => {
        navigation.navigate('UpdatePackage', { 
            id: packageData._id,
            selectedProducts: packageData.contents,
        });
    };

    if (loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="medium" color={COLORS.offBlack} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={globalStyles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={{marginTop: 60, marginBottom: 30}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={styles.backButton} source={require('../../assets/Back-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Prijs updaten */}
                    <Text style={{ ...globalStyles.headerTextMedium, marginBottom: 15 }}>Prijs pakket</Text>
                    <View style={styles.priceInputContainer}>
                        <TextInput
                            placeholder='Prijs'
                            style={styles.input}
                            value={tempPrice}
                            onChangeText={handlePriceChange}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmChange}>
                            <Text style={styles.confirmButtonText}>Opslaan</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Ophaaldatum invoer */}
                    <Text style={{...globalStyles.headerTextMedium, marginBottom: 15 }}>Ophaaldatum</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                        <TouchableOpacity style={styles.input} onPress={() => setIsDateTimePickerVisible(true)}>
                            <Text>{tempPickUpDate ? format(tempPickUpDate, 'dd-MM-yyyy') : ''}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmChange}>
                            <Text style={styles.confirmButtonText}>Opslaan</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <DateTimePicker
                        isVisible={isDateTimePickerVisible}
                        mode="date"
                        textColor="#000000"
                        onConfirm={handlePickUpDateChange}
                        onCancel={() => setIsDateTimePickerVisible(false)}
                    />

                    <Text style={{...globalStyles.headerTextMedium, marginBottom: 5 }}>Inhoud pakket</Text>
                    {packageData.contents.length === 0 ? (
                        <View style={styles.emptyStateContainer}>
                            <Text style={{...globalStyles.bodyText, marginBottom: 25 }}>Er zit nog geen inhoud in dit pakket.</Text>
                            <Button 
                                filled={true} 
                                title="Voeg producten toe" 
                                onPress={() => handleAddProducts(packageData._id)} 
                                buttonColor={COLORS.primary} 
                                style={styles.addButton}
                            />
                        </View>
                    ) : (
                        packageData.contents.map(product => (
                            <View style={styles.content} key={product._id}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 15 }}>
                                    <Text style={globalStyles.bodyTextSemiBold}>{product.item}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{...globalStyles.bodyTextSemiBold, marginRight: 5 }}>{product.quantity}</Text>
                                            <Text style={globalStyles.bodyTextRegular}>{product.unit}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleRemoveItem(product._id)}>
                                    <Image source={require('../../assets/icons/delete.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                    {packageData.contents.length > 0 && (
                        <View style={{ marginTop: 20 }}>
                            <Button 
                                filled={true} 
                                title="Inhoud wijzigen" 
                                onPress={() => handleAddProducts(packageData._id)}
                                style={{ marginBottom: 50}}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        width: 30,
        height: 30,
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
    packageName: {
        textAlign: 'center',
        marginTop: -30,
        marginBottom: 30,
        marginTop: 2
    },
    content: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        gap: 15,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
    emptyStateContainer: {
        justifyContent: 'center',
        marginTop: 15,
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
});

export default PackageDetail;