import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages } from '../../../utilis/AppConstant';
const Background = ({children} :any) => {
  return (
    <ImageBackground
    style = {{
        ...style.mainView
    }}
    source={AppImages.Home.background}
    >
        {children}
    </ImageBackground>
)
}
const style = StyleSheet.create({
    mainView : {
        flex : 1
    }
})

export default Background
