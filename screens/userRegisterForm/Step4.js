import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';

import { globalStyles } from '../../styles/global';
import slides from './onboarding/slides.js'
import SlideStep from '../../components/SlideStep.js';
import Button from '../../components/Button.js';
import COLORS from '../../constants/color.js';

const Step4 = ({ navigation }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
        navigation.navigate('App', { screen: 'HomeUser' });
    }
  };

  const skipSlides = () => {
    navigation.navigate('App', { screen: 'HomeUser' });
  };

  const handlePaginationPress = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {slides.map((slide, index) => (
          <TouchableOpacity key={index} onPress={() => handlePaginationPress(index)}>
            <View style={[styles.dot, index === currentIndex && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.box}>
        <FlatList
          ref={flatListRef}
          horizontal={true}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SlideStep
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get('window').width}
          decelerationRate="fast"
        />
        {renderPagination()}
        <Button title={currentIndex === slides.length - 1 ? 'Start' : 'Next'} onPress={nextSlide} filled />
        <TouchableOpacity onPress={skipSlides}>
          <Text style={{ ...globalStyles.bodyText, textAlign: 'center', marginTop: 5}}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    box: {
      gap: 5,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 10,
      backgroundColor: COLORS.veryLightOffBlack,
      marginHorizontal: 6,
    },
    activeDot: {
      backgroundColor: COLORS.green,
    },
});

export default Step4;
