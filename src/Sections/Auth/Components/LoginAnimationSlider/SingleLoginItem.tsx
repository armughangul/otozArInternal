import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';

import { font } from '../../../../utilis/AppStyle'
interface Props {
    title : string,
    animation : any,
    onComplete : ()=>void
}
const SingleLoginItem = (props : Props) => {
    useEffect(()=>{
    return ()=>{
        console.log("ending login view ",props.title)
    }
    },[])
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
         <AnimatedLottieView
                  source={props.animation}
                  style={{...style.lottieView}}
                  autoPlay
                  loop = {false}
                  onAnimationFinish={()=>{
                    props.onComplete()
                  }}
                /> 
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.title}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {},
    lottieView : {
        height : 95,
    },
    titleStyle : {
        ...font(14)
    }
})

export default React.memo(SingleLoginItem)
