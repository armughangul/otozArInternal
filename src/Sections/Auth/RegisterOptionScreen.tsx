import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {AppHorizontalMargin, AppImages, ScreenProps} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import AuthTopBar from './Components/AuthTopBar';
import CreateAccountView from './Components/Register/CreateAccountView';
import SocialBtn from './Components/SocialBtn';
import OrView from './Components/OrView';
import PaddingView from '../../components/Padding/PaddingView';
import OptionTxt from './Components/OptionTxt';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import { Routes } from '../../utilis/Routes';
import AuthManager from './Manager/AuthManager';

const RegisterOptionScreen = (props : ScreenProps) => {
  const manager = AuthManager()
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <AuthTopBar onBack={() => {
    props.navigation.goBack()
      }} />
      <View
        style={{
          ...style.paddingView,
        }}>
        <CreateAccountView />
        <PaddingView height={30} />
        <SocialBtn
        onPress={()=>
        {
            props.navigation.push(Routes.RegisterScreen)
        }
        }
          image={AppImages.Auth.emailIcon}
          title="Continue with Email"
        />
        <OrView />
                <PaddingView height={10} />

        <SocialBtn
        onPress={()=>{
          manager.authGoogle(props)
        }}
          image={AppImages.Auth.gmailIcon}
          title="Continue with Google"
        />
        <SocialBtn
        onPress={()=>{
          manager.authApple(props)
        }}
          image={AppImages.Auth.appleIcon}
          title="Continue with Apple"
        />
        <SocialBtn
        onPress={()=>{
         manager.authFacebook(props)
        }}
          image={AppImages.Auth.facebookIcon}
          title="Continue with Facebook"
        />
      </View>
       <OptionTxt
              onPress={()=>{
                props.navigation.goBack()
              }}
              firstTxt='Already have an account?'
              secondTxt='Sign In'
              />
              <BottomAppSafeArea/>
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
});

export default RegisterOptionScreen;
