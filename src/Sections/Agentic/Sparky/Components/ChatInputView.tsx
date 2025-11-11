import React from 'react'
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { appShadow } from '../../../../utilis/AppStyle'
import { AppImages } from '../../../../utilis/AppConstant'
interface Props {
    txt : string,setTxt : (txt :string)=>void,
    onSend : ()=>void
}
const ChatInputView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
                <TouchableWithoutFeedback>
            <Image
            source={AppImages.Common.voiceLargeIcon}
            style = {{
                ...style.voiceIcon
            }}
            />
        </TouchableWithoutFeedback>
        <TextInput
        value={props.txt}
        style = {{
            ...style.inputStyle
        }}
        onChangeText={(txt)=>props.setTxt(txt)}
        />
        <TouchableWithoutFeedback
        onPress={()=>props.onSend()}
        >
            <Image
            source={AppImages.Common.send}
            style = {{
                ...style.sendImage
            }}
            />
        </TouchableWithoutFeedback>
    </View>
  )
}
const style = StyleSheet.create({
    mainView: {
        backgroundColor : AppColors.white(1),
        ...appShadow(),
        flexDirection : "row",
        alignItems : "center",
        height : 60,
        paddingHorizontal : 10
    },
    inputStyle : {
        height : 45,
        flex : 1,
        borderRadius : 20,
        borderWidth : 0.5,
        borderColor : AppColors.orColor,
        paddingHorizontal : 10,
    },
    sendImage : {
        height : 40,
        width : 40,
        resizeMode : "contain",
        marginLeft : 10
    },
       voiceIcon : {
        height : 40,
        width : 40,
        resizeMode : "contain",
        marginRight : 10
    }
})

export default ChatInputView
