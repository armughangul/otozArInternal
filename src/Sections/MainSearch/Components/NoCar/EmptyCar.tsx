import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
import { AppColors } from '../../../../utilis/AppColors';
import { AppHorizontalMargin } from '../../../../utilis/AppConstant';
import { font, FontWeight } from '../../../../utilis/AppStyle';
interface Props {
}
const EmptyCar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
           <AnimatedLottieView
                  source={require('../../../../assets/lottie/noCarFoundAnim.json')}
                  style={{...style.animStyle}}
                  autoPlay
                  loop = {true}
                  onAnimationFinish={()=>{
                  }}
                />
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
           Car not found.
        </Text>
        <Text
        style = {{
            ...style.desc
        }}
        >
            {`Your selected car isn’t available right now, but new cars are added every week.
Stay updated or explore similar options.`}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {height : Dimensions.get("screen").height - 350,
        justifyContent : "center",
        alignItems : "center"
    },
    titleStyle : {
        ...font(16,FontWeight.SemiBold)
    },
    desc : {
        ...font(14),
        color : AppColors.txtGreyColor,
        textAlign : "center",
        paddingHorizontal : AppHorizontalMargin,
        marginTop : 10
    },
    browseBtn : {
        width : 200,
        marginTop : 15
    },
     animStyle : {
      height : 200,
      width : "100%",
      marginTop : 25,
      resizeMode : "contain",
    },
})

export default EmptyCar
