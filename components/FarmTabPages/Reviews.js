import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { fetchReviewsData } from '../../utils/fetchHelpers';

import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';
import Review  from '../../components/Review';
 
const Reviews = ({ navigation, route }) => {
    const { data: farmId } = route.params;
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviewData = async () => {
        try {
            const data = await fetchReviewsData(farmId);
            setReviewData(data.data.reviews);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviewData();
    }, [farmId]);

    useFocusEffect(
        React.useCallback(() => {
            fetchReviewData();
        }, [])
    );

    const handleAddReview = () => {
        navigation.navigate('AddReview', { data: farmId });
    }

    return (
        <View style={styles.flex}>
                <TouchableOpacity  activeOpacity={1} style={styles.flex}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{reviewData.length} recensies</Text>
                <TouchableOpacity style={styles.write} onPress={handleAddReview}>
                    <Image source={require('../../assets/icons/pencil.png')} style={styles.iconImage}/>
                    <Text style={{...globalStyles.headerTextSmaller, color: COLORS.lightOffBlack}}>Een review schrijven</Text>
                </TouchableOpacity>
            </View>
            </View>
            <FlatList
                data={reviewData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Review item={item} />
                )}
                ListEmptyComponent={<Text style={styles.emptyState}>No reviews available 🍃</Text>}
            />
            </TouchableOpacity>    
        </View> 
    )
}     

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: '100%',
        paddingBottom: 10,
    },
    container: {
        margin: 20
    },
    emptyState: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: COLORS.offBlack,
        fontFamily: 'Baloo2_500Medium',
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
    },
    iconImage: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: COLORS.lightOffBlack,
    },  
    write: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.lightOffBlack,
    }
})

export default Reviews;
