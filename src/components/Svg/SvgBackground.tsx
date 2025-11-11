import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
interface Props {
  viewStyle? : StyleProp<ViewStyle>,
  children? : any
}
const SvgBackground = ({children,viewStyle} : Props) => {
  return (
    <View
    style = {[{
        ...style.mainView,
       
    },viewStyle ?? viewStyle]}
    >
        {children}
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        top : 0,
        left : 0,
        bottom : 0,
        right : 0,
        position : "absolute",
    }
})

export default React.memo(SvgBackground)
