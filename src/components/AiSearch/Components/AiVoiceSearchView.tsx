import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AiSearchManagerType} from '../Manager/AiSearchManager';
import {AppStyle, font} from '../../../utilis/AppStyle';
import AiSearchFieldView from './AiSearchFieldView';
import {AppHorizontalMargin, AppImages} from '../../../utilis/AppConstant';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedLottieView from 'lottie-react-native';

interface Props {
  manager: AiSearchManagerType;
}
const AiVoiceSearchView = (props: Props) => {
  const animatedDellX = useSharedValue(0);
  const animatedSendX = useSharedValue(0);
  const animationRef = useRef<any>(null);
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);
  const animateView = (isOpen: boolean = true) => {
    animatedDellX.value = withTiming(
      isOpen ? -100 : 0,
      {
        duration: 300,
      },
      finished => {
        if (finished) {
        }
      },
    );
    animatedSendX.value = withTiming(
      isOpen ? 100 : 0,
      {
        duration: 300,
      },
      finished => {
        if (finished) {
        }
      },
    );
  };
  const animatedDelViewStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 0,
      transform: [
        {
          translateX: animatedDellX.value,
        },
      ],
    };
  });
  const animatedSendStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 0,
      transform: [
        {
          translateX: animatedSendX.value,
        },
      ],
    };
  });
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <AiSearchFieldView
        value={props.manager.recognizedText}
        onChange={() => {}}
        isReadonly={true}
      />
      <View
        style={{
          ...style.mainWaveView,
        }}>
        <AnimatedLottieView
          ref={animationRef}
          source={require('../../../assets/lottie/audioAnim.json')}
          style={{...style.waveLineView}}
          autoPlay
          loop={true}
        />
      </View>
      <View
        style={{
          ...style.bottomView,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (animatedSendX.value == 100) {
                  props.manager.aiVoiceList.current.push("")
              props.manager.startListening()
              animationRef.current.play();
              animateView(false);
            } else {
              props.manager.onPause()
              animationRef.current.pause();
              animateView();
            }
          }}>
          <Image
            style={{
              ...style.mainVoiceIcon,
            }}
            source={AppImages.Common.voiceLargeIcon}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.manager.aiVoiceList.current = [""]
            props.manager.setRecognizedText('');
          }}>
          <Animated.View
            style={{
              ...animatedDelViewStyle,
            }}>
            <Image
              style={{
                ...style.delIconStyle,
              }}
              source={AppImages.Common.deleteVoice}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => props.manager.sendVocie()}>
          <Animated.View
            style={{
              ...animatedSendStyle,
            }}>
            <Image
              style={{
                ...style.sendIcon,
              }}
              source={AppImages.Common.send}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {},
  mainWaveView: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  waveLineView: {
    height: 80,
  },
  timerTxt: {
    ...font(14),
    marginRight: 10,
  },
  bottomView: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  delIconStyle: {
    height: 26,
    resizeMode: 'contain',
    tintColor: 'red',
  },
  sendIcon: {
    height: 26,
    resizeMode: 'contain',
  },
  mainVoiceIcon: {
    height: 64,
    width: 64,
    resizeMode: 'contain',
    zIndex: 2,
  },
});

export default AiVoiceSearchView;
