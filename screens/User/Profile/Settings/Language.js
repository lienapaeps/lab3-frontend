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
                <View style={styles.selectedLanguageOption}>
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.offBlack}}>Nederlands</Text>
                    <Image style={styles.notificationImage} source={require('../../../../assets/arrow-down.png')} />
                </View>
                <View style={styles.languageOption}>
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.lightOffBlack}} >Français</Text>
                    <TouchableOpacity onPress={handleInfoIconClick}>
                        <Image style={styles.notificationImage} source={require('../../../../assets/InformationIcon.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.languageOption}>
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.lightOffBlack}} >English</Text>
                    <TouchableOpacity onPress={handleInfoIconClick}>
                        <Image style={styles.notificationImage} source={require('../../../../assets/InformationIcon.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.languageOption}>
                    <Text style={{...globalStyles.headerTextSmallerMedium, color: COLORS.lightOffBlack}} >Deutsch</Text>
                    <TouchableOpacity onPress={handleInfoIconClick}>
                        <Image style={styles.notificationImage} source={require('../../../../assets/InformationIcon.png')} />
                    </TouchableOpacity>
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
    languageOption: {
 
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        //content aligns to center
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

        width: 20,
        height: 20,


    },
});

export default Language;
