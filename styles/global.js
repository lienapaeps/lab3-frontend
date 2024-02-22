import {  StyleSheet } from 'react-native';
import COLORS from '../constants/color';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingBottom: -30,
        backgroundColor: COLORS.offWhite,
    },
    bodyText: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 16,
        lineHeight: 20,
        color: COLORS.offBlack,
    },
    bodyTextSmall: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.offBlack,
    },
    bodyTextMedium: {
        fontFamily: 'Quicksand_500Medium',
        fontSize: 18,
        lineHeight: 20,
        color: COLORS.offBlack,
    },
    headerText: {
        fontFamily: 'Baloo2_600SemiBold',
        fontSize: 24,
        color: COLORS.offBlack,
    },
    headerTextSmall: {
        fontFamily: 'Baloo2_600SemiBold',
        fontSize: 20,
        color: COLORS.offBlack,
    },
    headerTextSmaller: {
        fontFamily: 'Baloo2_600SemiBold',
        fontSize: 16,
        color: COLORS.offBlack,
    },
    tabBarLabel: {
        paddingBottom: 5,
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Quicksand_500Medium',
      },
      tabBarLabelFocused: {
        color: COLORS.green,
        fontWeight: '700',
      },
      tabBarLabelNormal: {
        color: COLORS.offBlack,
        fontWeight: '500',
      },
});