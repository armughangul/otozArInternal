import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
import { AppHorizontalMargin } from '../../../utilis/AppConstant'
import BorderBtn from '../../../components/BorderBtn/BorderBtn'
import AnimatedLottieView from 'lottie-react-native';
interface Props {
    onBrowse : ()=>void
}
const FavEmptyView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
           <AnimatedLottieView
                  source={require('../../../assets/lottie/favEmptyAnim.json')}
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
            No favourites yet!
        </Text>
        <Text
        style = {{
            ...style.desc
        }}
        >
            Tap the heart icon to save vehicles you like and view them anytime.
        </Text>
            <BorderBtn
                  isSelected={true}
                  btnStyle={{
                    ...style.browseBtn
                  }}
                  onPress={() => {
                    props.onBrowse()
                  }}
                  title="Browse Vehicles"
                />
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
      height : 105,
      width : "100%",
      marginTop : 25,
      resizeMode : "contain",
    },
})

export default FavEmptyView
