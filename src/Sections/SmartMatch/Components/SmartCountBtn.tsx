import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import { font, FontWeight } from '../../../utilis/AppStyle'
interface Props {
    count : number,
    onPress : ()=>void
}
const SmartCountBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress && props.onPress()}
    >
        <View
        style = {{
            ...style.mainView
        }}
        >
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                Smart Count {props.count}
            </Text>
        </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        width : 154,
        height : 31,
        backgroundColor : AppColors.redColor,
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 5,
        position : "absolute",
        alignSelf : "center",
        top : 400
    },
    titleStyle :{
        ...font(12,FontWeight.Medium),
        color : AppColors.white(1)
    }
})
export default SmartCountBtn
