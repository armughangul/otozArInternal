import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../utilis/AppColors'
import { AppHorizontalMargin } from '../../utilis/AppConstant'
import { font } from '../../utilis/AppStyle'

interface Props {
    title : string
}
const DescTopBar = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Text
        style = {{
            ...style.resultStyle
        }}
        >
        {props.title}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginHorizontal : AppHorizontalMargin,
        marginTop : 15,
        },
          resultStyle : {
              ...font(12),
              color : AppColors.descColor
            },
})

export default DescTopBar
