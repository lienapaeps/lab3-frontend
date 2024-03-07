import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const SubscriptionCard = ({ onPress, cardHeader, cardBody, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.subscriptionCard,
      {
        backgroundColor: isSelected ? COLORS.lightOrange : COLORS.white,
      },
      ]}
    >
      {isSelected && <Image source={require('../assets/icon.png')} style={{ position: 'absolute', bottom: 10, right: 10, width: 20, height: 20 }} />}
      <Text style={globalStyles.headerTextSmaller}>{cardHeader}</Text>
      <Text style={[globalStyles.bodyTextSmall]}>{cardBody}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subscriptionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
});

export default SubscriptionCard;
