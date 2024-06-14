import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchProducts } from '../../../utils/fetchHelpers';

import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';

const UpdatePackage = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);

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
    
    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={{...globalStyles.headerTextSmall, marginBottom: 5}}>Items toevoegen aan pakket</Text>
            <ScrollView style={globalStyles.productContainer}>
                <TouchableOpacity activeOpacity={1} style={{marginBottom: 40}}>
                    {products.map((product, ) => (
                            <View style={styles.product} key={product.id}>
                                <Text style={globalStyles.bodyTextSemiBold}>{product.name}</Text>
                                <TouchableOpacity style={globalStyles.productBtn} onPress={() => console.log('Add product')}>
                                    <Image source={require('../../../assets/icons/plus-orange.png')} style={{ width: 32, height: 32 }}  />
                                </TouchableOpacity>
                            </View>
                    ))}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },

});

export default UpdatePackage;