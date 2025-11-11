import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {AppColors} from '../../utilis/AppColors';
import SimpleInputDropDown from '../../components/Input/SimpleInputDropDown';
import PaddingView from '../../components/Padding/PaddingView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import DropDownModal from '../Journey/Components/DropDown/DropDownModal';
import CommonManager from '../../utilis/CommonManager';
import TopBar from '../../components/TopBar/TopBar';
import InquiryCard from '../Inquiry/Components/InquiryCard';
import SmartMatchManager from './Manager/SmartMatchManager';
import InquiryMessageView from '../Inquiry/Components/InquiryMessageView';
import AiDesc from './Components/AiDesc';

const SmartMatchInquiryScreen = (props: ScreenProps) => {
  const manager = SmartMatchManager(props);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...AppStyle.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        title="Smart Matching"
        onBack={() => props.navigation.goBack()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...style.paddingView,
        }}>
          <Text
          style = {{
            ...style.titleStyle
          }}
          >
            You have selected
          </Text>
        {manager.inquiryCar && <InquiryCard car={manager.inquiryCar} />}
      <AiDesc/>
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
        <View
          style={{
            ...style.borderStyle,
          }}
        />
        <InquiryMessageView
        manager={manager}
        />
        <BorderBtn
          title="Submit"
          onPress={() => {
            manager.onSmartMatchInquiry()
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
  titleStyle : {
    ...font(16,FontWeight.SemiBold),
    marginTop : 10
  }
});

export default SmartMatchInquiryScreen;
