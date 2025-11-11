import React from 'react';
import {Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import {AboutUsBottomList, AboutUsData, howItWorkList, privacyTxt} from '../../utilis/AppStrings';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import TopBar from '../../components/TopBar/TopBar';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {FlashList} from '@shopify/flash-list';
import SingleHowItem from './Components/SingleHowItem';

const HowItWorkScreen = (props: ScreenProps) => {
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        onBack={() => {
          props.navigation.goBack();
        }}
        title="How It Works"
      />
      <View
        style={{
          ...style.paddingView,
        }}>
            <FlashList
            showsVerticalScrollIndicator = {false}
            data={howItWorkList}
            keyExtractor={(item,index)=>`${index}`}
            renderItem={({item,index})=>{
                return(
                    <SingleHowItem
                    obj={item}
                    count={index + 1}
                    />
                )
            }}
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
    flex: 1,
    marginHorizontal: AppHorizontalMargin,
  }
});

export default HowItWorkScreen;
