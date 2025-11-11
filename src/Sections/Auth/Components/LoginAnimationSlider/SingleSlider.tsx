import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { AuthManagerType } from '../../Manager/AuthManager'
interface Props {
    isSelected : boolean
}
const SingleSlider = (props :Props) => {
  return (
    <View
    style = {[
    style.mainView
    ,props.isSelected && style.selected]}
    />
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 2,
        backgroundColor : AppColors.seperatorColor,
        width : 30
    },
    selected : {
        backgroundColor : AppColors.primary
    }
})

export default SingleSlider
