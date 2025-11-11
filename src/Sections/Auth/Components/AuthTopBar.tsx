import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { font, FontWeight } from '../../../utilis/AppStyle'
import BackButton from '../../../components/BackButton/BackButton'
interface Props {
    onBack : ()=>void,
    title? : string
}
const AuthTopBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <BackButton
        onPress={()=>props.onBack()}
        />
        {/* <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text> */}
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 50,
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : AppHorizontalMargin
    },
    titleStyle : {
        ...font(18,FontWeight.SemiBold),
        marginLeft : 5
    },

})

export default React.memo(AuthTopBar)
