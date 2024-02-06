import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

const Login = ({ navigation }) => {

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* title */}
            <View>
                <Text style={globalStyles.headerText}>Log in</Text>
            </View>
            {/* input fields */}
            <View>
                <InputField label="E-mail" placeholder="E-mail" keyboardType="email-address" />
                <InputField label="Wachtwoord" placeholder="Wachtwoord" secureTextEntry />
                <Text style={{textAlign: 'right', color: COLORS.lightOffBlack, marginTop: 20, ...globalStyles.bodyText}}>Wachtwoord vergeten?</Text>
            </View>
            {/* button */}
            <View style={{marginTop: 30}}>
                <Button title="Log in" onPress={() => navigation.navigate('App', { screen: 'HomeUser' })} filled/>
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

        </SafeAreaView>
    );
}

export default Login;