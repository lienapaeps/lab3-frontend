import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const FarmCard = (props) => {
    const handlePress = () => {
        props.onPress(props.farmData);
    }
    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <View>
                <Image style={styles.cardImage} source={{uri: props.farmData.image }} />
            </View>
            <View>
                <View style={styles.header}>
                    <Text style={globalStyles.headerTextSmaller}>{props.farmData.title}</Text>
                    <Text style={globalStyles.bodyText}>{props.farmData.adres}</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Image source={require('../assets/icons/star.png')} />
                        <Text style={{...globalStyles.bodyText, ...styles.label}}>{props.farmData.rating}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Image source={require('../assets/icons/locatie.png')} />
                        <Text style={{...globalStyles.bodyText, ...styles.label, ... {color:COLORS.orange}}}>{props.farmData.kilometer}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Image source={require('../assets/icons/clock.png')} />
                        <Text style={{...globalStyles.bodyText, ...styles.label, ... {color:COLORS.green}}}>{props.farmData.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 150,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 15,
        alignItems: 'center',
    },
    cardImage: {
        borderRadius: 8,
        width: 100,
        height: 100,
    },
    header: {
        marginLeft: 15,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Quicksand_500Medium',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        marginLeft: 15,
        marginTop: 10,
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    }
})

export default FarmCard;