import React from 'react';
import { Text, StyleSheet, Image, View, Dimensions } from 'react-native';
import COLORS from '../constants/color';

import { globalStyles } from '../styles/global';

const SlideStep = ({ title, description, image }) => {
    return (
      <View style={styles.container}>
        <View style={styles.slide}>
          <View style={styles.slideImage}>
            <Image style={styles.image} source={image} />
          </View>
          <View style={styles.slideText}>
            <Text style={globalStyles.headerText}>{title}</Text>
            <Text style={globalStyles.bodyText}>{description}</Text>
          </View>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width: Dimensions.get('window').width,
        height: '80%',
    },
    slideImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideText: {
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: "100%",
    },
})

export default SlideStep;