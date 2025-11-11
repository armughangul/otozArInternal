import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import { font } from '../../../utilis/AppStyle'
interface Props {
    title : string,
    image : any,
    onPress? : ()=>void
}
const SocialBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress && props.onPress()}
    >
        <View
        style = {{
            ...style.mainView
        }}
        >
            <Image
            style= {{
                ...style.iconStyle
            }}
            source = {props.image}
            />
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
        flexDirection : "row",
        borderWidth : 1,
        borderColor : AppColors.seperatorColor,
        borderRadius : 8,
        height : 48,
        marginBottom : 15,
        justifyContent : "center",
        alignItems : "center"
    },
    iconView : {
        height : 30,
        width : 30,
        justifyContent : "center",
        alignItems : "center"
    },
    
    iconStyle : {
        height : 16,
        width : 21,
        resizeMode : "contain"
    },
    titleStyle : {
        ...font(14),
        marginLeft : 10,
        width : 180,
    }
})

export default SocialBtn
