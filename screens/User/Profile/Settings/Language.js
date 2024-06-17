import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';

const Language = ({ navigation, route }) => {
    const [showMessage, setShowMessage] = useState(false);

    const handleInfoIconClick = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 4000);
    };

    return (
        <SafeAreaView style={{...globalStyles.container, marginHorizontal: 20}}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Taal</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.languageOption}>
                    <Image style={styles.notificationImage} source={require('../../../../assets/icons/dutch.png')} />
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.offBlack}}>Nederlands</Text>
                    <Image style={{...styles.notificationImage, marginLeft: 'auto'}} source={require('../../../../assets/icons/check-mark.png')} />
                </View>
                <View style={styles.languageOption}>
                    <Image style={styles.notificationImage} source={require('../../../../assets/icons/french.png')} />
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.lightOffBlack}} >Français</Text>
                </View>
                <View style={styles.languageOption}>
                    <Image style={styles.notificationImage} source={require('../../../../assets/icons/english-uk.png')} />
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.lightOffBlack}} >English</Text>
                </View>
                {showMessage && (
                    <View style={styles.languageOption}>
                        <Text style={globalStyles.bodyTextRegular} >De keuze voor volgende taal optie is spijtig genoeg niet beschikbaar in de huidige versie van de app. Onze excuses voor het ongemak. </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
    },
    content: {
        alignItems: 'flex-start'
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    selectedLanguageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    notificationImage: {
        width: 32,
        height: 32,
    },
});

export default Language;
