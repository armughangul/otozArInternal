import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    title : string
}
const SectionHeader = (props : Props) => {
    console.log("section header loaded ",props.title)
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
            {props.title}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        justifyContent : "center",
    },
    titleStyle : {
        ...font(16,FontWeight.Bold)
    }
})

export default SectionHeader
