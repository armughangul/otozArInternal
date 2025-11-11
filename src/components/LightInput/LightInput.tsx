import React, { useRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColors } from '../../utilis/AppColors';
import { font } from '../../utilis/AppStyle';
interface Props {
    title : string,
    placeHolder : string,
    onChangeTxt : (txt : string)=>void,
    value : string,
    inputRef : React.RefObject<TextInput | null>
}
const LightInput = (props : Props) => {
    const valueRef = useRef<string>(props.value)
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
        </Text>
        <TextInput
        returnKeyType={"done"}
        keyboardType={"number-pad"}
        defaultValue={props.value}
        placeholder={props.placeHolder}
        style = {{
            ...style.inputView
        }}
        onChangeText={(txt)=>{
            valueRef.current = txt
        }}
        onEndEditing={()=>{
            if (valueRef.current != ""){
          props.onChangeTxt(valueRef.current)
            }
        }}
        />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flex : 1
    },
    titleStyle : {
        ...font(14)
    },
  inputView: {
    height: 48,
    borderWidth: 1,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.primaryOP(0.03),
    borderRadius: 8,
    marginTop : 5,
    paddingHorizontal : 10,
    ...font(14)
  },
});


export default React.memo(LightInput)
