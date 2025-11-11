import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {AppImages} from '../../../utilis/AppConstant';
import PaddingView from '../../../components/Padding/PaddingView';
import {SmartMatchManagerType} from '../Manager/SmartMatchManager';
import AnimatedLottieView from 'lottie-react-native';

interface Props {
  manager: SmartMatchManagerType;
}
const BottomOptionView = (props: Props) => {
  const animationRef = useRef<any>(null);
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback onPress={() => props.manager.onMenuItem(0)}>
        <Image
          source={AppImages.Smart.crossSmart}
          style={{
            ...style.singleIconStyle,
          }}
        />
      </TouchableWithoutFeedback>
      <PaddingView width={20} />
      <TouchableWithoutFeedback onPress={() => props.manager.onMenuItem(1)}>
        <View
          style={{
            ...style.micIcon,
          }}>
          <AnimatedLottieView
            style={{
              height: 30,
              width: 30,
            }}
            ref={animationRef}
            source={require('../../../assets/lottie/whiteStarAnim.json')}
            loop={true}
          />
        </View>
      </TouchableWithoutFeedback>
      <PaddingView width={20} />
      <TouchableWithoutFeedback onPress={() => props.manager.onMenuItem(2)}>
        <Image
          source={AppImages.Smart.tickSmart}
          style={{
            ...style.singleIconStyle,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: AppColors.white(1),
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  singleIconStyle: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  micIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: AppColors.purpleColor,
  },
});
export default BottomOptionView;
