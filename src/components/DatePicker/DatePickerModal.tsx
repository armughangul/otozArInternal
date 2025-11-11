import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppHorizontalMargin, AppImages} from '../../utilis/AppConstant';
import {AppColors} from '../../utilis/AppColors';
import {appShadow, font, FontWeight} from '../../utilis/AppStyle';
import SinglePickerItem from './SinglePickerItem';
import { FlashList } from '@shopify/flash-list';
import { runOnJS } from 'react-native-worklets';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { setTabbarVisibility } from '../../redux/Reducers/AppReducer';
import { useDispatch } from 'react-redux';

interface Props {
  onClose: () => void;
  onConfirm: (value: any) => void;
  title?: string;
  dataList: any[];
  selectedValue? : any | null
}
const DatePickerModal = (props: Props) => {
  const flatRef = useRef<FlatList>(null)
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
  useEffect(() => {
    animateView(true);
  }, []);
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
  useEffect(() => {
    Keyboard.dismiss();
      setTimeout(() => {
            if (flatRef.current && props.dataList.length > 0){
        flatRef.current.scrollToEnd()
            }
      }, 1000);
  }, []);
  return (
    <View style={style.mainView}>
      <TouchableWithoutFeedback onPress={() => {
         animateView(false, () => {
          props.onClose()
                  });
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
                  style={{
                    ...style.titleStyle,
                  }}>
                  {props.title}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    animateView(false, () => {
                     props.onClose()
                    });
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
               <View style={style.pickerStyle}>
          <FlatList
          ref={flatRef}
          showsVerticalScrollIndicator = {false}
          data={props.dataList}
          contentContainerStyle = {{
            paddingBottom : 60
          }}
          renderItem={({item})=>{
            return(
              <SinglePickerItem
              onPress={()=>{
                 animateView(false, () => {
                props.onConfirm(item)
                    });
              }}
              title= {`${item}`}
              />
            )
          }}
          />
        </View>
            </Animated.View>
   
    </View>
  );
};
const style = StyleSheet.create({
  pickerStyle: {
    flex : 1
  },
  crossStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  mainView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  calMainView: {
    flex : 1,
    maxHeight: "70%",
    borderRadius: 40,
    backgroundColor: AppColors.white(1),
    paddingHorizontal: AppHorizontalMargin,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
    marginHorizontal : AppHorizontalMargin
  },
  title: {
    ...font(18,FontWeight.SemiBold),
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    top: 15,
  },
   modalView: {
    flex: 1,
    maxHeight: 284,
    backgroundColor: AppColors.white(1),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
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
   titleStyle: {
    ...font(16, FontWeight.SemiBold),
  },
   lineBorder: {
    height: 0.5,
    backgroundColor: AppColors.primaryOP(0.25),
    marginBottom: 20,
  },
});

export default DatePickerModal;
