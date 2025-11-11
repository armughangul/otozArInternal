import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
import AppImageView from '../../../../components/AppImageView/AppImageView';
import { MakeModel } from '../../../../Model/CarMakeModel';
import { CarModel } from '../../../../Model/CarModel';
import { IMAGE_MAKES_BASE_URL } from '../../../../Network/Urls';
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle';
import { AppImages } from '../../../../utilis/AppConstant';
interface Props {
    selectedMake : MakeModel | null,
    selectedModelList : CarModel[],
    onCross : ()=>void
}
const SelectedMakeModalView = (props : Props) => {

  const modelListTxt = ()=>{
    let txt = ""
    props.selectedModelList.map((item)=>{
      txt += item.name + ", "
    })
    return txt
  }
  return (
    <View
      style={{
        ...style.mainView,
      }}>
           <AppImageView
              style={{
                ...style.imgStyle,
              }}
              source={IMAGE_MAKES_BASE_URL + props.selectedMake?.mobile_icon}
            />
            <View
            style = {{
              ...AppStyle.mainView
            }}
            >
              <Text
              style = {{
                ...style.makeTxt
              }}
              >
                {props.selectedMake?.name}
              </Text>
               <Text
              style = {{
                ...style.modelListTxt
              }}
              >
                {modelListTxt()}
              </Text>
            </View>
            <TouchableWithoutFeedback
            onPress={()=>props.onCross()}
            >
              <Image
              style = {{
                ...style.crossIcon
              }}
              source={AppImages.Common.crossImg}
              />
            </TouchableWithoutFeedback>
      </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.primary,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical : 15
  },
    imgStyle: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  makeTxt : {
    ...font(14,FontWeight.Medium),
    marginHorizontal : 10
  },
    modelListTxt : {
    ...font(12,),
    marginHorizontal : 10,
    marginTop :1,
    color : AppColors.txtGreyColor
  },
  crossIcon : {
    height : 13,
    width : 13,
    resizeMode : "contain",
    marginRight : 5
  }
});
export default SelectedMakeModalView;
