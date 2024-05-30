import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native'

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Review  from '../../components/Review';

 
const Reviews = () => {
    return (
        <View style={styles.flex}>
            <ScrollView>
            <Review />
            </ScrollView>       
        </View> 
    )
}
      
const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: '100%',
    }
})

export default Reviews;
