import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppImages } from '../../../../utilis/AppConstant'
import OtozIcon from "../../../../assets/newImages/Auth/svgs/otozIcon.svg"
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    email : string
}
const OtpTopView = (props : Props) => {
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
            source={AppImages.Journey.journeyCar}
            style = {{
                ...style.carIcon
            }}
            />
            <OtozIcon
            width={105}
            height={30}
            />
        </View>
        <Text
        style = {{
            ...style.createTxt
        }}
        >
       OTP Verification
        </Text>
        <Text
        style = {{
            ...style.descTxt
        }}
        >
            Enter the OTP sent to
            <Text
            style = {{
                ...font(14,FontWeight.SemiBold)
            }}
            >
              {" "}{props.email}{" "}
            </Text>
        </Text>
          <Text
        style = {{
            ...style.descTxt
        }}
        >
            Enter 6 - Digit Code
        </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        alignSelf : "center",
        marginTop : 20,
        alignItems : "center"
    },
    topView : {
        alignItems : "center"
    },
    carIcon : {
        height : 40,
        width : 105,
        resizeMode : "contain",
        marginBottom : 10,
    },
    createTxt : {
        ...font(24,FontWeight.SemiBold),
        marginTop : 20
    },
    descTxt : {
        ...font(14),
        marginTop : 8,
        textAlign : "center"
    }
})

export default OtpTopView
