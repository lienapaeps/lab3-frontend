import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native'

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Review  from '../../components/Review';

 
const Reviews = ({ route }) => {
    const { data:farmId } = route.params;

    return (
        <View style={styles.flex}>
                <TouchableOpacity  activeOpacity={1} style={styles.flex}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>8 recensies</Text>
                <TouchableOpacity style={styles.filter}>
                    <Text style={globalStyles.headerTextSmaller}>Meest recent</Text>
                </TouchableOpacity>
            </View>
            </View>
            <Review farmId={farmId}/>
            </TouchableOpacity>    
        </View> 
    )
}     

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: '100%',
    },
    container: {
        margin: 20
    },
    star: {
        width: 20,
        height: 20,
    },
    starreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
        gap: 5,
    },
    datestar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20
    },
    namesection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontFamily: 'Baloo2_500Medium',
        color: COLORS.offBlack,
    },
    filter: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.lightOffBlack,
    },
    line: {
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.lightOffBlack,
        width: '100%',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
    },
    message: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    }
})

export default Reviews;
