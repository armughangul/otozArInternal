import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'

const AiDesc = () => {
  return (
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
            AI Match Inquiry
        </Text>
        <Text
        style = {{
            ...style.descStyle
        }}
        >
            Secure your AI-matched car now by completing this specialized inquiry form for priority service.
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 10,
    },
    titleStyle : {
        ...font(18,FontWeight.SemiBold)
    },
    descStyle : {
        ...font(14),
        color : AppColors.descColor
    }
})

export default AiDesc
