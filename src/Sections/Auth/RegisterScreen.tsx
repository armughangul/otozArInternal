import React, { useEffect } from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import AuthTopBar from './Components/AuthTopBar';
import CreateAccountView from './Components/Register/CreateAccountView';
import SocialBtn from './Components/SocialBtn';
import OrView from './Components/OrView';
import PaddingView from '../../components/Padding/PaddingView';
import OptionTxt from './Components/OptionTxt';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleInput from '../../components/Input/SimpleInput';
import SimpleInputDropDown from '../../components/Input/SimpleInputDropDown';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import ConfirmView from './Components/ConfirmView';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import {Routes} from '../../utilis/Routes';
import AuthManager from './Manager/AuthManager';
import DropDownModal from '../Journey/Components/DropDown/DropDownModal';
import CommonManager from '../../utilis/CommonManager';

const RegisterScreen = (props: ScreenProps) => {
  const manager = AuthManager();
  useEffect(()=>{manager.onSignupInitialize()},[])
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
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...style.paddingView,
        }}>
        <CreateAccountView />
        <PaddingView height={10} />
        <SimpleInput
          placeHolder="Enter Name"
          isCompulsory={true}
          title="Name"
          value={manager.name.current}
          onChangeValue={value => {
            manager.name.current =value;
          }}
        />
        <SimpleInput
          isReadonly = {manager.socialParam != null}
          placeHolder="Enter Email"
          isCompulsory={true}
          title="Email"
          value={manager.registerMail.current}
          onChangeValue={value => {
            manager.registerMail.current = value;
          }}
        />
        <SimpleInputDropDown
        value={manager.country ? manager.country.name : ""}
          onPress={() => {
            manager.setModelObj({
              show: true,
              data: CommonManager.shared.countriesList,
              title: 'Countries',
              type: 0,
            });
          }}
          placeHolder="Select Country"
          title="Country"
          isCompulsory={true}
        />
        <PhoneNumberInput
        country={manager.country}
          placeHolder="Number"
          title="Phone Number"
          isCompulsory={true}
          value={manager.phoneNo.current}
          onChangeValue={(txt)=>manager.phoneNo.current = txt}
        />
        {!manager.socialParam &&
        <View>
           <SimpleInput
          onShowHide={() => {
            manager.setRegisterShowPass(!manager.registerShowPass)
          }}
          title="Password"
          placeHolder="Enter Password"
          onChangeValue={(txt) => {
            manager.registerPass.current = txt
          }}
          isCompulsory={true}
          isPass={true}
          isHide={manager.registerShowPass}
        />
        <SimpleInput
          onShowHide={() => {
          manager.setRegisterConfirmShowPass(!manager.registerConfirmShowPass)
          }}
          title="Confirm Password"
          placeHolder="Enter Confirm Password"
          onChangeValue={(txt) => {
            manager.registerConfirmPass.current = txt
          }}
          isCompulsory={true}
          isPass={true}
          isHide={manager.registerConfirmShowPass}
        />
        </View>
        }
       
        
        <ConfirmView
        onFill={()=>manager.setAgree(!manager.agree)}
        isFill = {manager.agree}
          onTerms={() => props.navigation.push(Routes.TermsnCondition)}
          onPrivacy={() => props.navigation.push(Routes.PrivacyPolicyScreen)}
        />
        <BorderBtn
          isSelected={true}
          btnStyle={{
            ...style.btnStyle,
          }}
          onPress={() => {
            manager.socialParam ? manager.socialSignUp(props) : manager.onSignup(props)
          }}
          title="Sign Up"
        />
      </KeyboardAwareScrollView>
      <BottomAppSafeArea />
      {manager.modelObj && (
        <DropDownModal
          onSelect={index => {
            manager.onSelectCountry(index)
          }}
          onClose={() => {
            manager.setModelObj(null);
          }}
          model={manager.modelObj}
        />
      )}
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
    marginTop: 20,
  },
});

export default RegisterScreen;
