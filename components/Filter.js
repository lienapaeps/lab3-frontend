import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import Slider from '@react-native-community/slider';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';

const Filter = ({ onFilterChange, onDistanceFilterChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [distance, setDistance] = useState(0);
    const translateY = useRef(new Animated.Value(600)).current;

    const handleFilterPress = () => {
        setShowModal(true);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
    };

    const handleOptionPress = (status) => {
        setSelectedOption(status);
        onFilterChange(status);
    };

    const handleClearFilter = () => {
        setSelectedOption('All');
        setDistance(0);
        onFilterChange('All');
        onDistanceFilterChange(0);
        handleModalClose();
    };

    const handleApplyFilter = () => {
        onDistanceFilterChange(distance);
        handleModalClose();
    };

    const handleModalClose = () => {
        Animated.timing(translateY, {
          toValue: 600,
          duration: 250,
          useNativeDriver: true,
      }).start(() => setShowModal(false));
    };

    const handleDistanceChange = (value) => {
        setDistance(value);
    };

    return (
        <View>
            <TouchableOpacity style={styles.filter} onPress={handleFilterPress}>
                <Image style={styles.iconImg} source={require('../assets/icons/filters.png')} />
            </TouchableOpacity>

            <Modal visible={showModal} transparent={true} animationType="none">
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>

                  <View style={styles.modalHeader}>
                    <Text style={globalStyles.headerText}>Filters</Text>
                  </View>
                  {/* sorten op nu geopend */}
                  <View style={styles.modalSection}>
                    <Text style={[globalStyles.headerTextSmall, styles.modalSectionHeader]}>Sorteren op</Text>
                    <View style={styles.modalSectionContent}>
                      <TouchableOpacity 
                        style={[styles.modalOption, selectedOption === 'Open' && styles.selectedOption]}  
                        onPress={() => handleOptionPress('Open')}>
                          <Text style={[styles.modelOptionText, selectedOption === 'Open' && styles.selectedOptionText]}>Nu geopend</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* sorteren op afstand in km */}
                  <View style={styles.modalSection}>
                    <Text style={[globalStyles.headerTextSmall, styles.modalSectionHeader]}>Afstand in km</Text>
                    <Slider
                      style={styles.slider}
                      minimumTrackTintColor={COLORS.green}
                      maximumTrackTintColor={COLORS.veryLightOffBlack}
                      thumbTintColor={COLORS.green}
                      minimumValue={0}
                      maximumValue={20}
                      step={1}
                      value={distance}
                      onValueChange={handleDistanceChange}
                    />
                    <Text>{distance} km</Text>
                  </View>
                  {/* footer met buttons om filters te wissen of resultaten te tonen */}
                  <View style={styles.modalFooter}>
                    <Text style={styles.clearFilterText} onPress={handleClearFilter}>Alles wissen</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleApplyFilter}>
                      <Text style={styles.modalButtonText}>Toon resultaten</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.veryLightOffBlack,
        paddingBottom: 10,
    },
    modalSection: {
        marginBottom: 20,
    },
    modalSectionHeader: {
      marginBottom: 15,
    },
    modalOption: {
      backgroundColor: COLORS.offWhite,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    modelOptionText: {
      color: COLORS.offBlack,
      fontFamily: 'Baloo2_600SemiBold',
      fontSize: 18,
    },
    modalSectionContent: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    selectedOption: {
      backgroundColor: COLORS.green,
    },
    selectedOptionText: {
      color: COLORS.white,
      fontFamily: 'Baloo2_600SemiBold',
      fontSize: 18,
    },
    modalFooter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10
    },
    modalButton: {
      backgroundColor: COLORS.green,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flex: 1,
      marginRight: 10,
    },
    modalButtonText: {
      color: COLORS.white,
      textAlign: 'center',
      fontFamily: 'Baloo2_600SemiBold',
      fontSize: 18,
    },
    clearFilterText: {
      color: COLORS.offBlack,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flex: 1,
      fontFamily: 'Baloo2_600SemiBold',
      fontSize: 18,
    },
    slider: {
      width: '100%',
      height: 40,
      color: COLORS.green,
    },
    iconImg: {
        width: 30,
        height: 30,
    }
});

export default Filter;
