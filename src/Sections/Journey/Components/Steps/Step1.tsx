import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle'
import { AppImages } from '../../../../utilis/AppConstant'
import TextGradient from "@furkankaya/react-native-linear-text-gradient";
import BorderBtn from '../../../../components/BorderBtn/BorderBtn';
import AnimatedLottieView from 'lottie-react-native';
import BottomAppSafeArea from '../../../../components/AppSafeArea/BottomAppSafeArea';
interface Props {
  onStart :()=>void
}
const Step1 = (props : Props) => {
  const [animOrder,setAnimOrder] = useState(0)
  return (
    <View
    style = {{
      ...AppStyle.mainView
    }}
    >
      <View
      style = {{
        ...style.mainView,
        justifyContent : "center"
      }}
      >
        <Image
      style = {{
        ...style.carIcon
      }}
      source={AppImages.Journey.journeyCar}
      />
      <View
      style = {{
        ...style.descTopView
      }}
      >
 <Text
      style = {{
        ...style.txt1
      }}
      >
       {`Your `} 
      </Text>
       <Image
      style = {{
        ...style.starIcon
      }}
      source={AppImages.Journey.journeyStar}
      />
            <TextGradient
        style={{
          ...style.txt1
        }}
        locations={[0, 1,0]}
        colors={["#2BA6FF", "#91CFFB","#2BA6FF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        text=" AI Agent"
      />
       <Text
      style = {{
        ...style.txt1
      }}
      >
       {` for`} 
      </Text>
      </View>
       <Text
      style = {{
        ...style.txt2
      }}
      >
       {`Effortless Cross-Border Car Buying`} 
      </Text>
      {
        animOrder == 0 ?
              <AnimatedLottieView
          source={require('../../../../assets/lottie/journeyAnim1.json')}
          style={{...style.animStyle}}
          autoPlay
          loop = {false}
          onAnimationFinish={()=>{
            setAnimOrder(1)
          }}
        /> :
              <AnimatedLottieView
          source={require('../../../../assets/lottie/journeyAnim2.json')}
          style={{...style.animStyle}}
          autoPlay
          loop = {true}
        />
      }
      </View>
              <BorderBtn
              onPress={()=>props.onStart()}
              btnStyle = {style.btnStyle}
        title={"Find Car"}
        />
      <BottomAppSafeArea/>
    </View>
  )
}
const style = StyleSheet.create({
  mainView : {
    ...AppStyle.mainView,
    alignItems : "center"
  },
      carIcon : {
        height : 48,
        resizeMode : "contain",
    },
    descTopView : {
      flexDirection : "row",
      alignItems : "center",
      marginTop : 30
    },
    txt1 : {
      ...font(28,FontWeight.SemiBold),
      textAlign : "center"
    },
    starIcon : {
      height : 24,
      resizeMode : "contain"
    },
    animStyle : {
      height : 350,
      width : "100%",
      marginTop : 12,
      resizeMode : "contain",
    },
    btnStyle : {
      width : 223,
      alignSelf : "center",
      marginBottom : 60
    },
    txt2 : {
          ...font(28,FontWeight.SemiBold),
      textAlign : "center",
      paddingHorizontal : 10
    }
})

export default Step1
