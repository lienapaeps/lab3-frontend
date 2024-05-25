import React from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image } from 'react-native';

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const CooperateSubscription = () => {

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* header */}
            <View>
                <Text style={globalStyles.headerText}>Je koos voor het Samenwerkingspakket</Text>
            </View>
            {/* abonnement informatie*/}
            <View style={styles.card}>
                <Text style={[globalStyles.bodyTextMedium]}>Help mee, oogst samen en geniet van lokale voedselproductie!</Text>
                <Text style={[globalStyles.bodyText]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae justo tincidunt fermentum sit amet eget elit.
                    Nulla facilisi. Donec nec odio vitae justo tincidunt fermentum sit amet eget elit. Nulla facilisi.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={globalStyles.headerTextSmaller}>Kostprijs bedraagt 100 per maand</Text>
            </View>
            <View style={globalStyles.Header}>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Betalen</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
        justifyContent: 'space-around',
        gap: 15,
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: COLORS.orange,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'Quicksand_400Regular',
        letterSpacing: 0.25,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
    },
})

export default CooperateSubscription;

