import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {InquiryManagerType} from './Manager/InquiryManager';
import TopBar from '../../components/TopBar/TopBar';
import SingleRowCarItem from '../MainSearch/Components/Cards/SingleRowCarItem';
import InquiryCarDetail from './Components/Detail/InquiryCarDetail';

const InquiryDetailScreen = (props: ScreenProps) => {
  const manager: InquiryManagerType = props.route?.params?.manager;
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar title="Inquiry Detail" onBack={() => props.navigation.goBack()} />
        {
            manager.selectedInquiryItem.current &&
      <View
        style={{
          ...style.paddingView,
        }}>
            <ScrollView>

        <SingleRowCarItem
          car={manager.selectedInquiryItem.current?.car}
          onPress={() => {
          }}
        />
                 <InquiryCarDetail
        manager={manager}
        />
                    </ScrollView>

      </View>
              }
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
  paddingView: {
    marginHorizontal: AppHorizontalMargin,
  },
});

export default InquiryDetailScreen;
