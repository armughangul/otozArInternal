import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { privacyTxt } from '../../../utilis/AppStrings'

const PrivacyHeader = () => {
  return (
    <Text
    style = {{
        ...style.mainView
    }}
    >
        {
            privacyTxt.header
        }
    </Text>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...font(14,FontWeight.Light),
        paddingVertical : 10
    }
})

export default PrivacyHeader
