import React from 'react';
import COLORS from '../constants/color';
import CustomBackButton from './CustomBackButton';

const navigationOptions = ({ navigation }) => ({
    headerLeft: () => <CustomBackButton navigation={navigation} />,
      headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          display: 'none',
        },
        headerShown: true,
});

export default navigationOptions;