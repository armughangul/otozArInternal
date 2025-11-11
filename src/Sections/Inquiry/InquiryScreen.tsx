import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import InquiryCard from './Components/InquiryCard';
import InquiryManager from './Manager/InquiryManager';
import {AppColors} from '../../utilis/AppColors';
import SimpleInput from '../../components/Input/SimpleInput';
import SimpleInputDropDown from '../../components/Input/SimpleInputDropDown';
import PaddingView from '../../components/Padding/PaddingView';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import AskView from './Components/AskSection/AskView';
import PriceView from './Components/PriceView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AutoFillView from './Components/AutoFillSection/AutoFillView';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import InquiryMessageView from './Components/InquiryMessageView';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import DropDownModal from '../Journey/Components/DropDown/DropDownModal';
import CommonManager from '../../utilis/CommonManager';
import TopBar from '../../components/TopBar/TopBar';

const InquiryScreen = (props: ScreenProps) => {
  const manager = InquiryManager(props);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...AppStyle.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        title="Inquiry"
        onBack={() => props.navigation.goBack()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...style.paddingView,
        }}>
        {manager.inquiryCar && <InquiryCard car={manager.inquiryCar} />}
        <View
          style={{
            ...style.borderStyle,
          }}
        />
        <SimpleInput
          value={manager.name.current}
          isReadonly={true}
          isCompulsory={true}
          title="Name"
        />
        <SimpleInput
          value={manager.email.current}
          isReadonly={true}
          isCompulsory={true}
          title="Email"
        />
        <View
          style={{
            ...AppStyle.commonHoriStyle,
          }}>
          <SimpleInputDropDown
            value={manager.country?.name ?? ''}
            placeHolder="Select Country"
            title="Country"
            isCompulsory={true}
            onPress={() => {
              manager.setModelObj({
                show: true,
                data: CommonManager.shared.countriesList,
                title: 'Countries',
                type: 0,
              });
            }}
          />
          <PaddingView width={20} />
          <SimpleInputDropDown
          value={manager.port?.name ?? ""}
            placeHolder="Select Port"
            title="Port"
            isCompulsory={true}
            onPress={()=>{
                manager.setModelObj({
                show: true,
                data: manager.portListRef.current,
                title: 'Ports',
                type: 1,
              });
            }}
          />
        </View>
        <PhoneNumberInput
        value={
          manager.phoneNo.current
        }
          country={manager.country}
          onChangeValue={txt => {manager.phoneNo.current = txt}}
          placeHolder="Number"
          title="Phone Number"
          isCompulsory={true}
        />
        <AskView
        manager={manager}
        />
        <PriceView manager={manager} />
        <View
          style={{
            ...style.borderStyle,
          }}
        />
        <AutoFillView
        manager={manager}
        />
        <InquiryMessageView
        manager={manager}
        />
        <BorderBtn
          title="Inquiry"
          onPress={() => {
          manager.onInquiry(props)
          }}
        />
      </KeyboardAwareScrollView>
      <BottomAppSafeArea />
      {manager.modelObj && (
        <DropDownModal
          onSelect={index => {manager.onSelectItem(index)}}
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
  borderStyle: {
    ...AppStyle.commonBorder,
    marginTop: 20,
    backgroundColor: AppColors.seperatorColor,
  },
  paddingView: {
    ...AppStyle.mainView,
    marginHorizontal: AppHorizontalMargin,
  },
});

export default InquiryScreen;
