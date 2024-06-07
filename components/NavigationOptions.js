import React from 'react';
import CustomBackButton from './CustomBackButton';

const navigationOptions = ({ navigation }) => ({
    headerLeft: () => <CustomBackButton navigation={navigation} />,
      headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
          height: 60,
        },
        headerTitleStyle: {
          display: 'none',
        },
        headerShown: true,
});

export default navigationOptions;