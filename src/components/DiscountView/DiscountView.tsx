import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { font, FontWeight } from '../../utilis/AppStyle'
import { useSelector } from 'react-redux'
interface Props {
    value? : any
    viewStyle? : StyleProp<ViewStyle>,
    txtStyle? : StyleProp<TextStyle>
}
const DiscountView = (props : Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  return (
    <View
         style={[{
           ...style.discountPriceView,
         },props.viewStyle && props.viewStyle]}>
         <Text
           style={[{
             ...style.actualPriceTxt,
           },props.txtStyle && props.txtStyle]}>
         {selector.priceType} {props.value}
         </Text>
         <View
           style={{
             ...style.borderMainView,
           }}>
           <View
             style={{
               ...style.boderLine,
             }}
           />
         </View>
       </View>
  )
}
const style = StyleSheet.create({
  discountPriceView: {
    marginRight: 10,
    justifyContent : "center",
    maxWidth : 80
  },
 actualPriceTxt: {
    ...font(12, FontWeight.Light),
  },
  borderMainView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  boderLine: {
    height: 0.6,
    backgroundColor: 'black',
  },
})

export default React.memo(DiscountView)
