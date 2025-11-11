import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback,View } from 'react-native'
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle'
import { AppImages } from '../../../../utilis/AppConstant'
interface Props {
    title : string,
    isSelected : boolean,
    onPress : ()=>void
}
const SingleAskView = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
        <View
        style = {{
            ...style.mainView
        }}
        >
            <Image
            source={props.isSelected ? AppImages.Common.check : AppImages.Common.uncheck}
            />
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                {props.title}
            </Text>
            <Text
            style = {{
                ...style.askStyle
            }}
            >
                ASK
            </Text>
        </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...AppStyle.commonHoriStyle,
        marginTop : 20,
        alignItems : "center"
    },
    titleStyle : {
        ...font(14),
        marginLeft : 10
    },
    askStyle : {
        flex : 1,
        ...font(14,FontWeight.SemiBold),
        textAlign : "right"
    }
})
export default SingleAskView
