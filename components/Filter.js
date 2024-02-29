import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';

const Filter = ({ onFilterChange, onRatingFilterChange, onDistanceFilterChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [selectedRating, setSelectedRating] = useState(0);
    const [distance, setDistance] = useState(0);

    const handleFilterPress = () => {
        setShowModal(true);
    };

    const handleOptionPress = (status) => {
        setSelectedOption(status);
        onFilterChange(status);
    };

    const handleClearFilter = () => {
        setSelectedOption('All');
        setSelectedRating(0);
        setDistance(0); // Reset distance to 0
        onFilterChange('All');
        onRatingFilterChange(0);
        onDistanceFilterChange(0); // Reset distance to 0
        setShowModal(false);
    };

    const handleApplyFilter = () => {
        onDistanceFilterChange(distance);
        setShowModal(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleRatingPress = (rating) => {
        setSelectedRating(rating);
        onRatingFilterChange(rating);
    };

    const handleDistanceChange = (value) => {
        setDistance(value);
    };

    return (
        <View>
            <TouchableOpacity style={styles.filter} onPress={handleFilterPress}>
                <Image source={require('../assets/icons/filters.png')} />
            </TouchableOpacity>

            <Modal visible={showModal} transparent={true}>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
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
                  {/* sorteren op beoordeling */}
                  <View style={styles.modalSection}>
                    <Text style={[globalStyles.headerTextSmall, styles.modalSectionHeader]}>Beoordeling</Text>
                    <View style={styles.modalSectionContent}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <TouchableOpacity
                          key={rating}
                          style={[
                            styles.modalOption,
                            selectedRating === rating && styles.selectedOption
                          ]}
                          onPress={() => handleRatingPress(rating)}
                        >
                          <Text style={[styles.modelOptionText, selectedRating === rating && styles.selectedOptionText]}>
                            {rating}+
                          </Text>
                        </TouchableOpacity>
                      ))}
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
                      maximumValue={10}
                      step={1}
                      value={distance}
                      onValueChange={handleDistanceChange}
                    />
                    <Text>{distance}km</Text>
                  </View>
                  {/* footer met buttons om filters te wissen of resultaten te tonen */}
                  <View style={styles.modalFooter}>
                    <Text style={styles.clearFilterText} onPress={handleClearFilter}>Alles wissen</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleApplyFilter}>
                      <Text style={styles.modalButtonText}>Toon resultaten</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 }, 
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2, 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        paddingBottom: 20,
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
    }
});

export default Filter;
