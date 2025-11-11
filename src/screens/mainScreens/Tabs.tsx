import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Home from './Home';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Animated from 'react-native-reanimated';
import Explore from './Explore';
import MyCar from './MyCar';
import MyAccount from '../drawerScreens/MyAccount';
import {Colors, orange} from '../../utilis/Colors';
import FavoriteScreen from '../drawerScreens/FavoriteScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const icons = {
  Home: require('../../assets/icons/home.png'),
  Explore: require('../../assets/icons/searchicon.png'),
  MyCar: require('../../assets/icons/sellcar.png'),
  Favorite: require('../../assets/icons/save.png'),
  Account: require('../../assets/icons/account.png'),
};

const Tabs = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderIconAndTitle = (routeName: any, selectedTab: any) => {
    const icon: any = icons[routeName];
    const name: any =
      routeName === 'MyCar'
        ? 'My Car'
        : routeName === 'Home'
          ? 'Home'
          : routeName;

    return (
      <React.Fragment>
        <Image
          source={icon}
          tintColor={routeName === selectedTab ? '#ffc107' : 'white'}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text
          style={[
            styles.title,
            {color: routeName === selectedTab ? '#ffc107' : 'white'},
          ]}>
          {name}
        </Text>
      </React.Fragment>
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    // if (keyboardOpen) {
    //   return <TouchableOpacity
    //   onPress={() => navigate(routeName)}
    //   style={{display:'none'}}>
    //   {renderIconAndTitle(routeName, selectedTab)}
    // </TouchableOpacity>;
    // }

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName, {filters: undefined})}
        style={styles.tabbarItem}>
        {renderIconAndTitle(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    // <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={65}
      bgColor="#113551"
      initialRouteName="Home"
      renderCircle={({navigate}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Home')}>
            <Image
              source={require('../../assets/icons/home.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      })}>
      <CurvedBottomBar.Screen name="Home" component={Home} position="CIRCLE" />
      <CurvedBottomBar.Screen
        name="Explore"
        component={Explore}
        position="LEFT"
        initialParams={{filters: undefined}}
      />
      <CurvedBottomBar.Screen
        name="Favorite"
        component={FavoriteScreen}
        position="LEFT"
      />
      <CurvedBottomBar.Screen name="MyCar" component={MyCar} position="RIGHT" />
      <CurvedBottomBar.Screen
        name="Account"
        component={MyAccount}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
    
  );
};

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    // height:50,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ai_yellow_500,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});

export default Tabs;

