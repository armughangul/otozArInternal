import React from 'react'
import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppStyle, font } from '../../utilis/AppStyle'
import { AppHorizontalMargin } from '../../utilis/AppConstant'
interface Props {
    title : string,
    onPress : ()=>void
}
const SinglePickerItem = (props : Props) => {
  return (
    <Pressable
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
        <View
        style = {{
            ...AppStyle.commonBorder
        }}
        />
    </View>
    </Pressable>
  )
}
const style = StyleSheet.create({
    mainView : {
        justifyContent : "center",
        marginTop : 20,
        alignItems : "center"
    },
    titleStyle : {
        ...font(16)
    }
})

export default SinglePickerItem
