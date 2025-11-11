import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/loginScreen/SignUp';
import SignIn from '../screens/loginScreen/SignIn';
import ForgotScreen from '../screens/loginScreen/ForgotScreen';
import ConfirmEmail from '../screens/loginScreen/ConfirmEmail';
import TermsnCondition from '../screens/mainScreens/TermsnCondition';
import PrivacyPolicy from '../screens/mainScreens/PrivacyPolicy';
import ResetEmail from '../screens/loginScreen/ResetEmail';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetEmail"
        component={ResetEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsnCondition"
        component={TermsnCondition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthStack;
