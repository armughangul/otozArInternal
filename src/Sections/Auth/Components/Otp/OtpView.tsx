import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { AppColors } from '../../../../utilis/AppColors';
interface Props {
  onChangeTxt : (txt : string) =>void
}
const OtpView = (props : Props) => {
  return (
    <View style={styles.container}>
      <OTPTextInput
      offTintColor={AppColors.seperatorColor}
      tintColor={AppColors.primary}
        disableFullscreenUI={true}
        containerStyle={{
          marginTop: 0,
        }}
        handleTextChange={txt => {
          props.onChangeTxt(txt)
        }}
        inputCount={6}
        textInputStyle={{}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    backgroundColor: 'blue',
    color: 'white',
    width: 60,
    height: 60,
    fontSize: 20,
  },
});

export default React.memo(OtpView);
