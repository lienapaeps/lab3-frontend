import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const CustomBackButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{
      marginLeft: 10,
      marginTop: 10,
    }}
  >
    <Image
      source={require('../assets/Back-arrow.png')}
      style={{ width: 30, height: 32 }}
    />
  </TouchableOpacity>
);

export default CustomBackButton;