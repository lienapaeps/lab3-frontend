import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

import { globalStyles } from '../../styles/global';
 
const Contact = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={globalStyles.headerText}>Contact</Text>
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

export default Contact;
