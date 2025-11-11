import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { font } from '../../../../utilis/AppStyle'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
    item : any,
    onPress : ()=>void
}
const SectionSingleItem = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
            <View
    style = {{
        ...style.topView
    }}
    >
        <View
        style = {{
            ...style.mainView
        }}
        >
            <Image
            style = {{
                ...style.imgStyle
            }}
            source={props.item.img}
            />
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                {props.item.title}
            </Text>
        </View>
        <View
        style = {{
            ...style.borderStyle
        }}
        />
    </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    topView  : {
        paddingHorizontal : 10,
    },
    mainView : {
        height : 48,
        alignItems : "center",
        flexDirection : "row"
    },
    imgStyle : {
        height : 24,
        width : 24,
        resizeMode : "contain",
        marginRight : 10
    },
    titleStyle : {
        ...font(14)
    },
    borderStyle : {
        backgroundColor : AppColors.white(1),
        height : 0.5
    }
})

export default SectionSingleItem
