import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { AppStyle, font, FontWeight } from '../../../utilis/AppStyle'
import BackButton from '../../../components/BackButton/BackButton'
import CommonManager from '../../../utilis/CommonManager'
import { CarDetailManagerType } from '../Manager/CarDetailManager'
interface Props {
    onBack : ()=>void,
    title : string,
    manager : CarDetailManagerType
}
const DetailTopBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <BackButton
        onPress={()=>props.onBack()}
        />
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text>
        <View
        style = {{
            ...style.btnsView
        }}
        >
            <TouchableOpacity
            onPress={()=>{
                props.manager.onSparky()
            }}
            >
                <Image
                style = {{
                    ...style.iconStyle
                }}
                source={AppImages.Detail.shareIcon}
                />
            </TouchableOpacity>
            {
                CommonManager.shared.userToken != "" &&
            <TouchableOpacity
            onPress={()=>CommonManager.shared.markFav(props.manager.carObj?.id ?? 0)}
            >
                <Image
                style = {{
                    ...style.heartStyle
                }}
                source={CommonManager.shared.checkFavStatus(props.manager.selector,props.manager.carObj?.id ?? 0) ?AppImages.Common.favSelected  : AppImages.Common.favUnselected}
                />
            </TouchableOpacity>   
            }
        </View>
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
    btnsView : {
        flex : 1,
        ...AppStyle.commonHoriStyle,
        justifyContent : "flex-end"
    },
    iconStyle : {
        height : 18,
        width : 18,
        resizeMode : "contain"
    },
    heartStyle  : {
        height : 18,
        width : 18,
        resizeMode : "contain",
        marginLeft : 15
    }
})

export default DetailTopBar
