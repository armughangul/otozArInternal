import React, { useEffect, useRef } from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppHorizontalMargin, AppImages, ScreenProps} from '../../utilis/AppConstant';
import {appShadow, AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {AppColors} from '../../utilis/AppColors';
import SvgBackground from '../../components/Svg/SvgBackground';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import PaddingView from '../../components/Padding/PaddingView';
import { Routes } from '../../utilis/Routes';
import AnimatedLottieView from 'lottie-react-native';
const SmartMatchIntroScreen = (props: ScreenProps) => {
  const animationRef = useRef<any>(null)
    const animationRef2 = useRef<any>(null)

  useEffect(() => {
    if (animationRef.current){
              animationRef.current.play();
    }
      if (animationRef2.current){
              animationRef2.current.play();
    }
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
       if (animationRef2.current) {
        animationRef2.current.pause();
      }
    };
  }, []);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.sheetView,
        }}>
            <SvgBackground>
                <Image
                source={AppImages.Smart.centerImg}
                />
            </SvgBackground>
            <View
            style = {{
              ...style.innerView
            }}
            >
              <TouchableWithoutFeedback
              onPress={()=>props.navigation.goBack()}
              >
                <Image
                style = {{
                  ...style.crossIcon
                }}
                source={AppImages.Common.crossImg}
                />
              </TouchableWithoutFeedback>
              <Text
              style = {{
                ...style.titleStyle
              }}
              >
                {`Smart Matching\nWith AI-Powered\nSystem `}
                 <AnimatedLottieView
                 style = {{
                  height: 18,
                  width : 23
                 }}
                        ref={animationRef2}
                        source={require('../../assets/lottie/blueStarAnim.json')}
                        loop={true}
                      />
              </Text>
            <View
            style = {{
              ...style.centerView
            }}
            >
                 <AnimatedLottieView
                 style = {{
                  flex :1,
                  width : "100%"
                 }}
                        ref={animationRef}
                        source={require('../../assets/lottie/smartMatchAnim.json')}
                        loop={true}
                      />
          
            </View>
            <Text
            style = {{
              ...style.descTxt
            }}
            >
Explore your <Text
style = {{
  ...style.descBold
}}
>
  {` top matches`}
  </Text>, ranked by relevance to your recent activity.
            </Text>
            <BorderBtn
            onPress={()=>{
              props.navigation.replace(Routes.SmartMatchingScreen)
            }}
            titleStyle = {{
              ...style.btnTitleStyle
            }}
            title='Get Started'
            btnStyle = {{
              ...style.btnStyle
            }}
            />
            <PaddingView
            height={60}
            />
            <BottomAppSafeArea/>
            </View>
        </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'flex-end',
  },
  sheetView: {
    flex: 1,
        marginTop: 200,
    backgroundColor: AppColors.smartBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    ...appShadow()
  },
  innerView : {
    flex : 1,
    marginHorizontal : AppHorizontalMargin
  },
  crossIcon : {
    height : 14,
    width : 14,
    resizeMode : "contain",
    tintColor : AppColors.orColor,
    marginTop : 20,
    alignSelf : "flex-end"
  },
  titleStyle : {
    ...font(28,FontWeight.Bold),
    textAlign : "center",
    alignSelf : "center",
    marginTop : 20,
    color : AppColors.white(1)
  },
  descTxt : {
    ...font(14),
    color : AppColors.white(1),
    marginVertical : 20,
    textAlign : "center",
    alignSelf : "center"
  },
  descBold : {
  ...font(14,FontWeight.SemiBold),
  color : AppColors.white(1)
  },
  btnStyle : {
    height : 41,
    backgroundColor : AppColors.white(1),
    borderRadius : 8,
    marginHorizontal : 40,
  },
  btnTitleStyle : {
    ...font(14),
    color : AppColors.primary
  },
  centerView : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  }
});
export default SmartMatchIntroScreen;
