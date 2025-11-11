import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AppStyle } from '../../utilis/AppStyle'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavStack, HomeStack } from '../../routes/InnerStack';
import BottomBar from './Components/BottomBar';
import { TabRoutes } from '../../utilis/Routes';
import AccountScreen from '../Account/AccountScreen';
const Tab = createBottomTabNavigator();
const Container = () => {
  return (
    <View
    style = {{
        ...AppStyle.mainView
    }}
    >
    <Tab.Navigator 
     screenOptions={{ headerShown: false }}
        tabBar={(props) => <BottomBar {...props} />}>
        <Tab.Screen name={TabRoutes.HomeStack} component={HomeStack} />
        <Tab.Screen name={TabRoutes.ArStack} component={()=><View/>} />
        <Tab.Screen name={TabRoutes.Agentic} component={()=><View/>} />
        <Tab.Screen name={TabRoutes.FavStack} component={FavStack} />
        <Tab.Screen name={TabRoutes.Account} component={AccountScreen} />
      </Tab.Navigator>
    </View>
  )
}

export default Container
