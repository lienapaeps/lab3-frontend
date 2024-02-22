import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

import FarmCard from '../components/FarmCard';

const FarmUser = () => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Boerderij pagina Gebruiker</Text>
            </View>
            <View>
                <FarmCard 
                    image="https://via.placeholder.com/100"
                    title="Boerderij 1"
                    adres="Adres 1"
                    rating="4.5"
                    kilometer="5 km"
                    status="Open"
                />
            </View>
        </SafeAreaView>
    );
}

export default FarmUser;