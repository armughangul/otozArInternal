import React from 'react';
import {Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {AiSearchManagerType} from '../Manager/AiSearchManager';
import {font} from '../../../utilis/AppStyle';
import { AppImages } from '../../../utilis/AppConstant';
interface Props {
  value?: string;
  showMic? : boolean,
  onChange : (txt : string)=>void,
  isReadonly? : boolean,
  onMic? : ()=>void
}
const AiSearchFieldView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TextInput
      readOnly = {props.isReadonly}
      value={props.value}
        multiline
        placeholder="What are you looking for? Try something like: “I want to see Elantra, black in $60000."
        numberOfLines={0}
        style={{
          ...style.messageInput,
        }}
        onChangeText={txt => {
          props.onChange(txt)
        }}
          onKeyPress={({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss()
    }
  }}
      />
      {
      props.showMic &&
      <TouchableWithoutFeedback
      onPress={()=>props.onMic && props.onMic()}
      >
        <Image
        style = {{
            ...style.voiceIcon
        }}
        source={AppImages.Common.voiceMic}
        />
      </TouchableWithoutFeedback>
      }
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    backgroundColor: AppColors.primaryOP(0.03),
    height: 144,
    borderWidth: 1,
    borderColor: AppColors.primaryOP(0.6),
    borderRadius: 8,
    padding: 10,
  },
  messageInput: {
    flex: 1,
    ...font(12),
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  voiceIcon : {
    height : 24,
    width : 16,
    resizeMode : "contain",
    alignSelf : "flex-end"
  }
});
export default AiSearchFieldView;
