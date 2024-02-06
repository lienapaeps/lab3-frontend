import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const OptionButton = ({ onPress, imageSource, buttonText, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          borderColor: isSelected ? COLORS.green : COLORS.veryLightOffBlack,
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={globalStyles.headerTextSmall}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 70,
    height: 63,
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OptionButton;
