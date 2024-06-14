import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'


import { globalStyles } from '../../../styles/global';
import COLORS from '../../../constants/color';


const MySubscription = ({ navigation, route }) => {

    const subscriptionData = route.params.subscriptionData;
   
// navigate to package details screen og home screen?
    const goToHome = () => {
        navigation.navigate('App', { screen: 'HomeUser' });
    }
// navigate to package searching screen
    const goToFarm = () => {
        navigation.navigate('App', { screen: 'FarmUser' });
    };   

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* weergave van huidig pakket */}
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Mijn abonnement</Text>
            </View>
            {/* update account information */}
            <Text style={globalStyles.headerTextSmallerRegular}>Overzicht abonnement</Text>
            {subscriptionData ? (
                // if there is a package show this
                <View style={styles.container}>
                    <View style={styles.packageCard}>
                        <Image style={styles.packageImage} source={{ uri: subscriptionData.farm.farmImage }} />
                        <View style={styles.packageLabel}>
                            <Text style={globalStyles.bodyTextSemiBold}>{subscriptionData.package.name}</Text>
                            <Text style={globalStyles.bodyTextSmall}>{subscriptionData.farm.name}</Text>
                        </View>
                    </View>
                    <View style={styles.packageContent}>
                        <Text style={globalStyles.headerTextSmallerMedium}>Abbonement omvat</Text>
                        <View style={styles.packageItem}>
                            <Image style={styles.icon} source={require('../../../assets/arrow-down.png')} />
                            <Text style={globalStyles.bodyTextSmall}>{subscriptionData.farm.name}</Text>
                        </View>
                        <View style={styles.packageItem}>
                            <Image style={styles.icon} source={require('../../../assets/arrow-down.png')} />
                            <Text style={globalStyles.bodyTextSmall}>{subscriptionData.farm.name}</Text>
                        </View>
                        <View style={styles.packageItem}>
                            <Image style={styles.icon} source={require('../../../assets/arrow-down.png')} />
                            <Text style={globalStyles.bodyTextSmall}>{subscriptionData.farm.name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={goToHome}>
                        <Text style={{ ...globalStyles.buttonText, color: COLORS.white }}>Bekijk mijn pakket</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // if there is no package show this
                <View style={styles.packageEmpty}>
                    <Image style={styles.iconImage} source={require('../../../assets/icons/package-empty.png')} />
                    <Text style={{ ...globalStyles.bodyText, ...styles.emptyText }}>Je hebt nog geen pakketten, zoek een boerderij om een pakket te vinden.</Text>
                    <TouchableOpacity style={styles.button } onPress={goToFarm}>
                        <Text style={{ ...globalStyles.buttonText, color: COLORS.white }}>Zoek Boerderij</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
    },
    packageEmpty: {
        paddingVertical: 40,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    packageCard: {
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 20,
    },
    packageContent: {
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'column',
        backgroundColor: COLORS.white,
    },
    packageImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    packageItem: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
     
    },
    packageLabel: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    icon
        : {
        width: 20,
        height: 20,
        marginRight: 20,
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.green,
       
    },
});

export default MySubscription;
