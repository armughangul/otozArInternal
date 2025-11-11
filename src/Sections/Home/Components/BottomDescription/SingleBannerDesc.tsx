import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    color : string,
    title : string
}
const SingleBannerDesc = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.dotStyle,
            backgroundColor : props.color
        }}
        />
        <Text
        style = {{
            ...style.titleTxt
        }}
        >
            {props.title}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        alignItems : "center",
        flexDirection : "row",
        marginRight : 15
    },
    dotStyle : {
        height : 15,
        width : 15,
        borderRadius : 2,
    },
    titleTxt : {
        ...font(10,FontWeight.Regular),
        marginLeft : 5
    }
})

export default SingleBannerDesc
