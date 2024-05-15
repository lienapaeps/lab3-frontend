import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Step4 from './Step4.js';

import COLORS from '../../constants/color';
import Button from '../../components/Button.js';

const RegisterUser = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

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
        {step < totalSteps && (
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
              source={require('../../assets/Back-arrow.png')}
              style={styles.arrowImg}
            />
          </TouchableOpacity>
          )}
      <View style={styles.content}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 navigation={navigation} />}
      </View>
      <View style={styles.buttonContainer}>
        {/* {step > 1 && <Button title="Previous" onPress={handlePrevStep} filled />} */}
        {step < totalSteps && <Button title="Next" onPress={handleNextStep} filled/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    ...Platform.select({
      ios: {
        // backgroundColor: 'red',
      },
    }),
  },
  buttonContainer: {
    marginHorizontal: 30, 
    marginBottom: 20,
    ...Platform.select({
      ios: {
        marginBottom: 100,
        // backgroundColor: 'blue',
      },
    }),
  },
  progressBar: {
    width: '100%',
    marginTop: 20,
    backgroundColor: COLORS.veryLightOffBlack,
    borderWidth: 0,
    ...Platform.select({
      ios: {
        marginTop: 50,
        marginBottom: 20,
      },
    }),
  },
  arrowImg: {
    width: 30,
    height: 30,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
    }),
  },
})

export default RegisterUser;
