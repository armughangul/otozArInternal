import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
    image : any,
    isSelected : boolean,
    onPress : ()=>void
}
const SingleSwitcher = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
        <View
        style = {[{
            ...style.mainView
        },props.isSelected && style.selectedView]}
        >
            <Image
            style = {[{
                ...style.iconStyle
            },props.isSelected && style.selectedIcon]}
            source={props.image}
            />
        </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 32,
        width : 35,
        borderRadius : 4,
        backgroundColor : AppColors.white(1),
        justifyContent : "center",
        alignItems : "center",
        marginRight : 10
    },
    iconStyle : {
        height : 15,
        width : 15,
        resizeMode : "contain",
        tintColor : AppColors.txtGreyColor
    },
    selectedIcon : {
        tintColor : AppColors.white(1)
    },
    selectedView : {
        backgroundColor : AppColors.primary
    }
})

export default React.memo(SingleSwitcher)
