import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

import { globalStyles } from '../../styles/global';
 
const Services = () => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={globalStyles.headerText}>Pakketten</Text>
        </View>
    </View>
)
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    }
})

export default Services;
