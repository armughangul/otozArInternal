import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../utilis/AppConstant'
import { AppColors } from '../../utilis/AppColors'
interface Props {
    placeHolder : string,
    onChange : (value : string)=>void
}
const AppSearchBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Image
        style = {{
            ...style.searchIcon
        }}
        source={AppImages.Common.searchIcon}
        />
        <TextInput
        onChangeText={(txt)=>props.onChange(txt)}
        placeholderTextColor={AppColors.txtLightColor}
        placeholder={props.placeHolder}
        style = {{
            ...style.inputStyle
        }}
        />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 48,
        marginHorizontal : AppHorizontalMargin,
        borderWidth : 1,
        borderColor : AppColors.primary,
        backgroundColor : AppColors.primaryOP(0.03),
        flexDirection : "row",
        alignItems : "center",
        borderRadius : 8,
        paddingHorizontal : 10
    },
    searchIcon : {
        height : 16,
        width : 16,
        resizeMode : "contain"
    },
    inputStyle : {
        flex : 1,
        marginLeft : 10
    },
    
})

export default AppSearchBar
