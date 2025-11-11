import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { font } from '../../../../utilis/AppStyle'
interface Props {
    onPress? : ()=>void,
    style? : StyleProp<ViewStyle>,
    title : string,
}
const SmallBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress && props.onPress()}
    >
        <View
        style = {[{
            ...style.mainView
        },props.style && props.style]}
        >
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                {props.title}
            </Text>
        </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        width : 64,
        height : 20,
        backgroundColor : AppColors.purpleColor,
        borderRadius : 2,
        justifyContent : "center",
        alignItems : "center",
    },
    titleStyle : {
        ...font(10),
        color : AppColors.white(1)
    }
})

export default SmallBtn
