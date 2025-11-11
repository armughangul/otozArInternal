import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../utilis/AppColors';
import {AppHorizontalMargin} from '../../utilis/AppConstant';
import BottomAppSafeArea from '../AppSafeArea/BottomAppSafeArea';
import {font} from '../../utilis/AppStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageBar } from '../../redux/Reducers/AppReducer';
interface Props {
  onComplete: () => void;
}
const MessageBar = () => {
  const animatedValue = useSharedValue(800);
  const {messageBar} = useSelector((AppState : any) => AppState.appReducer);
  const dispatch = useDispatch()
  useEffect(() => {
    animateView(true,()=>{
        setTimeout(() => {
        animateView(false,()=>{
            dispatch(setMessageBar(null))
        })
        }, 4000);
    });
  }, []);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    };
  });
  const animateView = (start: boolean, onFinished: () => void = () => {}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: start ? 300 : 500,
      },
      finished => {
        if (finished) {
          runOnJS(onFinished)();
        }
      },
    );
  };
  return (
    <View
      style={{
        ...style.mainStyle,
      }}>
      <Animated.View
        style={[
          {
            ...style.mainView,
          },
          messageBar.msgType == 1 ? style.successStyle : style.  failStyle,
          animatedViewStyle,
        ]}>
        <Text
          style={{
            ...style.textStyle,
          }}>
          {messageBar?.title}
        </Text>
        <BottomAppSafeArea />
      </Animated.View>
    </View>
  );
};
const style = StyleSheet.create({
  mainStyle: {
    backgroundColor: AppColors.primaryOP(0.05),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 3,
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  mainView: {
    paddingTop: 20,
    paddingHorizontal: AppHorizontalMargin,
    paddingBottom: 5,
  },
  textStyle: {
    ...font(14),
        color: AppColors.white(1),
  },
  successStyle: {
        backgroundColor: AppColors.green,
  },
  failStyle : {
    backgroundColor : AppColors.redColor
  }
});
export default MessageBar;
