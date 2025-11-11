import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View } from 'react-native'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
    onPress : ()=>void,
    selected : boolean,
    title : string,
    viewStyle? : StyleProp<TextStyle>
}
const SingleDetailTopTab = (props : Props) => {
  return (
  <TouchableWithoutFeedback
  onPress={()=>props.onPress()}
  >
      <View
      style = {[{
        ...style.mainView
      },props.viewStyle && props.viewStyle]}
      >
        <Text
        style = {[
            style.titleStyle,
            props.selected && style.selectedTitleStyle,
        ]}
        >
            {props.title}
        </Text>
    </View>
  </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        flex :1,
        height : 40,
        justifyContent : "center",
        alignItems : "center",
        marginTop : 5
    },
    titleStyle : {
        ...font(14),
    },
    selectedTitleStyle : {
        ...font(14,FontWeight.SemiBold),
        color : AppColors.primary
    }
})
export default SingleDetailTopTab
