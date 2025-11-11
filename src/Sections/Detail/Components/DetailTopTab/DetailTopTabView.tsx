import React, { useEffect } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { AppColors } from '../../../../utilis/AppColors'
import { CarDetailManagerType } from '../../Manager/CarDetailManager'
import DetailTopTab from './DetailTopTab'
import { AppStyle } from '../../../../utilis/AppStyle'
import SingleItem from './item/SingleItem'
import ItemView from './item/ItemView'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
interface Props {
    manager : CarDetailManagerType
}
const DetailTopTabView = (props : Props) => {
    const itemWidth = (Dimensions.get("screen").width - (AppHorizontalMargin * 2))
    const animatedPaddingValue = useSharedValue(0)
        useEffect(()=>{
            moveingTabAnimation(props.manager.tab)
        },[props.manager.tab])
    
        const selectedViewStyle = useAnimatedStyle(()=>{
            return {
                transform : [{
                    translateX : animatedPaddingValue.value
                }]
            }
        })
      const moveingTabAnimation = (tab : number) => {
        animatedPaddingValue.value = withTiming(
          tab == 0 ? 0 : -itemWidth,
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
        <DetailTopTab
        manager={props.manager}
        />
        <Animated.View
        style = {[
            style.pagerView,
            selectedViewStyle
        ]}
        >
            {
            props.manager.tabList.current.map((item,index)=>{
                return(
                    <ItemView
                    key={`${index}`}
                    list={item}
                    />
                )
            })
            }
        </Animated.View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginHorizontal : AppHorizontalMargin,
        backgroundColor : AppColors.white(0.2),
        borderColor : AppColors.white(1),
        borderWidth :1,
        borderRadius : 6,
        overflow : "hidden",
    },
    pagerView : {
        flexDirection : "row",
        width : ((Dimensions.get("screen").width - (AppHorizontalMargin * 2)) * 2),
        overflow : "hidden"
    }
})

export default DetailTopTabView
