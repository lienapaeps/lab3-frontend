import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { fetchPackageData } from '../../utils/fetchHelpers';

import COLORS from '../../constants/color';
import { globalStyles } from '../../styles/global';
import Button from '../../components/Button';

const PackageDetail = ({ navigation, route }) => {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = route.params;

    const fetchData = async () => {
        try {
            const packageDataResponse = await fetchPackageData(id);
            setPackageData(packageDataResponse.data.package);
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

    const handleIncreaseQuantity = (productId) => {
        setPackageData((prevData) => ({
            ...prevData,
            contents: prevData.contents.map((product) =>
                product._id === productId
                    ? {
                        ...product,
                        quantity: product.unit === 'stuk'
                            ? product.quantity + 1
                            : product.quantity + 50,
                    }
                    : product
            ),
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setPackageData((prevData) => ({
            ...prevData,
            contents: prevData.contents.map((product) =>
                product._id === productId && product.quantity > (product.unit === 'stuk' ? 1 : 50)
                    ? {
                        ...product,
                        quantity: product.unit === 'stuk'
                            ? product.quantity - 1
                            : product.quantity - 50,
                    }
                    : product
            ),
        }));
    };

    const isMinusInactive = (product) => {
        if (product.unit === 'stuk') {
            return product.quantity === 1;
        } else {
            return product.quantity === 50;
        }
    };

    const handlePriceChange = (newPrice) => {
        setPackageData((prevData) => ({
            ...prevData,
            price: newPrice,
        }));
    };

    const handleRemoveItem = (productId) => {
        setPackageData((prevData) => ({
            ...prevData,
            contents: prevData.contents.filter(item => item._id !== productId)
        }));
    };

    const handleAddProducts = () => {
        navigation.navigate('UpdatePackage', { 
            id: packageData._id,
            selectedProducts: packageData.contents.map(product => product.id)
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
                    
                    <Text style={{...globalStyles.headerTextMedium, marginBottom: 15 }}>Prijs pakket</Text>
                    <TextInput 
                        placeholder='Prijs' 
                        style={styles.input} 
                        value={packageData.price.toString()} 
                        onChangeText={handlePriceChange} 
                        keyboardType="numeric"
                    />
                    
                    <Text style={{...globalStyles.headerTextMedium, marginBottom: 5 }}>Inhoud pakket</Text>
                    {packageData.contents.length === 0 ? (
                        <View style={styles.emptyStateContainer}>
                            {/* <Image source={require('../../assets/icons/empty.png')} style={styles.emptyStateImage} /> */}
                            <Text style={globalStyles.bodyTextRegular}>Er zit nog geen inhoud in dit pakket.</Text>
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
                                        <TouchableOpacity
                                            onPress={() => handleDecreaseQuantity(product._id)}
                                            disabled={isMinusInactive(product)}
                                        >
                                            <Image
                                                source={isMinusInactive(product)
                                                    ? require('../../assets/icons/minus-inactive.png')
                                                    : require('../../assets/icons/minus.png')}
                                                style={{ width: 30, height: 30, marginRight: 6 }}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 8 }}>
                                            <Text style={globalStyles.bodyTextSemiBold}>{product.quantity}</Text>
                                            <Text style={globalStyles.bodyTextRegular}>{product.unit}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleIncreaseQuantity(product._id)}>
                                            <Image source={require('../../assets/icons/plus.png')} style={{ width: 30, height: 30, marginLeft: 6 }} />
                                        </TouchableOpacity>
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
                            <TouchableOpacity style={styles.add} onPress={() => handleAddProducts(packageData._id)}>
                                <Image source={require('../../assets/icons/plus-border.png')} style={{ width: 48, height: 48 }} />
                            </TouchableOpacity>
                            <Button 
                                filled={true} 
                                title="Opslaan" 
                                onPress={() => console.log('Button Pressed')} 
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
        padding: 18,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20
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
    addButton: {
        marginTop: 25,
    },
    add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }
});

export default PackageDetail;