import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors} from '../../utilis/AppColors';
import AiSearchManager from './Manager/AiSearchManager';
import SearchFilterView from './Components/SearchFilterView';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
export interface AiProps {
  onClose: () => void;
  onSearch: (params: any) => void;
}
const AiSearchView = (props: AiProps) => {
  const manager = AiSearchManager(props);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const animatedValue = useSharedValue(800);
  useEffect(() => {
    initializeView();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const initializeView = async () => {
    animateView(true);
  };
  const animateView = (start: boolean, onFinished: () => void = () => {}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: 300,
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
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    };
  });
  return (
    <View
      style={{
        ...style.bgView,
      }}>
      <View
        style={{
          ...style.mainView,
        }}
      />
      <Animated.View
        style={[
          {
            ...style.mainView,
          },
          animatedViewStyle,
        ]}>
        <SearchFilterView
          onClose={() => {
            manager.stopListening()
            animateView(false, () => {
              props.onClose();
            });
          }}
          manager={manager}
        />
      </Animated.View>
      <View style={{height: isKeyboardVisible ? 250 : 0}} />
    </View>
  );
};
const style = StyleSheet.create({
  bgView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.primaryOP(0.04),
  },
  mainView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default AiSearchView;
