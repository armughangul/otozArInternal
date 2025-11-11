import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View,Text} from 'react-native';
import {AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {AppColors} from '../../utilis/AppColors';
interface Props {
    title : string,
    onPress : ()=>void
}
const SinglePopupItem = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
      <View
        style={{
          ...style.mainView,
        }}>
                <Text
                style = {{
                    ...style.titleStyle
                }}
                >
                    {props.title}
                </Text>
            <View
            style = {{
                ...style.borderStyle
            }}
            />
        </View>
      
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 30,
    paddingHorizontal: 10,
    ...AppStyle.commonShadow,
    backgroundColor: AppColors.white(1),
    paddingTop : 5
  },
  titleStyle : {
    ...font(12,FontWeight.SemiBold),
    color : AppColors.txtGreyColor,
    paddingBottom : 10
  },
  borderStyle : {
    ...AppStyle.commonBorder,
    marginTop : 5
  }
});

export default SinglePopupItem;
