import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Touch} from 'react-native'
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';


const Review = () => {
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/id/reviews`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                setReviewData(data.data.reviews);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewData();
    }, []);

    const handleSearchTermChange = (text) => setSearchTerm(text);

    return (
        <TouchableOpacity activeOpacity={1} style={styles.flex}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>8 recensies</Text>
                <TouchableOpacity style={styles.filter}>
                    <Text style={globalStyles.headerTextSmaller}>Meest recent</Text>
                </TouchableOpacity>
        </View>
        </View>
            <View style={styles.line}>
            </View>
            <View style={[styles.container, styles.namesection]}>
                <Image style={styles.profileImage} source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fvr7VssmRTR1uXwNff5YYSR0GD7.jpg&f=1&nofb=1&ipt=95769528c57593956cb2b4a0a3a60ddacfe6a5ddc9b895a211a31982936f8626&ipo=images"}}/>
                <Text style={globalStyles.headerTextSmaller}>Firmin Crets</Text>
            </View>

            <View style={styles.datestar}>
                <View style={styles.starreview}>
                    <Image style={styles.star} source={require('../assets/icons/star.png')}/>
                    <Image style={styles.star} source={require('../assets/icons/star.png')}/>
                    <Image style={styles.star} source={require('../assets/icons/star.png')}/>
                    <Image style={styles.star} source={require('../assets/icons/star.png')}/>
                    <Image style={styles.star} source={require('../assets/icons/star.png')}/>
                </View>
                <Text style={globalStyles.bodyTextSmall}>December 2023</Text>
            </View>

            <View style={styles.message}>
                <Text style={globalStyles.bodyText}>Dit is een review van Firmin Crets</Text>
            </View>
            <View style={styles.line}>
            </View>
            <View style={[styles.container, styles.namesection]}>
                <Image style={styles.profileImage} source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fvr7VssmRTR1uXwNff5YYSR0GD7.jpg&f=1&nofb=1&ipt=95769528c57593956cb2b4a0a3a60ddacfe6a5ddc9b895a211a31982936f8626&ipo=images"}}/>
                <Text style={globalStyles.headerTextSmaller}>Firmin Crets</Text>
            </View>
            <View style={styles.message}>
                <Text style={globalStyles.bodyText}>Dit is een review van Firmin Crets</Text>
            </View>
            </TouchableOpacity>
    );
};

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