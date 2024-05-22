import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import COLORS from '../constants/color';
import Button from '../components/Button';
import { globalStyles } from '../styles/global';

const Welcome = ({navigation}) => {
    return (
        <View style={{ ...globalStyles.container, justifyContent: 'space-around' }}>
            {/* logo en slogan */}
            <View style={styles.header}>
                <Image source={require('../assets/Logo.png')} style={{width: 80, height: 80}} />
                <Text style={styles.logo}>Plant & Pluk</Text>
                <Text style={{marginTop: 15, ...globalStyles.bodyText}}>Plant & Pluk je groen geluk TEST</Text>
            </View>
            {/* buttons */}
            <View>
                <Button title="Inloggen" onPress={() => navigation.navigate('Login')} filled/>
                <Button style={{marginTop: 15}} title="Account maken" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>        
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        fontFamily: 'MuseoModerno_700Bold',
        fontSize: 32,
        marginTop: 20,
        color: COLORS.offBlack,
    },
})

export default Welcome;