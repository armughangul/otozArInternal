import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
import { useSelector } from 'react-redux'
import { HomeManagerType } from '../Manager/HomeManager'
import { PriceType } from '../../../redux/Reducers/AppReducer'
import AppPopupMenu from '../../../components/AppPopupMenu/AppPopupMenu'
import SinglePopupItem from '../../../components/AppPopupMenu/SinglePopupItem'
interface Props {
    manager : HomeManagerType
}
const HomeBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Image
        source={AppImages.Home.homeLogo}
        style = {{...style.logo}}
        />
        <TouchableOpacity
        onPress={()=>{
            props.manager.setMenuVisible(true)
        }}
        >
            <View
            style = {{
                ...style.dropDownView
            }}
            >
                <Text
                style = {{
                    ...style.currencyTxt
                }}
                >
                    {
                        props.manager.selector.priceType == PriceType.dollar ?
                        "DOL ($)"
                         :
                         "JPY (¥)" 
                    }
                </Text>
                <Image
                style = {{
                    ...style.dropDownImg
                }}
                source={AppImages.Home.dropDown}
                />
            </View>
        </TouchableOpacity>
      
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 26,
        marginHorizontal : AppHorizontalMargin,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    logo : {
        height : 23,
        resizeMode : "contain"
    },
    dropDownView : {
        height : 21,
        alignItems : "center",
        flexDirection : "row",

    },
    currencyTxt : {
    ...font(14,FontWeight.Medium),
    color :AppColors.primary
    },
    dropDownImg : {
        height : 8,
        width : 8,
        resizeMode : "contain",
        marginLeft :3
    }
})

export default HomeBar
