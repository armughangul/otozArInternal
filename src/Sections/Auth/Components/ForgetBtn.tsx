import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { font } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
import { AuthManagerType } from '../Manager/AuthManager'
interface Props {
    onPress : ()=>void
}
const ForgetBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>{
        props.onPress()
    }}
    >
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            Forget password?
        </Text>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    titleStyle  : {
        ...font(14),
        color : AppColors.primary,
        marginTop : 8,
        alignSelf : "flex-end"
    }
})
export default ForgetBtn
