import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ProgressBar from 'react-native-progress/Bar';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Step4 from './Step4.js';

import COLORS from '../../../constants/color.js';
import Button from '../../../components/Button.js';

const AddScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  // const navigation = useNavigation();

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.navigate('Register');
    }
  };

  return (
    <View style={styles.container}>
      {step < totalSteps &&(
        <ProgressBar
            progress={(step - 1) / (totalSteps - 1)}
            width={null}
            style={styles.progressBar}
            color={COLORS.green}
            height={20}
        /> 
        )}
        {step < totalSteps && (
        <TouchableOpacity style={styles.backButton} onPress={handlePrevStep}>
          <Image
            source={require('../../../assets/Back-arrow.png')}
            style={styles.arrowImg}
          />
        </TouchableOpacity>
        )}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      <View style={styles.buttonContainer}>
        {step < totalSteps && <Button title="Volgende" onPress={handleNextStep} filled/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    width: '100%',
    marginTop: 20,
    backgroundColor: COLORS.veryLightOffBlack,
    borderWidth: 0,
  },
  buttonContainer: {
    marginHorizontal: 30,    
    marginBottom: 20,
  },
  arrowImg: {
    width: 30,
    height: 30,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },
})

export default AddScreen;
