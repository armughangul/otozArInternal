import React, { useEffect, useRef } from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { AppColors } from '../../utilis/AppColors';
import { appShadow } from '../../utilis/AppStyle';
import LottieView from 'lottie-react-native';
const AppLoader = (props: any) => {
  const animationRef = useRef<any>(null)
    useEffect(()=>{
      return()=>{
              if (animationRef.current) {
          animationRef.current.pause();
        }
      }
    },[])
  return (
    <View
      style={{
        ...style.mainStyle
      }}>
      <View
        style={{
          ...style.mainView
        }}>
           <LottieView
                  ref={animationRef}
                    source={require('../../assets/lottie/homeAnimation.json')}
                    style={{...style.animatedImg}}
                    autoPlay
                    loop
                  />
        {/* {props.visisble ? (
          <ActivityIndicator size="large" color={AppColors.primary} />
        ) : null} */}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainStyle : {
        backgroundColor: AppColors.primaryOP(0.05),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 3,
        zIndex: 100,
  },
  mainView : {
          // ...appShadow(),
          // backgroundColor: 'white',
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
             transform : [
     {
    scaleX : -1
     }
    ]
  },
  animatedImg : {
   height: 90,
    width: 90,
    resizeMode: 'contain',
  }
})

export default AppLoader;
