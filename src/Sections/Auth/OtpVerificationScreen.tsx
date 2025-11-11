import React from 'react';
import {ImageBackground, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
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
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import OtpTopView from './Components/Otp/OtpTopView';
import OtpView from './Components/Otp/OtpView';
import OptionTxt from './Components/OptionTxt';
import AuthManager, { AuthManagerType } from './Manager/AuthManager';
const OtpVerificationScreen = (props: ScreenProps) => {
  const manager = AuthManager()
  const {email} : any = props.route.params
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
      <KeyboardAvoidingView
        style={{
          ...style.paddingView,
        }}>
        <OtpTopView email={email ?? ""} />
        <OtpView
        onChangeTxt={(txt)=>manager.otpCode.current = txt} />
        <PaddingView height={30} />
        <OptionTxt
          onPress={() => {
          }}
          firstTxt="Didn’t receive the code?"
          secondTxt="Resend OTP"
        />
        <BorderBtn
          isSelected={true}
          btnStyle={{
            ...style.btnStyle,
          }}
          onPress={() => {
          manager.confirmEmail(manager.otpCode.current,props)
          }}
          title="Confirm"
        />
      </KeyboardAvoidingView>
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
  btnStyle: {
    marginTop : 30
  },
});

export default OtpVerificationScreen;
