import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { AppImages } from '../../../../utilis/AppConstant'
interface Props {
    startTxt : string,
}
const NextMsg = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.topView
        }}
        >
            <Image
            style = {{
                ...style.nextIconStyle
            }}
            source={AppImages.Common.nextMsgIcon}
            />
            <Text
            style = {{
                ...style.nxtStyle
            }}
            >
                Next
            </Text>
        </View>
        <Text
        style = {{
            ...style.txt1Style
        }}
        >
            {props.startTxt}
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        paddingHorizontal : 8,
        paddingVertical : 10,
        borderWidth : 1,
        borderColor : AppColors.redColor,
        backgroundColor : AppColors.bgRed,
        borderRadius : 8,
        marginTop : 15
    },
    topView : {
        flexDirection : "row",
        alignItems : "center"
    },
    nextIconStyle : {
        height : 12,
        width: 16,
        resizeMode : "contain"
    },
    txt1Style : {
        ...font(12),
        color : AppColors.redColor
    },
     txt2Style : {
        ...font(12,FontWeight.SemiBold),
        color : AppColors.redColor
    },
    nxtStyle : {
        ...font(14,FontWeight.Bold),
        color : AppColors.redColor,
        marginLeft : 5
    }
})

export default React.memo(NextMsg)
