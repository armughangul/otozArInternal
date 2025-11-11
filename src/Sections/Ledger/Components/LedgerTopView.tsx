import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import RNSplash from "react-native-splash-screen"
import { AppHorizontalMargin } from '../../../utilis/AppConstant'
import { font, FontWeight } from '../../../utilis/AppStyle'
interface Props {
    total : string,
    perCar : string
}
const LedgerTopView = (props : Props) => {
  return (
    <View
    style= {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.topView
        }}
        >
            <View
            style = {{
                ...style.blockView
            }}
            >
                <Text
                style = {{
                    ...style.titleStyle
                }}
                >
                    Total
                </Text>
            </View>
            <View
            style = {{
                ...style.blockView
            }}
            >
                <Text
                style = {{
                    ...style.titleStyle
                }}
                >
                    Balance
                </Text>
                      <Text
                style = {{
                    ...style.priceTxt
                }}
                >
                    {props.total}
                </Text>
            </View>
              <View
            style = {{
                ...style.blockView
            }}
            >
                <Text
                style = {{
                    ...style.titleRightStyle
                }}
                >
                    Balance Per car
                </Text>
                      <Text
                style = {{
                    ...style.balanceTxt
                }}
                >
                {props.perCar}
                </Text>
            </View>
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        backgroundColor:AppColors.white(1),
        paddingLeft : AppHorizontalMargin,
        paddingRight : AppHorizontalMargin + 10,
        paddingVertical : 5
    },
    topView : {
        flexDirection : "row",
    },
    blockView : {
        flex : 1,
    },
    titleStyle : {
        ...font(14,FontWeight.SemiBold),
        // textAlign : "left"
    },
     titleRightStyle : {
        ...font(14,FontWeight.SemiBold),
        textAlign : "right"
    },
    priceTxt : {
               ...font(16,FontWeight.SemiBold),
               color : AppColors.redColor,
               marginTop : 3,
                       textAlign : "left"

    },
    balanceTxt : {
        ...font(14),
        textAlign : "right",
        marginTop : 3
    }
})

export default LedgerTopView
