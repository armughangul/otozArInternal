import React, { Suspense } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import SvgBackground from '../../../../components/Svg/SvgBackground'
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle';
import SingleBannerDesc from './SingleBannerDesc';
import BannerBottomBtn from './BannerBottomBtn';
  const MidBannerBg = React.lazy(() =>
  import("../../../../assets/newImages/Main/svgs/MidBannerBg.svg")
);
interface Props {
  bannerImg : any,
  type : number,
  title : string,
  onPress? : ()=>void

}
const MidBanner = (props : Props) => {
  return (
  <Suspense
  fallback = {null}
  >
  <TouchableWithoutFeedback
  onPress={()=>props.onPress && props.onPress()}
  >
        <View
    style = {{
      ...style.mainView
    }}
    >
      <SvgBackground>
        <MidBannerBg
                preserveAspectRatio='none'
        width={"100%"}
        />
      </SvgBackground>
      <View
      style = {{
        ...style.innerView
      }}
      >
        <View
        style = {{
          ...style.descView
        }}
        >
          <Text
          style = {{
            ...style.titleStyle
          }}
          >
            {props.title}
          </Text>
          <SingleBannerDesc
          type={props.type}
          />
          <View
          style = {{
            ...style.bottomView
          }}
          >
            <BannerBottomBtn
            type={props.type}
            />
          </View>
        </View>
        <View
        style = {[style.descImageView,props.type == 0 ? style.bg1 : style.bg2]}
        >
          <Image
          style = {{
            ...style.bannerImg
          }}
          source={props.bannerImg}
          />
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
  </Suspense>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 160,
        marginHorizontal : AppHorizontalMargin,
        marginTop : 20,
        overflow : "hidden"
    },
    innerView : {
       ...AppStyle.mainView,
      flexDirection : "row",
    },
    descView : {
      flex : 1,
      paddingLeft : 10,
      paddingVertical : 15
    },
    descImageView : {
      width : 162,
      alignItems : "flex-end",
    },
    bg1 : {
 justifyContent : "center",
 marginRight : 5
    },
    bg2 : {
       justifyContent : "flex-end"
    },
    bannerImg : {
      resizeMode : "contain"
    },
    titleStyle : {
      ...font(16,FontWeight.Bold)
    },
    bottomView : {
      flex : 1,
      justifyContent : "flex-end",
    }
})

export default React.memo(MidBanner)
