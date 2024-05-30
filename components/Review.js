import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Touch} from 'react-native'
import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';


const Review = () => {
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20
    },
    namesection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        width: 55,
        height: 55,
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