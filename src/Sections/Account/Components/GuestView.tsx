import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin} from '../../../utilis/AppConstant';
import {font} from '../../../utilis/AppStyle';
import {AppColors} from '../../../utilis/AppColors';
import BorderBtn from '../../../components/BorderBtn/BorderBtn';
interface Props {
  onLogin : ()=>void
}
const GuestView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        Sign in and explore
      </Text>
      <BorderBtn
        isSelected={true}
        btnStyle={{
          ...style.btnStyle,
        }}
        onPress={() => {
          props.onLogin()
        }}
        title="Login / Signup"
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginTop: 30,
    marginBottom : 30
  },
  titleStyle: {
    ...font(14),
    color: AppColors.descColor,
    alignSelf: 'center',
  },
  btnStyle: {
    marginTop: 10,
  },
});

export default GuestView;
