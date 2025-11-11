import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'

interface Props {
    firstTxt : string,
    secondTxt : string,
    onPress : ()=>void
}
const OptionTxt = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Text
        style = {{
            ...style.txt1
        }}
        >
            {props.firstTxt}
        </Text>
        <TouchableWithoutFeedback
        onPress={()=>props.onPress()}
        >
            <Text
            style = {{
                ...style.txt2
            }}
            >
                {props.secondTxt}
            </Text>
        </TouchableWithoutFeedback>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        alignSelf : "center",
        alignItems : "center",
    },
    txt1 : {
        ...font(14)
    },
    txt2 : {
        ...font(14,FontWeight.SemiBold),
        marginLeft : 5,
        color : AppColors.primary
    }
})

export default OptionTxt
