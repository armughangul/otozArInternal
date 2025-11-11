import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    model : any,

}
const SingleInfoView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Image
        source={props.model.image}
        style = {{
            ...style.iconStyle
        }}
        />
        <Text
        style = {{
            ...style.valueStyle
        }}
        >
            {
                props.model.value
            }
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : AppColors.white(1),
        marginRight : 10,
        paddingHorizontal : 10,
        height : 26,
        borderRadius : 16
    },
    iconStyle : {
        height :12,
        width : 12,
        resizeMode : "contain"
    },
    valueStyle : {
        ...font(12,FontWeight.Medium),
        marginLeft :4,
        color : AppColors.descColor
    }
})

export default SingleInfoView
