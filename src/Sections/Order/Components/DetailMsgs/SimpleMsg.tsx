import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    startTxt : string,
    midTxt : string,
    endTxt : string,
    isSuccess? : boolean
}
const SimpleMsg = (props : Props) => {
  return (
    <View
    style = {{
        ... props.isSuccess ? style.successMainView : style.mainView
    }}
    >
        <Text
        style = {{
            ... props.isSuccess ? style.txt1SuccessStyle : style.txt1Style
        }}
        >
            {props.startTxt} {" "}
            <Text
            style = {{
            ... props.isSuccess ? style.txt2SuccessStyle : style.txt2Style
            }}
            >{props.midTxt}</Text>
            {" "}
            {props.endTxt}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        paddingHorizontal : 8,
        paddingVertical : 10,
        borderWidth : 1,
        borderColor : AppColors.orColor,
        backgroundColor : AppColors.bgBtn,
        borderRadius : 8,
        marginTop : 15
    },
    txt1Style : {
        ...font(12),
        color : AppColors.descColor
    },
     txt2Style : {
        ...font(12,FontWeight.SemiBold),
        color : AppColors.descColor
    },
    successMainView : {
          paddingHorizontal : 8,
        paddingVertical : 10,
        borderWidth : 1,
        borderColor : AppColors.darkGreen,
        backgroundColor : AppColors.bgGreen,
        borderRadius : 8,
        marginTop : 15
    },
    txt1SuccessStyle : {
        ...font(12),
        color : AppColors.darkGreen
    },
     txt2SuccessStyle : {
        ...font(12,FontWeight.SemiBold),
        color : AppColors.darkGreen
    },
})

export default React.memo(SimpleMsg)
