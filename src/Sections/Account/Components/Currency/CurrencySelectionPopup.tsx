import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from "react-native-worklets"
import { useDispatch } from 'react-redux';
import { PriceType, setTabbarVisibility } from '../../../../redux/Reducers/AppReducer';
import { AppHorizontalMargin, AppImages } from '../../../../utilis/AppConstant';
import { AppColors } from '../../../../utilis/AppColors';
import { AppStyle, appShadow, font, FontWeight } from '../../../../utilis/AppStyle';
import SingleCurrency from './SingleCurrency';
import { AccountManagerType } from '../../Manager/AccountManager';
interface Props {
  onClose: () => void;
  onSelect: (item : number) => void;
  manager : AccountManagerType
}
const CurrencySelectionPopUp = (props: Props) => {
  const dispatch = useDispatch()
  const animatedValue = useSharedValue(800);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    };
  });
  useEffect(()=>{
    initializeView()
  },[])
  const initializeView = async()=>{
    dispatch(setTabbarVisibility(false))
    animateView(true)
  }
  const animateView = (start: boolean,onFinished : ()=>void = ()=>{}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: 300,
      },
      finished => {
        if (finished){
        runOnJS(onFinished)()
        }
      },
    );
  };
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback onPress={() => {
        animateView(false,()=>{
              dispatch(setTabbarVisibility(true))
            props.onClose()
        })
      }}>
        <View
          style={{
            ...style.mainView,
          }}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          {
            ...style.modalView,
          },
          animatedViewStyle,
        ]}>
        <View
          style={{
            ...style.topView,
          }}>
          <Text
          style = {{
            ...style.titleStyle
          }}
          >{"Currency"}</Text>
          <TouchableWithoutFeedback onPress={() => {
            animateView(false,()=>{
                  dispatch(setTabbarVisibility(true))
            props.onClose()
        })
          }}>
            <Image
              style={{
                ...style.crossBtn,
              }}
              source={AppImages.Common.crossImg}
            />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            ...style.lineBorder,
          }}
        />
        <View
          style={{
            ...style.flatStyle,
          }}>
            <SingleCurrency
            isSelected = {props.manager.selector.priceType == PriceType.dollar}
            title={"$ Dollar"}
            onSelect={()=>{
                  animateView(false,()=>{
                  dispatch(setTabbarVisibility(true))
                  props.onSelect(0)
        })
                }}
            />
            <SingleCurrency
            isSelected = {props.manager.selector.priceType == PriceType.yen}
            title={"¥ YPY"}
            onSelect={()=>{
                                  animateView(false,()=>{
                  dispatch(setTabbarVisibility(true))
                  props.onSelect(1)
        })
            }}
            />
        </View>
      </Animated.View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent : "flex-end"
  },
  modalView: {
    ...AppStyle.mainView,
    backgroundColor: AppColors.white(1),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
    maxHeight : 230
  },
  topView: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: AppHorizontalMargin,
  },
  crossBtn: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  lineBorder: {
    height: 0.5,
    backgroundColor: AppColors.primaryOP(0.25),
    marginBottom: 20,
  },
  flatStyle: {
    ...AppStyle.mainView,
    marginHorizontal : AppHorizontalMargin
  },
    titleStyle : {
      ...font(16,FontWeight.SemiBold)
    },
});

export default CurrencySelectionPopUp;
