import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Touch, FlatList} from 'react-native'
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const Pakket = ({ item }) => {
    const [pakketData, setPakketData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPakketData = async () => {
            try {
                const data = await fetchPakketData(item);
                setPakketData(data.data);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPakketData();
    }, [item]);

    return (
        <View>
            <TouchableOpacity activeOpacity={1} style={styles.flex}>
            <View style={[styles.flex, styles.card]}>
                <Image style={styles.profileImage} source={require('../assets/InformationIcon.png')} />
                <Text style={globalStyles.headerTextMedium}>{item.name}</Text>
                <Text style={globalStyles.bodyText}>{item.description}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: '100%',
        overflow: 'visible',
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: 20,
        padding: 20,
        borderRadius: 8,
        shadowColor: COLORS.lightOffBlack,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        overflow: 'visible',
    },
    message: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    profileImage: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
});

export default Pakket;