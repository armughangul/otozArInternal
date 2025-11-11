import React from 'react'
import { Keyboard, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { AppColors } from '../../utilis/AppColors'
import { font } from '../../utilis/AppStyle'
interface Props {
    btnStyle? : StyleProp<ViewStyle>,
    title : string,
    titleStyle? : StyleProp<TextStyle>,
    onPress : ()=>void,
    isSelected? : boolean
}
const BorderBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=> {
            Keyboard.dismiss()
            
        props.onPress && props.onPress()}}
    >
            <View
    style = {[
    style.mainView,   
    props?.btnStyle && props.btnStyle,
    props.isSelected && style.selectedBtnStyle
    ]}
    >
        <Text
        style = {[{
            ...style.titleStyle
        },props.titleStyle && props.titleStyle,
    props.isSelected && style.selectedTxtStyle
    ]}
        >
            {
                props.title
            }
        </Text>
    </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 41,
        borderWidth :1,
        borderColor : AppColors.primary,
        borderRadius : 8,
        justifyContent : "center",
        alignItems : "center"
    },
    titleStyle : {
        ...font(14),
        color : AppColors.primary
    },
    selectedBtnStyle : {
    borderWidth : 0,
    backgroundColor : AppColors.primary,
  },
  selectedTxtStyle : {
    color : AppColors.white(1)
  }
})

export default React.memo(BorderBtn)
