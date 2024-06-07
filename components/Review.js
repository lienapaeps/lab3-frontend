import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Touch, FlatList} from 'react-native'
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

import { fetchUserDataById } from '../utils/fetchHelpers';

const Review = ({ item }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await fetchUserDataById(item.user);
                setUserData(data.data.user);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [item.user]);

    const formatDate = (dateString) => {
        return dateString.slice(0, 10).replace('T', ' '); 
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!userData) {
        return <Text>Error loading user data</Text>;
    }

    return (
                <TouchableOpacity activeOpacity={1} style={styles.flex}>
                    <View style={styles.line}></View>
                    <View style={[styles.container, styles.namesection]}>
                        <Image style={styles.profileImage} source={{uri: userData.profilePicture}} />
                        <Text style={[globalStyles.headerTextSmaller, globalStyles.capitalize]}>{userData.firstname} {userData.lastname}</Text>
                    </View>

                    <View style={styles.datestar}>
                        <View style={styles.starreview}>
                            {[...Array(item.rating)].map((_, index) => (
                                <Image key={index} style={styles.star} source={require('../assets/icons/star.png')} />
                            ))}
                        </View>
                        <Text style={globalStyles.bodyTextSmall}>{formatDate(item.date)}</Text>
                    </View>

                    <View style={styles.message}>
                        <Text style={globalStyles.bodyText}>{item.text}</Text>
                    </View>
                </TouchableOpacity>
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

export default Review;