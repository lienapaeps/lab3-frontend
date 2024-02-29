import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

import { globalStyles } from '../styles/global';
import COLORS from '../constants/color';

const Filter = ({ onFilterChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');

    const handleFilterPress = () => {
        setShowModal(true);
    };

    const handleOptionPress = (status) => {
        setSelectedOption(status);
        onFilterChange(status);
        setShowModal(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
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
                  <View style={styles.modalSection}>
                    <Text style={[globalStyles.headerTextSmall, styles.modalSectionHeader]}>Sorteren op</Text>
                    <View style={styles.modalSectionContent}>
                      <TouchableOpacity 
                        style={[styles.modalOption, selectedOption === 'All' && styles.selectedOption]} 
                        onPress={() => handleOptionPress('All')}>
                          <Text style={[globalStyles.bodyText, selectedOption === 'All' && styles.selectedOptionText]}>Toon alles</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.modalOption, selectedOption === 'Open' && styles.selectedOption]}  
                        onPress={() => handleOptionPress('Open')}>
                          <Text style={[globalStyles.bodyText, selectedOption === 'Open' && styles.selectedOptionText]}>Nu geopend</Text>
                      </TouchableOpacity>
                    </View>
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
      fontFamily: 'Quicksand_600SemiBold',
    }
});

export default Filter;
