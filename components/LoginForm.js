import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import InputField from './InputField';
import Button from './Button';
import SocialButton from './SocialButton';

const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch("https://lab3-backend-w1yl.onrender.com/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (json.status === 'success') {
                await AsyncStorage.setItem('token', json.data.token);
                await AsyncStorage.setItem('uid', json.data.uid);

                if (json.data.isFarmer) {
                    navigation.navigate('AppFarmer', { screen: 'HomeFarmer' });
                } else {
                    navigation.navigate('App', { screen: 'HomeUser' });
                }

            } else {
                setErrorMessage(json.message);
            }
        } catch (error) {
            console.error('Fout bij het inloggen:', error);
            setErrorMessage('Er is een fout opgetreden bij het inloggen');
        }
    }

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    return (
        <View>
            {/* error message */}
            {errorMessage !== '' && (
            <View style={styles.errorMessageContainer}>
                <Text style={{ ...globalStyles.errorText }}>{errorMessage}</Text>
            </View>
            )}
            {/* input fields */}
            <View>
                <InputField label="E-mail" placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail} value={email} />
                <InputField label="Wachtwoord" placeholder="Wachtwoord" secureTextEntry onChangeText={setPassword} value={password} />
                <TouchableOpacity style={styles.forgot} onPress={handleForgotPassword}>
                    <Text style={{color: COLORS.lightOffBlack, ...globalStyles.bodyText}}>Wachtwoord vergeten?</Text>
                </TouchableOpacity>
            </View>

            {/* button */}
            <View style={{marginTop: 15}}>
                <Button title="Log in" onPress={handleLogin} filled/>
            </View>
            {/* of met */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: COLORS.veryLightOffBlack,
                        marginHorizontal: 10,
                    }}
                />
                <Text style={{textAlign: 'center', ...globalStyles.bodyText}}>Of met</Text>
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: COLORS.veryLightOffBlack,
                        marginHorizontal: 10,
                    }}
                />
            </View>

            {/* social buttons */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 15}}>
                <SocialButton
                    onPress={() => console.log("Pressed Facebook")}
                    imageSource={require('../assets/Facebook.png')}
                    buttonText="Facebook"
                />
                <SocialButton
                    onPress={() => console.log("Pressed Google")}
                    imageSource={require('../assets/Google.png')}
                    buttonText="Google"
                />
            </View>

            {/* nog geen account link */}
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                <Text style={{...globalStyles.bodyText}}>Nog geen account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{...globalStyles.bodyText, fontFamily: 'Quicksand_500Medium'}}>Registreer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    errorMessageContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    forgot: {
        alignSelf: 'flex-end',
        paddingVertical: 15,
        marginTop: 10,
    }
});

export default LoginForm;