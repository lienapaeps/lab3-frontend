import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const SocialButton = ({ onPress, imageSource, buttonText }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderColor: COLORS.veryLightOffBlack,
        borderWidth: 1,
        marginVertical: 12,
        height: 55,
      }}
    >
      <Image
        source={imageSource}
        style={{ width: 24, height: 24, marginRight: 10 }}
        resizeMode='contain'
      />
      <Text style={globalStyles.bodyText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
