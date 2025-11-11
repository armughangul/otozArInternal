import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { CarDetailManagerType } from '../../Manager/CarDetailManager'
import { AppColors } from '../../../../utilis/AppColors'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import SingleDetailTopTab from './SingleDetailTopTab'
interface Props {
    manager : CarDetailManagerType
}
const DetailTopTab = (props : Props) => {
    const itemWidth = (Dimensions.get("screen").width - (AppHorizontalMargin * 2))/2
    const animatedPaddingValue = useSharedValue(0)
    useEffect(()=>{
        moveingTabAnimation(props.manager.tab)
    },[props.manager.tab])

    const selectedBoderStyle = useAnimatedStyle(()=>{
        return {
            marginLeft : animatedPaddingValue.value
        }
    })
  const moveingTabAnimation = (tab : number) => {
    animatedPaddingValue.value = withTiming(
      tab == 0 ? 0 : itemWidth,
      {
        duration: 300,
      },
      finished => {
        if (finished) {
        }
      },
    );
  };
    return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style ={{
            ...style.innerView
        }}
        >
            <SingleDetailTopTab
            title='Specifications'
            onPress={()=>props.manager.setTab(0)}
            selected = {props.manager.tab == 0}
            />
              <SingleDetailTopTab
            title='Features'
            onPress={()=>props.manager.setTab(1)}
            selected = {props.manager.tab == 1}
            />
        </View>
        <View
        style = {{
            ...style.borderView
        }}
        >  
        <Animated.View
        style = {[
            style.selectedBorderView,selectedBoderStyle
        ]}
        />
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 50
    },
    innerView : {
        flex : 1,
        flexDirection : "row"
    },
    borderView : {
        height : 0.9,
        backgroundColor : AppColors.seperatorColor
    },
    selectedBorderView : {
        flex :1,
        width : "50%",
        backgroundColor : AppColors.primary
    }
})
export default DetailTopTab
