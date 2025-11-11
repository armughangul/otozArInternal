import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SvgBackground from '../../../components/Svg/SvgBackground';
const QuickBorder = React.lazy(
  () => import('../../../assets/newImages/Account/svgs/aboutUsBorder.svg'),
);
interface Props {
    width : number,
    obj : any
}
import AnimatedLottieView from 'lottie-react-native';
import { font, FontWeight } from '../../../utilis/AppStyle';
const SingleBottomAboutUs = (props : Props) => {
       const animationRef = useRef<any>(null);
        useEffect(() => {
          return () => {
            if (animationRef.current) {
              animationRef.current.pause();
            }
          };
        }, []);
  return (
    <View
    >
          <SvgBackground>
            <QuickBorder
              height={props.width}
              width={props.width}
              preserveAspectRatio="none"
            />
          </SvgBackground>
          <View
          style = {{
            ...style.mainView,
            width : props.width,
            height : props.width
          }}
          >
                 <AnimatedLottieView
                         ref={animationRef}
                                  source={props.obj.anim}
                                  style={{...style.iconAnim}}
                                  autoPlay
                                  loop={true}
                                />
                                <Text
                                style = {{
                                    ...style.titleStyle
                                }}
                                >
                                    {props.obj.title}
                                </Text>
                                  <Text
                                style = {{
                                    ...style.descStyle
                                }}
                                >
                                    {props.obj.desc}
                                </Text>
          </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    iconAnim : {
        height : 36,
        width : 36,
    },
    titleStyle : {
        ...font(18,FontWeight.Bold),
        marginTop : 5
    },
      descStyle : {
        ...font(14,FontWeight.Light),
        marginTop : 8
    }
})

export default SingleBottomAboutUs
