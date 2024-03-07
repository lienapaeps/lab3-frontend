import React from 'react';
import { View, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
 
const PackageScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={globalStyles.headerText}>Farm Package</Text>
        </View>
    </SafeAreaView>
  )
}

export default PackageScreen;
