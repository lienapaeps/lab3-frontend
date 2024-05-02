import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';

const FarmRegistrationSucces = ({ navigation }) => {

  const goToHomeFarmer = () => {
    navigation.navigate('AppFarmer', { screen: 'HomeFarmer' });
  }

  const goToAddFarm = () => {
    navigation.navigate('AppFarmer', {screen: 'AddScreen'});
  }

  return (
    <View style={styles.container}>
        <Text style={styles.successText}>
            Je account is succesvol aangemaakt. Je kan nu een boerderij toevoegen, of je kan dit later ook nog doen!
        </Text>
        {/* buttons */}
        <View>
            <Button title="Boerderij toevoegen" filled onPress={goToAddFarm}/>
            <Button style={{marginTop: 15}} title="Stap overslaan" onPress={goToHomeFarmer}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default FarmRegistrationSucces;
