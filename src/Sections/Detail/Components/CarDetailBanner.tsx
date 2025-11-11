import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../utilis/AppConstant'
import { CarDetailManagerType } from '../Manager/CarDetailManager'
import AppImageView from '../../../components/AppImageView/AppImageView'
import { AppStyle } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
interface Props {
    manager : CarDetailManagerType
}
const CarDetailBanner = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
     {
        props.manager.carObj && props.manager.carObj.images &&  props.manager.carObj.images_count > 0 &&
           <AppImageView
        source={props.manager.carObj.images[0].image}
        mode={"cover"}
        style = {AppStyle.commonImgStyle}
        />
     }
     {
        props.manager.carObj?.otoz_recommended &&
        <Image
        source={AppImages.Home.certifiedBanner}
        style = {{
            ...style.otozBanner
        }}
        />
     }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginHorizontal : AppHorizontalMargin,
        height : 260,
        overflow : "hidden",
        borderRadius : 8,
        backgroundColor : AppColors.black(1)
    },
    otozBanner : {
        position : "absolute",
        left : 0,
        bottom : 0,
        width : 97,
        height : 42.97
    }
})
export default CarDetailBanner
