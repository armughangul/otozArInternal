import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
interface Props {
    title : string,
    desc : string
}
const SinglePrivacyDetailItem = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        {props.title && props.title != "" &&
        <Text
        style = {{
            ...style.title
        }}
        >
            {props.title}
        </Text>
        } 
        <Text
        style = {{
            ...style.desc
        }}
        >
            {props.desc}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        marginTop : 5
    },
    title : {
        ...font(14,FontWeight.SemiBold),
        marginRight : 5
    },
    desc : {
        ...font(14,FontWeight.Light)
    }
})

export default SinglePrivacyDetailItem
