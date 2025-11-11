import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { font, FontWeight } from '../../../utilis/AppStyle'
import BackButton from '../../../components/BackButton/BackButton'
interface Props {
    title : string
}
const FavTopBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text>
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
    },

})

export default React.memo(FavTopBar)
