import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '../../styles/global';

const ChatFarmer = () => {
    
    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <Text style={globalStyles.headerText}>Chat pagina Landbouwer</Text>
            </View>
        </SafeAreaView>
    );
}

export default ChatFarmer;