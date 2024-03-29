import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FarmHeader from '../components/FarmHeader';
import FarmTab from '../components/FarmTab';

import COLORS from '../constants/color';

const FarmUserDetails = ({ navigation, route }) => {

  // const farmData = route.params.farmData;

  return <>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require('../assets/Back-arrow.png')} />
        </TouchableOpacity>
      </View>
      <FarmHeader route={route}/>
      <FarmTab/>
  </>
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
    margin: 20,
  },
  backButton: {
      width: 30,
      height: 30,
  },
});

export default FarmUserDetails;