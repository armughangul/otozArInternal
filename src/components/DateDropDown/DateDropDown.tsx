import React from 'react'
import { Image, StyleProp, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { AppColors } from '../../utilis/AppColors';
import { font } from '../../utilis/AppStyle';
import { AppImages } from '../../utilis/AppConstant';
interface Props {
    title : string,
    placeHolder : string,
    value? : string | null,
    viewStyle? : StyleProp<ViewStyle>,
    onPress? : ()=>void
}
const DateDropDown = (props : Props) => {
  return (
    <View
    style = {[{
        ...style.mainView
    },props.viewStyle]}
    >
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text>
     <TouchableWithoutFeedback
     onPress={()=>props.onPress && props.onPress()}
     >
           <View
        style = {{
            ...style.inputView
        }}
        >
            <Text
            adjustsFontSizeToFit
            allowFontScaling = {true}
            minimumFontScale={0.8}
            numberOfLines={1}
            style = {{
                ... props.value ? style.valueStyle : style.emptyStyle
            }}
            >
                {props.value ? props.value : props.placeHolder}
            </Text>
            <Image
            style = {{
                ...style.dropDownStyle
            }}
            source={AppImages.Common.dropDown}
            />
        </View>
     </TouchableWithoutFeedback>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flex : 1
    },
    titleStyle : {
        ...font(14)
    },
  inputView: {
    height: 48,
    borderWidth: 1,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.primaryOP(0.03),
    borderRadius: 8,
    marginTop : 5,
    paddingHorizontal : 8,
    flexDirection : "row",
    alignItems : "center"
  },
  valueStyle : {
    flex : 1,
    ...font(14),
  },
  emptyStyle : {
        flex : 1,
    ...font(14),
    color : AppColors.txtLightColor
  },
  dropDownStyle : {
    height : 6,
    resizeMode : "contain",
    position : "absolute",
    top : 21,
    right : 5
  }
});


export default React.memo(DateDropDown)
