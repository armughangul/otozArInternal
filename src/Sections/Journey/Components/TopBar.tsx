import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant';
import { font } from '../../../utilis/AppStyle';
import { AppColors } from '../../../utilis/AppColors';
interface Props {
  onBack :()=>void,
  onSkip : ()=>void,
  step : number
}
const TopBar = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback
      onPress={()=>{
        if (props.step > 0){
          props.onBack()
        }
      }}
      >
        <View
          style={{
            ...style.backBtnView
          }}>
         {
        props.step > 0 &&
           <Image
            style = {{
                ...style.backBtn
            }}
            source={AppImages.Common.backBtn}
            />
         }
          </View>
      </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
            onPress={()=>props.onSkip()}
            >
                <Text
                style = {{
                    ...style.skipTxt
                }}
                >
                    Skip
                </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal : AppHorizontalMargin
  },
  backBtnView: {
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  backBtn : {
    resizeMode : "contain",
    height : 12,
  },
  skipTxt : {
    ...font(16),
    color : AppColors.txtLightColor
  }
});
export default TopBar;
