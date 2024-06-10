import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Touch, FlatList} from 'react-native'
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const Lid = ({ item }) => {
    const [lidData, setLidData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLidData = async () => {
            try {
                const data = await fetchMembersData(item);
                setLidData(data.data.user);
            } catch (error) {
                console.log("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLidData();
    }, [item]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!lidData) {
        return <Text>Error loading user data</Text>;
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={1} style={styles.flex}>
            <View style={[styles.container, styles.namesection]}>
                <Image style={styles.profileImage} source={{uri: item.profilePicture}} />
                <Text style={[globalStyles.headerTextMedium, globalStyles.capitalize]}>{item.firstname} {item.lastname}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: '100%',
    },
    namesection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 20,
    },
    message: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    }
});

export default Lid;
