import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native'

import COLORS from '../../../constants/color';
import { globalStyles } from '../../../styles/global';

const Faq = ({ navigation, route }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    const questionClicked = (index) => {
        if (index === selectedQuestionIndex) {
            setSelectedQuestionIndex(null);
        } else {
            setSelectedQuestionIndex(index);
        }
    }

    useEffect(() => {
        const fetchedQuestions = [
            {
                title: 'Hoe maak ik een account aan?',
                answer: 'Om een account aan te maken, klik op de "Aanmelden" knop op de startpagina en vul de vereiste informatie in.'
            },
            {
                title: 'Hoe log ik in?',
                answer: 'Om in te loggen, klik op de "Inloggen" knop op de startpagina en voer je e-mail en wachtwoord in.'
            },
            {
                title: 'Hoe reset ik mijn wachtwoord?',
                answer: 'Om je wachtwoord te resetten, klik op de "Wachtwoord vergeten" link op de inlogpagina en volg de instructies.'
            },
            {
                title: 'Hoe update ik mijn accountinformatie?',
                answer: 'Om je accountinformatie bij te werken, ga naar de "Mijn Account" sectie en klik op de informatie die je wilt bijwerken.'
            },
            {
                title: 'Hoe abbonneer ik op een abbonement?',
                answer: 'Om je te abonneren op een abonnement, ga naar de "Abonnementen" sectie op de "Home" menu en klik op de "Abonneren" knop.'
            },

        ];
        setQuestions(fetchedQuestions);
    }, []);


    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>FAQ</Text>
            </View>
            
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <TouchableOpacity style={styles.questionHeader} onPress = {() => questionClicked(index) }>
                        <Text style={globalStyles.headerTextSmallerMedium}>{question.title}</Text>
                        <Image source={require('../../../assets/arrow-down.png')} style={styles.questionIcon} />
                    </TouchableOpacity>
                    {selectedQuestionIndex === index && (
                        <View style={styles.answer}> 
                         <Text style={globalStyles.bodyTextSmall}>{question.answer}</Text>
                        </View>
                       
                    )}

                </View>
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
    questionContainer: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
    },
    questionIcon: {
        width: 25,
        height: 25,
    },
    answer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default Faq;