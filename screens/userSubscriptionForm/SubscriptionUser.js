import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Step1 from './Step1.js';
import Step2 from './Step2.js';


import COLORS from '../../../constants/color.js';
import Button from '../../../components/Button.js';

const SubscriptionUser = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 2;
  
    const handleNextStep = () => {
      if (step < totalSteps) {
        setStep(step + 1);
      }
    };
  
    const handlePrevStep = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={(step - 1) / (totalSteps - 1)}
        width={null}
        style={styles.progressBar}
        color={COLORS.green}
        height={20}
      />
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}

      <View style={styles.buttonContainer}>
        {/* {step > 1 && <Button title="Previous" onPress={handlePrevStep} filled />} */}
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
});

export default SubscriptionUser;
