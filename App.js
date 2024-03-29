import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './AppTabNavigator';
import AppStackNavigator from './AppStackNavigator';

// sub navigator
import SubNavigator from './SubNavigator';

import useCustomFonts from './constants/loadFonts';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  } else {
    return (
      <>
        <StatusBar color="black" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer onLayout={onLayoutRootView}>
              <Stack.Navigator>
                {/* AuthNavigator voor inloggen en registreren */}
                <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
                {/* AppTabNavigator voor de hoofdinhoud van de app */}
                <Stack.Screen name="App" component={AppTabNavigator} options={{ headerShown: false }} />
                {/* Voeg de AppStackNavigator toe als een scherm binnen de Stack.Navigator */}
                <Stack.Screen name="AppStack" component={AppStackNavigator} options={{ headerShown: false }} />
                {/* Voeg de SubNavigator toe als een scherm binnen de Stack.Navigator */}
                <Stack.Screen name="Sub" component={SubNavigator} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}