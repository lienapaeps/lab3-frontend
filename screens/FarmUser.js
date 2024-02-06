import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const FarmUser = () => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Boerderij pagina Gebruiker</Text>
            </View>
        </SafeAreaView>
    );
}

export default FarmUser;