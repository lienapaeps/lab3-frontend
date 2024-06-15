import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../constants/color';

const InputField = ({ label, placeholder, value, onChangeText, fullWidth = false, multiline = false, secureTextEntry = false, keyboardType = 'default' }) => {
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[
                    styles.input,
                    fullWidth && styles.fullWidth,
                    multiline && styles.multiline,
                ]}
                autoCapitalize='none'
                multiline={multiline}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        // marginBottom: 20,
    },
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
    multiline: {
        textAlignVertical: 'top',
        height: 100,
    }
});

export default InputField;
