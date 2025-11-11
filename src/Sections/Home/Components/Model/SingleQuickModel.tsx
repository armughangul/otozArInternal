import React,{lazy, Suspense} from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import SvgBackground from '../../../../components/Svg/SvgBackground';
import { AppStyle, font } from '../../../../utilis/AppStyle';
import { AppColors } from '../../../../utilis/AppColors';
import { CarModel } from '../../../../Model/CarModel';
    const QuickBorder2 = React.lazy(() =>
  import("../../../../assets/newImages/Main/svgs/QuickBorder2.svg")
);
interface Props {
    model : CarModel,
    size : any,
    onPress : ()=>void
}
const SingleQuickModel = (props : Props) => {

  return (
    <Suspense
    fallback = {null}
    >
        <TouchableWithoutFeedback
        onPress={()=>props.onPress && props.onPress()}
        >
               <View
    style = {{
        ...style.mainView,
        width : props.size.width

    }}
    >
        <SvgBackground>
        <QuickBorder2
        preserveAspectRatio={"none"}
        // height={style.mainView.height}
        width={props.size.width}
        />
        </SvgBackground>
            <Text
            style = {{
                ...style.title
            }}
            >
                {props.model.name}
            </Text>
    </View>
        </TouchableWithoutFeedback>
    </Suspense>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 40,
        width : 123,
       marginTop : 12,
       justifyContent : "center",
       alignItems : "center",
       
    },
    iconView : {
        height : 60,
        backgroundColor : AppColors.white(0.25),
        margin : 6,
        borderRadius : 4,
        justifyContent : "center",
        alignItems : "center"
    },
    title : {
        ...font(12),
        textAlign : "center",
        paddingHorizontal : 2
    },
    img : {
        resizeMode : "contain"
    }
})
export default React.memo(SingleQuickModel)
