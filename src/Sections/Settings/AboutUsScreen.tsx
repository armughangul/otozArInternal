import React from 'react';
import {Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import {AboutUsBottomList, AboutUsData, privacyTxt} from '../../utilis/AppStrings';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import TopBar from '../../components/TopBar/TopBar';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {FlashList} from '@shopify/flash-list';
import PaddingView from '../../components/Padding/PaddingView';
import SingleBottomAboutUs from './Components/SingleBottomAboutUs';

const AboutUsScreen = (props: ScreenProps) => {
  let singleWidth = (Dimensions.get("screen").width - AppHorizontalMargin)/3 - 15
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
        title="About Us"
      />
      <View
        style={{
          ...style.paddingView,
        }}>
          <ScrollView
          showsVerticalScrollIndicator = {false}
          >
              <PaddingView
        height={10}
        />
        <Text
          style={{
            ...style.headerStyle,
          }}>
          {`Why otoz.ai`}
        </Text>
        <PaddingView
        height={10}
        />
        <Text
          style={{
            ...style.headerStyle,
          }}>
          {`Our Commitments: Speed, Reliability, Quality & Affordability`}
        </Text>
          <PaddingView
        height={10}
        />
        <Text>
          {AboutUsData.map((item, index) => {
          
            return (
              <Text
                key={`${index}`}
                style={{
                  ...item.font,
                }}>
                {item.text == "" ? "\n\n" : item.text}
              </Text>
            );
          })}
        </Text>
        <View
        style = {{
          ...style.bottomAboutItemView
        }}
        >
          <SingleBottomAboutUs
          obj={AboutUsBottomList[0]}
          width={singleWidth}
          />
            <SingleBottomAboutUs
          obj={AboutUsBottomList[1]}
          width={singleWidth}
          />
            <SingleBottomAboutUs
          obj={AboutUsBottomList[2]}
          width={singleWidth}
          />
        </View>
                  </ScrollView>
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
  },
  headerStyle: {
    ...font(18, FontWeight.SemiBold),
  },
  bottomAboutItemView : {
    flexDirection : "row",
    marginTop : 10,
    justifyContent : "space-between"
  }
});

export default AboutUsScreen;
