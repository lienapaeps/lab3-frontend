import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchProducts, updatePackage } from '../../../utils/fetchHelpers';

import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';
import Search from '../../../components/Search';
import Button from '../../../components/Button';

const UpdatePackage = ({ navigation, route }) => {
    const { id, selectedProducts: initialSelectedProducts } = route.params;

    // console.log('Initial selected products:', initialSelectedProducts)

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const scrollViewRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchProducts();
                setProducts(productsResponse.data.products);

                const selectedProductNames = initialSelectedProducts.map(product => product.item);
                setSelectedProducts(selectedProductNames);

                const initialQuantities = {};
                initialSelectedProducts.forEach(product => {
                    initialQuantities[product.item] = product.quantity;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [initialSelectedProducts]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const toggleSelection = (productName) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(productName)) {
                const updatedSelected = prevSelected.filter(name => name !== productName);
                const updatedQuantities = { ...quantities };
                delete updatedQuantities[productName]; 
                setQuantities(updatedQuantities);
                return updatedSelected;
            } else {
                return [...prevSelected, productName];
            }
        });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleQuantityChange = (productName, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productName]: parsedQuantity
        }));
    };

    const handleSaveProducts = async () => {
        const allProductsHaveQuantity = selectedProducts.every(productName => quantities[productName] > 0);

        if (!allProductsHaveQuantity) {
            setError('Fout bij opslaan');
            setErrorMessage('Vul voor alle geselecteerde producten een hoeveelheid in.');
            return;
        }

        const productsToUpdate = selectedProducts.map(productName => {
            const selectedProduct = filteredProducts.find(product => product.name === productName);
            return {
                item: selectedProduct.name,
                unit: selectedProduct.unit,
                quantity: quantities[productName]
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

    const handleAddProduct = (productName) => {
        toggleSelection(productName);
        scrollToListTop();
    };

    const scrollToListTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
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

            <ScrollView ref={scrollViewRef} style={globalStyles.productContainer}>
                {/* Product list */}
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.productList}>
                        {/* Render geselecteerde producten eerst */}
                        {selectedProducts.map(productName => {
                            const product = filteredProducts.find(p => p.name === productName);
                            return (
                                <View style={styles.product} key={product.id}>
                                    <Text style={globalStyles.bodyTextSemiBold}>{product.name}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TextInput
                                            style={styles.quantityInput}
                                            placeholder="Aantal"
                                            keyboardType="numeric"
                                            value={quantities[productName] ? quantities[productName].toString() : ''}
                                            onChangeText={(text) => handleQuantityChange(productName, text)}
                                        />
                                        <Text style={globalStyles.bodyTextRegular}>{product.unit}</Text>
                                    </View>
                                    <View style={styles.minusContainer}>
                                        <TouchableOpacity
                                            style={styles.selectButton}
                                            onPress={() => toggleSelection(productName)}
                                        >
                                            <Image
                                                source={require('../../../assets/icons/minus-border.png')}
                                                style={styles.minusIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}

                        {/* Render andere producten daarna */}
                        {filteredProducts.map((product) => {
                            if (!selectedProducts.includes(product.name)) {
                                return (
                                    <View style={{...styles.product, justifyContent: 'space-between'}} key={product.id}>
                                        <Text style={globalStyles.bodyTextSemiBold}>{product.name}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleAddProduct(product.name)}
                                        >
                                            <Image
                                                source={require('../../../assets/icons/plus-orange.png')}
                                                style={styles.plusIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                            return null;
                        })}
                    </View>
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
        justifyContent: 'flex-start',
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
        marginLeft: 'auto',
        marginRight: 15,
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
    minusIcon: {
        width: 32,
        height: 32,
        tintColor: COLORS.lightOffBlack,
    },
    plusIcon: {
        width: 32,
        height: 32,
    },
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default UpdatePackage;