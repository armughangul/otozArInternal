import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { font } from '../../../../utilis/AppStyle'
interface Props {
    onPress : ()=>void,
    title : string
}
const SingleAutoFillView = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
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
            {props.title}
        </Text>
    </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        borderWidth :1,
        borderColor : AppColors.primary,
        paddingVertical : 8,
        paddingHorizontal : 8,
        marginTop : 10,
        marginRight : 12,
        borderRadius : 6
    },
    titleStyle : {
        ...font(14)
    }
})

export default SingleAutoFillView
