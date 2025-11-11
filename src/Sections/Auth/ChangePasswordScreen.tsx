import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import PaddingView from '../../components/Padding/PaddingView';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import SimpleInput from '../../components/Input/SimpleInput';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import AuthManager from './Manager/AuthManager';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TopBar from '../../components/TopBar/TopBar';
const ChangePasswordScreen = (props: ScreenProps) => {
  const manager = AuthManager();
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        title="Change Password"
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <View
        style={{
          ...style.paddingView,
        }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <PaddingView height={20} />
          <SimpleInput
            onShowHide={() => {
              manager.setCurrentShowPass(!manager.currentShowPass);
            }}
            title="Current Password"
            placeHolder="Enter Current Password"
            onChangeValue={txt => {
              manager.currentPass.current = txt;
            }}
            isCompulsory={true}
            isPass={true}
            isHide={manager.currentShowPass}
          />
          <SimpleInput
            onShowHide={() => {
              manager.setNewShowPass(!manager.newShowPass);
            }}
            title="New Password"
            placeHolder="Enter New Password"
            onChangeValue={txt => {
              manager.newPass.current = txt;
            }}
            isCompulsory={true}
            isPass={true}
            isHide={manager.newShowPass}
          />
          <SimpleInput
            onShowHide={() => {
              manager.setNewConfirmShowPass(!manager.newConfirmShowPass);
            }}
            title="Confirm Password"
            placeHolder="Enter Confirm Password"
            onChangeValue={txt => {
              manager.newConfirmPass.current = txt;
            }}
            isCompulsory={true}
            isPass={true}
            isHide={manager.newConfirmShowPass}
          />
          <PaddingView height={30} />
        </KeyboardAwareScrollView>
      </View>
      <BorderBtn
        isSelected={true}
        onPress={() => {
           manager.changePassword(props);
        }}
        btnStyle={style.btnStyle}
        title={'Confirm'}
      />
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
    marginHorizontal: AppHorizontalMargin,
  },
});

export default ChangePasswordScreen;
