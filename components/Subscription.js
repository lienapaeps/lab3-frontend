
//add a component to the frontend that check if user is subscribed to a plan else show a subscribe button
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const SubscribeCard = () => {
  const abonnement = false;
  const noAbonnement = true;
  if (abonnement) {
    return (
      <View>
        <Text style={globalStyles.bodyText}>Abonnementen</Text>
      </View>
    );
  } else if (noAbonnement) {
    return (
      <View style={globalStyles.Header}>
        <Text style={globalStyles.bodyText}>Geen Abonnementen</Text>
       <button>Abonneren</button>

      </View>
    );
  }
  return <p>none</p>;
}

export default SubscribeCard;