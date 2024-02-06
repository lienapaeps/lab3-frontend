import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';
import Button from '../components/Button';

const RegisterFarmer = () => {

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Account maken (landbouwer)</Text>
            </View>
        </SafeAreaView>
    );
}

export default RegisterFarmer;