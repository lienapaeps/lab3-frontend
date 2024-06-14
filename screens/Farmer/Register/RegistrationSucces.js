import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { globalStyles } from '../../../styles/global';  
import Button from '../../../components/Button';

const RegistrationSucces = ({ navigation }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('uid');
        if (userId) {
          setUserId(JSON.parse(userId));
        }
      } catch (error) {
        console.error('Fout bij het ophalen van gebruikers-ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const goToHomeFarmer = () => {
    navigation.navigate('AppFarmer', { screen: 'HomeFarmer' });
  }

  const goToAddFarm = () => {
    navigation.navigate('AddFarm', { params: { uid: userId } });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/registration-success.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={globalStyles.headerText}>
              Registratie voltooid
          </Text>
          <Text style={{...styles.successText, ...globalStyles.bodyText}}>
              Je account is succesvol aangemaakt. Laten we nu je boerderij toevoegen. 
          </Text>
      </View>
      <View style={styles.buttonContainer}>
          <Button title="Boerderij toevoegen" filled onPress={goToAddFarm}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successText: {
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 450,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default RegistrationSucces;
