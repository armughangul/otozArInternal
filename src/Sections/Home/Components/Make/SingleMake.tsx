import React,{lazy, Suspense} from 'react'
import { Image, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import SvgBackground from '../../../../components/Svg/SvgBackground';
import { AppStyle, font } from '../../../../utilis/AppStyle';
import { AppColors } from '../../../../utilis/AppColors';
import { AppImages } from '../../../../utilis/AppConstant';
import { MakeModel } from '../../../../Model/CarMakeModel';
import AppImageView from '../../../../components/AppImageView/AppImageView';
import { IMAGE_BASE_URL, IMAGE_MAKES_BASE_URL } from '../../../../Network/Urls';
interface Props {
    onPress : ()=>void,
    model? : MakeModel,
    size? : any,
}
   const QuickBorder = React.lazy(() =>
  import("../../../../assets/newImages/Main/svgs/QuickBorder.svg")
);
const SingleQuickMake = (props : Props) => {
  return (
    <Suspense
    fallback = {null}
    >
           <View
    style = {[
        style.mainView,
        props.size && props.size
    ]}
    >
        <SvgBackground>
        <QuickBorder
        preserveAspectRatio="none"   
        height={props.size.height}
        width={props.size.width}
        />
        </SvgBackground>
        <TouchableWithoutFeedback
        onPress={()=>props.onPress()}
        >
  <View
        style = {{
            ...AppStyle.mainView,
        }}
        >
            <View
            style = {{
                ...style.iconView,
            }}
            >
               {props.model?.mobile_icon && props.model?.mobile_icon != '' && (
            <AppImageView
              style={{
                ...style.img,
              }}
              source={IMAGE_MAKES_BASE_URL + props.model?.mobile_icon}
            />
          )}  
            </View>
            <Text
            style = {{
                ...style.title
            }}
            >
                {props.model?.name}
            </Text>
        </View>
        </TouchableWithoutFeedback>
      
    </View>
    </Suspense>
  )
}
const style = StyleSheet.create({
    mainView : {
       marginTop : 12,
    },
    iconView : {
        height : "70%",
        backgroundColor : AppColors.white(0.25),
        margin : 6,
        borderRadius : 4,
        justifyContent : "center",
        alignItems : "center"
    },
    title : {
        flex : 1,
        ...font(12),
        textAlign : "center"
    },
    img : {
        width : "40%",
        resizeMode : "contain",
    }
})
export default React.memo(SingleQuickMake)
