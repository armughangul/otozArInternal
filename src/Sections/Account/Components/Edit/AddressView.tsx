import React, { useEffect } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { AccountManagerType } from '../../Manager/AccountManager';
import { AppColors } from '../../../../utilis/AppColors';
import { font } from '../../../../utilis/AppStyle';
import { EditProfileMangerType } from '../../Manager/EditProfileManager';

interface Props {
  manager : EditProfileMangerType
}
const AddressView = (props : Props) => {
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
      </View>
      <View
        style={{
          ...style.messageView,
        }}>
        <TextInput
        ref={props.manager.editTxtInputRef}
          multiline
          placeholder="Address"
          numberOfLines={0}
          style={{
            ...style.messageInput,
          }}
        onChangeText={(txt)=>{
          props.manager.address.current = txt
        }}
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
    height: 96,
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
export default AddressView;
