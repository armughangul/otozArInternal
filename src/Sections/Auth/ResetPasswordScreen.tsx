import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import AuthTopBar from './Components/AuthTopBar';
import PaddingView from '../../components/Padding/PaddingView';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import SimpleInput from '../../components/Input/SimpleInput';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import {Routes} from '../../utilis/Routes';
import AuthManager from './Manager/AuthManager';
import ResetPassView from './Components/Reset/ResetPassView';
import OtpView from './Components/Otp/OtpView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ResetPasswordScreen = (props: ScreenProps) => {
  const manager = AuthManager();
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <AuthTopBar
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <View
        style={{
          ...style.paddingView,
        }}>
          <KeyboardAwareScrollView
          showsVerticalScrollIndicator = {false}
          >

        <ResetPassView />
        <PaddingView height={20} />
        <OtpView onChangeTxt={txt => (manager.otpCode.current = txt)} />
        <SimpleInput
          onShowHide={() => {
            manager.setRegisterShowPass(!manager.registerShowPass);
          }}
          title="Password"
          placeHolder="Enter Password"
          onChangeValue={txt => {
            manager.registerPass.current = txt;
          }}
          isCompulsory={true}
          isPass={true}
          isHide={manager.registerShowPass}
        />
        <SimpleInput
          onShowHide={() => {
            manager.setRegisterConfirmShowPass(
              !manager.registerConfirmShowPass,
            );
          }}
          title="Confirm Password"
          placeHolder="Enter Confirm Password"
          onChangeValue={txt => {
            manager.registerConfirmPass.current = txt;
          }}
          isCompulsory={true}
          isPass={true}
          isHide={manager.registerConfirmShowPass}
        />
        <PaddingView height={30} />
        <BorderBtn
          onPress={() => {
            console.log(manager.otpCode.current)
            console.log(manager.registerPass)
            console.log(manager.registerConfirmPass)
            manager.resetPassword(props);
          }}
          btnStyle={style.btnStyle}
          title={'Send OTP'}
        />
                  </KeyboardAwareScrollView>
      </View>
      <BottomAppSafeArea />
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
  paddingView: {
    marginHorizontal: AppHorizontalMargin,
    flex: 1,
  },
  btnStyle: {},
});

export default ResetPasswordScreen;
