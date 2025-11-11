import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {font} from '../../../utilis/AppStyle';
import {AppColors} from '../../../utilis/AppColors';

interface Props {
  manager : any
}
const InquiryMessageView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.topHoriView,
        }}>
        <Text
          style={{
            ...style.titleStyle,
          }}>
          Message
        </Text>
        <Text
          style={{
            ...style.countStyle,
          }}>
          {`${props.manager.message.length}/400`}
        </Text>
      </View>
      <View
        style={{
          ...style.messageView,
        }}>
        <TextInput
        value={props.manager.message}
        maxLength={400}
          multiline
          placeholder="Message"
          numberOfLines={0}
          style={{
            ...style.messageInput,
          }}
          onChangeText={(txt)=>props.manager.setMessage(txt)}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginVertical: 20,
  },
  topHoriView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    ...font(14),
  },
  countStyle: {
    ...font(12),
    color: AppColors.txtLightColor,
  },
  messageView: {
    height: 131,
    backgroundColor: AppColors.primaryOP(0.03),
    marginTop: 10,
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    ...font(12),
    textAlign: 'left',
    textAlignVertical: 'top',
  },
});
export default InquiryMessageView;
