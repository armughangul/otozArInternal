import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { AppStyle, font } from '../../utilis/AppStyle'
import { AppColors } from '../../utilis/AppColors'
import { AppImages } from '../../utilis/AppConstant'
interface Props {
    title? : string
    value? : string,
    onChangeValue? : (value : string)=>void,
    isCompulsory? : boolean,
    isReadonly? : boolean,
    placeHolder? : string,
    isPass? :boolean,
    onShowHide? : ()=>void,
    isHide? : boolean,
}
const SimpleInput = (props : Props) => {
    const inputRef = useRef<TextInput>(null)
    const txtRef = useRef<string>("")
    useEffect(()=>{
        if (props.value && inputRef){
            inputRef.current?.setNativeProps({text : props.value})
        }
    },[])
    useEffect(()=>{
        if (props.value != txtRef.current){
        inputRef.current?.setNativeProps({text : props.value})
        }
    },[props.value])
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
          {
            props.isCompulsory &&
            <Text
            style = {{
                ...style.compulsoryStyle
            }}
            > *
            </Text>
          }
            </Text>   
            <View
            style = {{
                ... props.isReadonly ? style.disableInputView : style.inputView
            }}
            >
                <TextInput
                ref={inputRef}
                secureTextEntry = {props.isHide}
                placeholder={props.placeHolder ?? props.title}
                style = {style.inputFieldStyle}
                editable = {!props.isReadonly}
                onChangeText={(text)=>{
                  txtRef.current = text
                  props.onChangeValue &&  props.onChangeValue(text)
                }}
               
                />
                {
                    props.isPass &&
                    <TouchableWithoutFeedback
                    onPress={()=>{
                      props.onShowHide &&  props.onShowHide()
                    }}
                    >
                        <Image
                        style = {{
                            ...style.passIcon
                        }}
                        source={props.isHide ? AppImages.Auth.showPass : AppImages.Auth.hidePass}
                        />
                    </TouchableWithoutFeedback>
                }
                </View>  
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 20
    },
    titleHori : {
        ...AppStyle.commonHoriStyle
    },
    titleStyle : {
        ...font(14)
    },
    compulsoryStyle : {
        color : AppColors.redColor
    },
    inputView : {
        marginTop : 10,
        height : 48,
        borderColor : AppColors.primary,
        borderWidth : 1,
        borderRadius :8,
        flexDirection : "row",
        alignItems : "center"
    },
      disableInputView : {
        marginTop : 10,
        height : 48,
        borderColor : AppColors.primary,
        borderWidth : 1,
        borderRadius :8,
        flexDirection : "row",
        alignItems : "center",
        backgroundColor : AppColors.primaryBg
    },
    inputFieldStyle : {
        flex :1,
        paddingHorizontal : 8,
        ...font(14)
    },
    passIcon : {
        width : 24,
        resizeMode : "contain",
        marginRight : 10
    }
})

export default SimpleInput
