import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../../utilis/AppColors'
import { font, FontWeight } from '../../../../../utilis/AppStyle'
import { showFile } from '../../../../../utilis/SharingUtil'
const CourierDetailView = () => {
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
            <Text
            style = {{
                ...style.nxtStyle
            }}
            >
                Courier Details
            </Text>
        </View>
        <Text
        style = {{
            ...style.txt1Style
        }}
        >
            We dispatch original documents by <TouchableWithoutFeedback
            onPress={()=>{
                showFile("https://www.dhl.com/jp-en/home.html")
            }}
            >
                <Text
            style = {{
                ...style.headLine
            }}
            >
                 DHL
                </Text>
                </TouchableWithoutFeedback> or <TouchableWithoutFeedback
                onPress={()=>{
                    showFile("https://otoz.ai/en")
                }}
                >
                    <Text
                  style = {{
                ...style.headLine
            }}
                >
                    EMS 
                    </Text>
                    </TouchableWithoutFeedback>. Should you have preference please contact us.
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        paddingVertical : 10,
        borderRadius : 8,
        marginTop : 5
    },
    topView : {
        flexDirection : "row",
        alignItems : "center"
    },
    txt1Style : {
        ...font(12,FontWeight.Light),
    },
    nxtStyle : {
        ...font(14,FontWeight.Bold),
    },
    headLine : {
               ...font(14,FontWeight.SemiBold),
               color :AppColors.primary
    }
})

export default React.memo(CourierDetailView)
