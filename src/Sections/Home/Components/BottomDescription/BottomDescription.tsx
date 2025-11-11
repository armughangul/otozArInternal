import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import SingleBannerDesc from './SingleBannerDesc'
import { AppColors } from '../../../../utilis/AppColors'

const BottomDescription = () => {
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
            First AI-Driven Cross-Border Car Marketplace
        </Text>
        <Text
        style = {{
            ...style.desc
        }}
        >
            Buy Used Cars Globally — Fast, Smart, and Secure
        </Text>
        <Text
        style = {{
            ...style.detail1
        }}
        >
            With 17 years of experience exporting vehicles from Japan to
            <Text
            style = {{
            ...style.detail2
            }}
            >
              {` `}20+ countries,{` `}
            </Text>
           we’re bridging the technology gap. Now powered by AI for rapid buying, instant shipping, and secure transactions — revolutionizing global car trade.
        </Text>
        <Image
        source={AppImages.Home.descMapBanner}
        style = {{
            ...style.bannerStyle,
        }}
        />
        <View
        style = {{
            ...style.bottomItemView
        }}
        >
            <SingleBannerDesc
            color={AppColors.primary}
            title='Left Hand Drive'
            />
              <SingleBannerDesc
            color={AppColors.txtGreyColor}
            title='Right Hand Drive'
            />
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginHorizontal : AppHorizontalMargin,
        overflow : "hidden"
    },
    titleStyle : {
        ...font(16,FontWeight.Bold)
    },
    desc : {
        ...font(14,FontWeight.Regular),
        marginTop : 10
    },
    detail1 : {
        ...font(12,FontWeight.Light),
        marginTop : 8
    },
    detail2 : {
        ...font(12,FontWeight.SemiBold)
    },
    bannerStyle : {
        aspectRatio : 1.5/1,
        resizeMode : "cover"
    },
    bottomItemView : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center"
    }
})

export default BottomDescription
