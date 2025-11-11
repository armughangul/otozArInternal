import React,{lazy, Suspense} from 'react'
import { Image, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import SvgBackground from '../../../components/Svg/SvgBackground';
import { AppStyle, font } from '../../../utilis/AppStyle';
import { AppColors } from '../../../utilis/AppColors';
interface Props {
    onPress : ()=>void,
    model? : any,
    size? : any,
}
   const QuickBorder = React.lazy(() =>
  import("../../../assets/newImages/Main/svgs/QuickBorder.svg")
);
const AccountSingleBtnView = (props : Props) => {
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
            <Image
              style={{
                ...style.img,
              }}
              source={props.model.img}
            />
            </View>
            <Text
            style = {{
                ...style.title
            }}
            >
                {props.model?.title}
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
    //    marginRight : 10
    },
    iconView : {
        height : "62%",
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
export default React.memo(AccountSingleBtnView)
