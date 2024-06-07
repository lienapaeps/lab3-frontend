import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button, TextInput } from 'react-native'


import { globalStyles } from '../../../../styles/global';
import COLORS from '../../../../constants/color';
import { updateUserEmail } from '../../../../utils/fetchHelpers';
const Email = ({ navigation, route }) => {
    const userData = route.params.userData;

    const [email, setEmail] = useState(userData.email);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleEmailChange = (text) => {
        setEmail(text);
    }

    const clearEmail = () => {
        setEmail('');
    }

    const updateEmail = () => {
        // Call the changeEmail function from fetchHelpers to update the email
        updateUserEmail(userData._id, email)

            .then(() => {
            
                setShowSuccess(true);
          
                // Handle success
                console.log('Email updated successfully');
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating email:', error);
            });
    }
    useEffect(() => {
        if (showSuccess) {
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    }, [showSuccess]);

    

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Email</Text>
            </View>
            <View style={styles.content}>
            {showSuccess && (
                    <Text style={styles.successMessage}>Email changed successfully</Text>
                )}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleEmailChange}
                    value={email}
                    placeholder="Enter new email"
                    
                />
                <TouchableOpacity style={styles.buttonSmall} onPress={clearEmail}>
                    <Text style={styles.buttonText}>Clear Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={updateEmail}>
                    <Text style={styles.buttonText}>Update Email</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: COLORS.grey,
        
    },
    buttonSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: COLORS.red,
        marginBottom: 20,
    },
    successMessage: {
        color: COLORS.green,
        marginBottom: 20,
    },
    
});

export default Email;