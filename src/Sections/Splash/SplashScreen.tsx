import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../utilis/Colors';
import {AppImages} from '../../utilis/AppConstant';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import SplashManager from './Manager/SplashManager';
import AnimatedLottieView from 'lottie-react-native';
import RNSplash from "react-native-splash-screen"
import { SafeAreaView } from 'react-native-safe-area-context';
interface Props {
  onComplete: () => void;
  onLoadScreen: () => void;
}
const SplashScreen = (props: Props) => {
  const fadedEffect = useSharedValue(1);
  const manager = SplashManager();
  useEffect(() => {
    RNSplash.hide()
    setTimeout(() => {
      if (manager.animationRef.current){
        manager.animationRef.current.play()
      }
    }, 500);
  }, []);
  const initialize = async () => {
    await manager.loadJourney();
    props.onLoadScreen();
      fadeAnim(() => {
              props.onComplete();
            });
  };
  const fadeAnim = (onFinished: () => void) => {
    fadedEffect.value = withTiming(
      0,
      {
        duration: 1000,
      },
      finished => {
        if (finished) {
          runOnJS(onFinished)();
        }
      },
    );
  };
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: fadedEffect.value,
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...style.mainView,
        },
        animatedViewStyle,
      ]}>
        <SafeAreaView
        edges={{top : "maximum"}}
        />
      <ImageBackground
        source={AppImages.Home.background}
        style={{
          ...style.innerView,
        }}>
        <AnimatedLottieView
        ref={manager.animationRef}
          source={require('../../assets/lottie/splashAnim.json')}
          style={{...style.animStyle}}
          loop={false}
          onAnimationLoop={()=>{
          }}
          onAnimationLoaded={()=>{
          }}
          onAnimationFinish={() => {
            manager.animationRef.current.pause()
          initialize()
          }}
        />
          <SafeAreaView
        edges={{bottom : "maximum"}}
        />
      </ImageBackground>
    </Animated.View>
  );
};
const style = StyleSheet.create({
  mainView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
  },
  iconStyle: {
    height: 222,
  },
  animStyle: {
    height: 350,
    width: '100%',
    marginTop: 12,
    resizeMode: 'contain',
  },
});
export default SplashScreen;
