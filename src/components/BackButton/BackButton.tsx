import React, { useRef } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { AppImages } from '../../utilis/AppConstant'
interface Props {
    onPress? : ()=>void
}
const BackButton = (props : Props) => {
    const isBtnAllow = useRef<boolean>(true)
  return (
    <TouchableWithoutFeedback
    onPress={()=>{
        if (isBtnAllow){
            isBtnAllow.current = false
            if (props.onPress){
                props.onPress()
            }
        setTimeout(() => {
            isBtnAllow.current = true
        }, 500);
                }
    }}
    >
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Image
        style = {{
            ...style.backImg
        }}
        source={AppImages.Common.backBtn}
        />
    </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 40,
        width : 40,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start"
    },
    backImg : {
        resizeMode : "contain",
        height : 12,
    }
})

export default BackButton
