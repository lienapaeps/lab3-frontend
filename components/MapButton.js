import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const MapButton = () => {

    const navigation = useNavigation();

    const handleMapPress = () => {
        navigation.navigate('AppStack', { screen: 'Map' });
      };

  return (
    <TouchableOpacity
        onPress={handleMapPress}
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 200,
            gap: 10,
            bottom: 30,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: COLORS.green,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 2,
        }}
    >
        <Text style={globalStyles.buttonText}>Kaart</Text>
        <Image
            source={require('../assets/icons/map.png')}
            style={{ width: 24, height: 24 }}
            resizeMode='contain'
        />
    </TouchableOpacity>
  );
};

export default MapButton;
