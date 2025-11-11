import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import { font } from '../../../utilis/AppStyle'

const OrView = () => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.sliderStyle
        }}
        />
       
        <Text
        style = {{
            ...style.orTxt
        }}
        >
            Or
        </Text>
          <View
        style = {{
            ...style.sliderStyle
        }}
        />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        alignItems : "center",
        marginVertical : 20
    },
    sliderStyle : {
        flex : 1,
        height : 1,
        backgroundColor : AppColors.seperatorColor
    },
    orTxt : {
        ...font(14),
        color : AppColors.orColor,
        marginHorizontal : 10
    }
})
export default OrView
