import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
    type : number
}
const BannerBottomBtn = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        {
            props.type == 0 &&
            <Text
            style = {{
                ...style.descStyle
            }}
            >
                99% AI Matching
            </Text>
        }
        {
            (props.type == 1 || props.type == 2) &&
            <TouchableWithoutFeedback>
                <View
                style = {{
                    ...style.btnStyle
                }}
                >
                    <Text
                    style = {{
                        ...style.btnTitleStyle
                    }}
                    >
                        {props.type == 1 ? "Bid Now" : "Join the Auction"}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row" ,
        alignItems : "center",
        justifyContent : "flex-start"
    },
    btnStyle : {
        height : 28,
        backgroundColor : AppColors.white(0.5),
        paddingHorizontal : 10,
        justifyContent : "center",
        borderRadius : 4,
    },
    descStyle : {
        ...font(14,FontWeight.SemiBold),
        color : AppColors.primary
    },
    btnTitleStyle : {
        ...font(12,FontWeight.Regular)
    }
})
export default BannerBottomBtn
