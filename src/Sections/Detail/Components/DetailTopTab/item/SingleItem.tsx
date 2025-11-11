import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { AppStyle, font, FontWeight } from '../../../../../utilis/AppStyle'
import { AppColors } from '../../../../../utilis/AppColors'
interface Props {
    title : string,
    value : string,
    hideBorder? : boolean,
    txtStyle? : StyleProp<TextStyle>
}
const SingleItem = (props : Props) => {
  return (
    <View>
        <View
        style = {{
            ...style.mainView
        }}
        >
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                {props.title}
            </Text>
                 <Text
                 style = {[{
                    ...style.valueStyle
                 },props.txtStyle && props.txtStyle]}
                 >
                {props.value}
            </Text>
        </View>
        {
            !props.hideBorder &&
  <View
        style = {{
            ...style.borderView
        }}
        />
        }
      
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 5,
        paddingVertical : 12
    },
    titleStyle : {
        ...font(12,FontWeight.Medium)
    },
     valueStyle : {
        ...font(12),
        color : AppColors.darkLight
    },
   borderView : {
          height : 0.6,
          backgroundColor : AppColors.seperatorColor
      },
})
export default SingleItem
