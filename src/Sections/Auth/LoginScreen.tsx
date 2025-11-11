import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import AuthTopBar from './Components/AuthTopBar';
import {AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import LoginAnimationView from './Components/LoginAnimationSlider/LoginAnimationView';
import AuthManager from './Manager/AuthManager';
import SimpleInput from '../../components/Input/SimpleInput';
import ForgetBtn from './Components/ForgetBtn';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import OrView from './Components/OrView';
import SocialBtn from './Components/SocialBtn';
import OptionTxt from './Components/OptionTxt';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import {Routes} from '../../utilis/Routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = (props: ScreenProps) => {
  const manager = AuthManager();
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...AppStyle.mainView,
      }}>
      <TopAppSafeArea />
      <AuthTopBar onBack={() => {
        props.navigation.goBack()
      }} />
      <KeyboardAvoidingView
        style={{
          ...AppStyle.mainView,
        }}>
        <Text
          style={{
            ...style.titleStyle,
          }}>
          Sign in or Sign up
        </Text>
        <KeyboardAwareScrollView
        showsVerticalScrollIndicator = {false}
        >
    <LoginAnimationView manager={manager} />
        <View
          style={{
            ...style.paddingView,
          }}>
          <SimpleInput
            title="Email"
            placeHolder="Enter Email"
            onChangeValue={(value) => {manager.loginEmail.current =value}}
            isCompulsory={true}
          />
          <SimpleInput
            onShowHide={() => {
              manager.setShowPass(!manager.showPass);
            }}
            title="Password"
            placeHolder="Enter Password"
            onChangeValue={(value) => {manager.loginPass.current = value}}
            isCompulsory={true}
            isPass={true}
            isHide={manager.showPass}
          />
          <ForgetBtn onPress={()=>props.navigation.push(Routes.ForgetPasswordScreen)} />
          <BorderBtn
            isSelected={true}
            btnStyle={{
              ...style.btnStyle,
            }}
            onPress={() => {
             manager.onLogin(props)
            }}
            title="Login"
          />
          <OrView />
          <SocialBtn
          onPress={()=>manager.authGoogle(props)}
            image={AppImages.Auth.gmailIcon}
            title="Continue with Google"
          />
          {
            Platform.OS == "ios" &&
      <SocialBtn
          onPress={()=>manager.authApple(props)}
            image={AppImages.Auth.appleIcon}
            title="Continue with Apple"
          />
          }
    
          <SocialBtn
          onPress={()=>manager.authFacebook(props)}
            image={AppImages.Auth.facebookIcon}
            title="Continue with Facebook"
          />
        </View>
        </KeyboardAwareScrollView>
    
      </KeyboardAvoidingView>
      <OptionTxt
        onPress={() => {
          props.navigation.push(Routes.RegisterOptionScreen);
        }}
        firstTxt="Don’t have an account?"
        secondTxt="Sign Up"
      />
      <BottomAppSafeArea />
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  titleStyle: {
    ...font(18, FontWeight.SemiBold),
    alignSelf: 'center',
    marginTop: 2,
  },
  paddingView: {
    marginHorizontal: AppHorizontalMargin,
  },
  btnStyle: {
    marginTop: 20,
  },
});
export default LoginScreen;
