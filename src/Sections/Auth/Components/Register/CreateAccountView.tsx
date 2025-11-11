import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppImages } from '../../../../utilis/AppConstant'
import OtozIcon from "../../../../assets/newImages/Auth/svgs/otozIcon.svg"
import { font, FontWeight } from '../../../../utilis/AppStyle'
const CreateAccountView = () => {
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
            width={81}
            height={20}
            />
        </View>
        <Text
        style = {{
            ...style.createTxt
        }}
        >
            Create an Account
        </Text>
        <Text
        style = {{
            ...style.descTxt
        }}
        >
            Join us to get started
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
        flexDirection : "row",
    },
    carIcon : {
        height : 20,
        width : 46.46,
        resizeMode : "contain",
        marginRight : 5
    },
    createTxt : {
        ...font(24,FontWeight.SemiBold),
        marginTop : 10
    },
    descTxt : {
        ...font(14),
        marginTop : 5
    }
})

export default CreateAccountView
