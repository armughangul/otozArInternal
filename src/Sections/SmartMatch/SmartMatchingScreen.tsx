import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import TopBar from '../../components/TopBar/TopBar';
import TopDescView from './Components/TopDescView';
import SmartCarousalView from './Components/SmartCarouselView';
import SmartMatchManager from './Manager/SmartMatchManager';
import SmartCountBtn from './Components/SmartCountBtn';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import BottomOptionView from './Components/BottomOptionView';

const SmartMatchingScreen = (props: ScreenProps) => {
  const manager = SmartMatchManager(props);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        onBack={() => {
          props.navigation.goBack();
        }}
        title={"AI's Best Match Picks"}
      />
      <TopDescView manager={manager} />
      {manager.list.length > 0 && (
        <View
          style={{
            ...style.paddingView,
          }}>
          <SmartCarousalView manager={manager} />
          <SmartCountBtn
            onPress={() => {
              manager.onDetail(
                manager.list[manager.currentItem].id,
                props.navigation,
              );
            }}
            count={manager.currentItem + 1}
          />
          <BottomOptionView manager={manager} />
        </View>
      )}
      <BottomAppSafeArea />
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  paddingView: {
    flex: 1,
  },
});

export default SmartMatchingScreen;
