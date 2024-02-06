import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const HomeUser = ({ navigation }) => {
    const goToCalendar = () => {
        navigation.navigate('AppStack', { screen: 'Calendar' });
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Home pagina Gebruiker</Text>
            </View>
            <View>
                {/* op deze manier ga je naar een detail scherm */}
                <Button title='Kalender' onPress={goToCalendar}></Button>
            </View>
        </SafeAreaView>
    );
}

export default HomeUser;