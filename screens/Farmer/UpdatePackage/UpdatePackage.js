import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchProducts, updatePackage } from '../../../utils/fetchHelpers';

import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';
import Search from '../../../components/Search';
import Button from '../../../components/Button';

const UpdatePackage = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = route.params;
    console.log('update package ID:', id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchProducts();
                setProducts(productsResponse.data.products);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const toggleSelection = (productId) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleQuantityChange = (productId, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: parsedQuantity
        }));
    };

    const handleSaveProducts = async () => {
        const allProductsHaveQuantity = selectedProducts.every(productId => quantities[productId] > 0);

        if (!allProductsHaveQuantity) {
            setError('Fout bij opslaan');
            setErrorMessage('Vul voor alle geselecteerde producten een hoeveelheid in.');
            return;
        }

        const productsToUpdate = selectedProducts.map(productId => {
            const selectedProduct = filteredProducts.find(product => product.id === productId);
            return {
                item: selectedProduct.name,
                unit: selectedProduct.unit,
                quantity: quantities[productId]
            };
        });

        console.log('Products to update:', productsToUpdate);

        try {
            const response = await updatePackage(id, productsToUpdate);
            console.log('Response from backend:', response);
            navigation.goBack();
        } catch (error) {
            setError('Fout bij opslaan');
            setErrorMessage('Er is een fout opgetreden bij het opslaan van het pakket.');
            console.error('Error saving products:', error);
        }
    };
    
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* error message */}
            {errorMessage !== '' && (
            <View style={styles.errorMessageContainer}>
                <Text style={{ ...globalStyles.errorText }}>{errorMessage}</Text>
            </View>
            )}

            <Text style={{...globalStyles.headerTextSmall, marginBottom: 5}}>Items toevoegen aan pakket</Text>
            <View style={{marginBottom: 10}}>
                <Search
                    width={true} 
                    placeholder={"Zoeken naar groenten of fruit"}
                    searchTerm={searchTerm}
                    onSearchTermChange={handleSearch}
                />
            </View>

            <ScrollView style={globalStyles.productContainer}>
                {/* Product list */}
                <TouchableOpacity activeOpacity={1} style={{ marginBottom: 40 }}>
                    {filteredProducts.map((product) => (
                        <View style={styles.product} key={product.id}>
                            <View style={styles.productInfo}>
                                <Text style={globalStyles.bodyTextSemiBold}>{product.name}</Text>
                                {/* Render minus icon if product is selected */}
                                {selectedProducts.includes(product.id) && (
                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => toggleSelection(product.id)}
                                    >
                                        <Image
                                            source={require('../../../assets/icons/minus-border.png')}
                                            style={{ width: 32, height: 32 }}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {/* Render quantity input if product is selected */}
                            {selectedProducts.includes(product.id) && (
                                <View style={styles.quantityContainer}>
                                    <TextInput
                                        style={styles.quantityInput}
                                        placeholder="Aantal"
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleQuantityChange(product.id, text)}
                                    />
                                    <Text style={globalStyles.bodyTextRegular}>{product.unit}</Text>
                                </View>
                            )}
                            {/* Render plus icon if product is not selected */}
                            {!selectedProducts.includes(product.id) && (
                                <TouchableOpacity
                                    onPress={() => toggleSelection(product.id)}
                                >
                                    <Image
                                        source={require('../../../assets/icons/plus-orange.png')}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </TouchableOpacity>
            </ScrollView>

            <Button
                filled={true} 
                title="Opslaan"
                onPress={handleSaveProducts}
                disabled={selectedProducts.length === 0}
                style={{ marginBottom: 50}}
            >
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
    productInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityInput: {
        width: 80,
        height: 45,
        borderColor: COLORS.veryLightOffBlack,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginRight: 10,
    },
    selectButton: {
        marginLeft: 10,
    },
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default UpdatePackage;