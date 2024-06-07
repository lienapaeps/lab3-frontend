import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import COLORS from '../constants/color';

const CodeInput = ({ value, onChange }) => {
    const inputs = Array(6).fill('');
    const inputRefs = useRef([]);
  
    const focusInput = (index) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].focus();
        }
    };
  
    const handleChange = (text, index) => {
        const updatedValue = [...value];
        updatedValue[index] = text; 
        onChange(updatedValue.join(''));
        if (text !== '' && index < inputs.length - 1) {
            focusInput(index + 1);
        }
    };
  
    return (
        <View style={styles.container}>
            {inputs.map((_, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.input}
                    value={value[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    keyboardType="default"
                    autoCapitalize='none'
                    maxLength={1}
                    textAlign="center"
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default CodeInput;
