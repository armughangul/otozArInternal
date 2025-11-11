import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
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
import { AppColors } from '../../../../../../utilis/AppColors';
import { AppHorizontalMargin, AppImages } from '../../../../../../utilis/AppConstant';
import { AppStyle, appShadow, font, FontWeight } from '../../../../../../utilis/AppStyle';
import { confirmConsigneeTxt } from '../../../../../../utilis/AppStrings';
import BorderBtn from '../../../../../../components/BorderBtn/BorderBtn';
import PaddingView from '../../../../../../components/Padding/PaddingView';
interface Props {
  onClose: () => void;
  onCofirm: () => void;
}
const AddConsigneeConfirmation = (props: Props) => {
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
            <Image
            style = {{
                ...style.iconStyle
            }}
            source={AppImages.Order.consigneeConfirmIcon}
            />
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                Add Consignee Confirmation
            </Text>
            <Text
            style = {{
                ...style.descStyle
            }}
            >
                {confirmConsigneeTxt}
            </Text>
            <View
            style = {{
                ...style.bottomBtnView
            }}
            >
                <BorderBtn
                onPress={()=>{
      animateView(false,()=>{
            props.onClose()
        })
                }}
                title='Cancel'
                titleStyle = {{
                    ...style.btnTitleStyle
                }}
                btnStyle = {{
                    ...style.cancelBtnStyle
                }}
                isSelected = {false}
                />
                <PaddingView
                width={15}
                />
                  <BorderBtn
                onPress={()=>{
      animateView(false,()=>{
            props.onCofirm()
        })
                }}
                title='Confirm'
                titleStyle = {{
                    ...style.btnTitleStyle
                }}
                btnStyle = {{
                    ...style.confirmBtnStyle
                }}
                isSelected = {false}
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
    backgroundColor: AppColors.white(1),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
    height : 300,
  },
  iconStyle : {
    height : 81,
    width : 81,
    resizeMode : "contain",
    alignSelf : "center",
    transform : [{
        scale : 2.2
    }],
    marginTop : 20
  },
  titleStyle : {
    ...font(16,FontWeight.SemiBold),
    textAlign : "center",
    marginTop : 20
  },
  descStyle : {
    ...font(14),
    marginTop : 10,
        textAlign : "center",
        paddingHorizontal : AppHorizontalMargin
},
bottomBtnView : {
    flex : 1,
    flexDirection : "row",
    marginHorizontal : AppHorizontalMargin,
    marginTop : 20
},
confirmBtnStyle : {
    flex : 1,
    backgroundColor : AppColors.green,
},
btnTitleStyle : {
    ...font(14),
    color : AppColors.white(1)
},
cancelBtnStyle : {
     flex : 1,
    backgroundColor : AppColors.redColor,   
}
});

export default AddConsigneeConfirmation;
