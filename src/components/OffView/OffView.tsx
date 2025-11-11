import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { font, FontWeight } from '../../utilis/AppStyle'
import { AppColors } from '../../utilis/AppColors'
interface Props {
    value? : any
    viewStyle? : StyleProp<ViewStyle>,
    txtStyle? : StyleProp<TextStyle>,
    extraTxt? : string
}
const OffView = (props : Props) => {
  return (
    <View
         style={[{
           ...style.mainView,
         },props.viewStyle && props.viewStyle]}>
         <Text
           style={[{
             ...style.actualPriceTxt,
           },props.txtStyle && props.txtStyle]}>
           {
            props.value
           }%
           {props.extraTxt && props.extraTxt}
         </Text>
       </View>
  )
}
const style = StyleSheet.create({
  mainView: {
    paddingVertical : 2,
    paddingHorizontal : 10,
    backgroundColor : AppColors.primaryBg,
    borderRadius : 4
  },
 actualPriceTxt: {
    ...font(14, FontWeight.SemiBold),
    color : AppColors.primary
  },
})

export default React.memo(OffView)
