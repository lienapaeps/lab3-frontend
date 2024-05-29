import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../constants/color';

const InputField = (props) => {

    const { fullWidth } = props;

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                placeholder={props.placeholder}
                style={[
                    styles.input,
                    fullWidth ? styles.fullWidth : null
                ]}
                autoCapitalize='none'
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Baloo2_500Medium',
        fontSize: 16,
        color: COLORS.offBlack,
        marginBottom: 10,
        marginTop: 15,
    },
    fullWidth: {
        width: '100%',
    },
    input: {
        padding: 18,
        borderColor: COLORS.veryLightOffBlack,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
})

export default InputField;