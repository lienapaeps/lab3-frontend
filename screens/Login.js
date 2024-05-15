import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../styles/global';
import LoginForm from '../components/LoginForm';

const Login = ({ navigation }) => {

    return (
        <SafeAreaView style={globalStyles.container}>
            {/* title */}
            <View>
                <Text style={globalStyles.headerText}>Log in</Text>
            </View>
            {/* form component */}
            <LoginForm navigation={navigation} />
        </SafeAreaView>
    );
}

export default Login;