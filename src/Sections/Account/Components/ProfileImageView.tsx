import React from 'react'
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import AppImageView from '../../../components/AppImageView/AppImageView'
import { AppImages } from '../../../utilis/AppConstant'
interface Props {
    url? : string,
    mainStyle? : StyleProp<ViewStyle>
}
const ProfileImageView = (props : Props) => {
  return (
    <View
    style = {[
        style.mainView,
        props.mainStyle && props.mainStyle
    ]}
    >
      
        <AppImageView
        isProfile = {true}
        source={props.url}
        mode={"fill"}
        style = {{
            ...style.imageStyle
        }}
        placeHolder={AppImages.Common.profileImagePlaceHolder}
        />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 100,
        width : 100,
        borderRadius : 50,
        overflow : "hidden",
        backgroundColor : AppColors.lightPrimaryDp,
        borderWidth : 10,
        borderColor : AppColors.white(1)
    },
    imageStyle : {
        flex : 1,
    }
})
export default ProfileImageView
