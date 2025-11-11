import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import AppManager from './Manager/AppManager';
import MainNavigation from '../../routes/MainNavigation';
import SmartMatchingScreen from '../SmartMatch/SmartMatchingScreen';

const App = () => {
  const manager = AppManager()
  return (
    <MenuProvider>
      <SafeAreaProvider>
         <NavigationContainer>
              <MainNavigation />
              {/* <SmartMatchingScreen/> */}
            </NavigationContainer>
      </SafeAreaProvider>
    </MenuProvider>
  );
};

export default App;
