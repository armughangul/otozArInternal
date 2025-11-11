import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AppHorizontalMargin, AppImages} from '../../../utilis/AppConstant';
import {AppColors} from '../../../utilis/AppColors';
import {font} from '../../../utilis/AppStyle';
import LottieView from 'lottie-react-native';
interface Props {
  onFilters: () => void;
  isHome?: boolean;
}
const HomeSearchBar = (props: Props) => {
  const animationRef = useRef<any>(null);
  const animationRef2 = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
      if (animationRef2.current) {
        animationRef2.current.pause();
      }
    };
  }, []);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableOpacity onPress={() => props.onFilters && props.onFilters()}>
        <View
          style={{
            ...style.innerView,
          }}>
          <Text
            style={{
              ...style.descTxt,
            }}>
            Find car with AI agent
          </Text>
          {props.isHome ? (
            <LottieView
              ref={animationRef2}
              source={require('../../../assets/lottie/aiStarAnim.json')}
              style={{...style.starStyle}}
              autoPlay
              loop
            />
          ) : (
            <Image
              style={{
                ...style.filterIcon,
              }}
              source={AppImages.Home.filterIcon}
            />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          ...style.animatedView,
        }}>
        <LottieView
          ref={animationRef}
          source={require('../../../assets/lottie/homeAnimation.json')}
          style={{...style.animatedImg}}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 60,
    marginHorizontal: AppHorizontalMargin,
    justifyContent: 'center',
    marginTop: 15,
  },
  innerView: {
    backgroundColor: AppColors.white(0.5),
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.white(0.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  filterIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
   starStyle: {
    height: 27.8,
    width: 23.07,
  },
  descTxt: {
    ...font(14),
    marginLeft: 60,
  },
  animatedView: {
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    transform: [
      {
        scaleX: -1,
      },
    ],
  },
  animatedImg: {
    height: 74,
    width: 76,
    resizeMode: 'contain',
  },
});

export default HomeSearchBar;
