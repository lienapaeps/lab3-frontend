import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'
import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';

const Language = ({ navigation, route }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('Nederlands');

    const languageOptions = ['Nederlands', 'Français', 'English', 'Deutsch'];

    const handleLanguageSelection = (language) => {
        setSelectedLanguage(language);
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Taal</Text>
            </View>
            {languageOptions.map((language, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.languageOption, selectedLanguage === language && styles.selectedLanguageOption]}
                    onPress={() => handleLanguageSelection(language)}
                >
                    <Text style={globalStyles.bodyTextSemiBold}>{language}</Text>
                    {selectedLanguage === language && <Image style={styles.notificationImage} source={require('../../../../assets/arrow-down.png')} />}
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
}

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
    },
    selectedLanguageOption: {
        backgroundColor: COLORS.lightGreen,
    },
    notificationImage: {
        width: 25,
        height: 25,
        padding: 5,
       
    },
});

export default Language;
