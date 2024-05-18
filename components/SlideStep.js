import React from 'react';
import { Text, StyleSheet, Image, View, Dimensions, Platform } from 'react-native';
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
    },
    slideImage: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginTop: 30,
            },
        }),
    },
    slideText: {
        justifyContent: 'center',
        marginTop: 20,
        ...Platform.select({
            ios: {
                marginLeft: 30,
                marginRight: 30,
            },
        }),
    },
    image: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: 400,
                width: 333,
            },
        }),
    },
})

export default SlideStep;