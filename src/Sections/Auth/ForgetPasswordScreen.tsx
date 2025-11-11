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
import ForgetPassView from './Components/Forget/ForgetPassView';
import SimpleInput from '../../components/Input/SimpleInput';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import {Routes} from '../../utilis/Routes';
import AuthManager from './Manager/AuthManager';
const ForgetPasswordScreen = (props: ScreenProps) => {
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
        <ForgetPassView />
        <PaddingView height={20} />
        <SimpleInput
        onChangeValue={(txt)=>manager.forgetEmail.current = txt}
          title="Email"
          placeHolder="Enter Email"
          isCompulsory={true}
        />
        <PaddingView height={30} />
        <BorderBtn
          onPress={() => {
            manager.forgetPassword(manager.forgetEmail.current,props)
          }}
          btnStyle={style.btnStyle}
          title={'Send OTP'}
        />
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

export default ForgetPasswordScreen;
