import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/color';

// voeg property 'filled' toe aan een button component voor een gevulde button, anders een outline button

const Button = (props) => {
    const filledBgColor = props.color || COLORS.green;
    const bgColor = props.filled ? filledBgColor : 'transparent';
    const textColor = props.filled ? COLORS.white : COLORS.offBlack;
    const buttonBorderStyle = props.filled ? {} : { borderColor: COLORS.green, borderWidth: 2 };

    return (
        <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: bgColor, ...buttonBorderStyle }, ...props.style }} onPress={props.onPress}>
            <Text style={{fontFamily:'Baloo2_500Medium', fontSize:18, ... {color:textColor}}} >{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 18,
        borderColor: COLORS.primary,
        borderWidth: 0,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Button;