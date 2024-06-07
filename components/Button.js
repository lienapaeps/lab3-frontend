import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/color';

// voeg property 'filled' toe aan een button component voor een gevulde button, anders een outline button

const Button = (props) => {

    const { filled, disabled, title, onPress, color, style } = props;

    const filledBgColor = color || COLORS.green;
    const bgColor = filled ? filledBgColor : 'transparent';
    const textColor = filled ? COLORS.white : COLORS.offBlack;
    const buttonBorderStyle = filled ? {} : { borderColor: COLORS.green, borderWidth: 2 };

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: bgColor,
                ...buttonBorderStyle,
                opacity: disabled ? 0.5 : 1,
                ...style
            }}
            onPress={disabled ? null : onPress}
        >
            <Text style={{ fontFamily: 'Baloo2_500Medium', fontSize: 18, color: textColor }}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 18,
        borderColor: COLORS.primary,
        borderWidth: 0,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Button;