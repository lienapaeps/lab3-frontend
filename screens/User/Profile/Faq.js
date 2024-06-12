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
        // Fetch the FAQ questions from the backend
        // Update the questions state with the fetched questions
        const fetchedQuestions = [
            {
                title: 'How do I create an account?',
                answer: 'To create an account, click the "Sign Up" button on the home page and fill in the required information.'
            },
            {
                title: 'How do I log in?',
                answer: 'To log in, click the "Log In" button on the home page and enter your email and password.'
            },
            {
                title: 'How do I reset my password?',
                answer: 'To reset your password, click the "Forgot Password" link on the login page and follow the instructions.'
            },
            {
                title: 'How do I update my account information?',
                answer: 'To update your account information, go to the "My Account" section and click on the information you want to update.'
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