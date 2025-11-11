import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Routes } from '../utilis/Routes';
import HomeScreen from '../Sections/Home/HomeScreen';
import React from 'react';
import MainSearchScreen from '../Sections/MainSearch/MainSearchScreen';
import FavouriteScreen from '../Sections/Favourite/FavouriteScreen';
const Stack = createNativeStackNavigator();
const HomeContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Home}
        component={HomeScreen}
      />
         <Stack.Screen
            component={MainSearchScreen}
            name={Routes.MainSearchScreen}
            />
    </Stack.Navigator>
  );
};
export const HomeStack = HomeContainer
export const FavStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.FavouriteScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.FavouriteScreen}
        component={FavouriteScreen}
      />
    </Stack.Navigator>
  );
};

