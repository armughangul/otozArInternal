import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import GuestView from './Components/GuestView';
import AccountMainSection from './Components/Sections/AccountMainSection';
import AccountLoginView from './Components/AccountLoginView';
import AccountManager from './Manager/AccountManager';
import CurrencySelectionPopUp from './Components/Currency/CurrencySelectionPopup';
const AccountScreen = (props: ScreenProps) => {
  const manager = AccountManager(props);
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <View
        style={{
          ...style.paddingView,
        }}>
        {manager.selector.appUser ? (
          <AccountLoginView
            onMenu={type => manager.onMenu(type, props)}
            onEdit={() => manager.onEdit(props, manager)}
            manager={manager}
          />
        ) : (
          <GuestView onLogin={() => manager.onLogin(props)} />
        )}
        <AccountMainSection manager={manager} />
      </View>
      {
        manager.currency &&
        <CurrencySelectionPopUp
        manager={manager}
        onClose={()=>{
          manager.ShowCurrency(false)
        }}
        onSelect={(item)=>{
          manager.onCurrency(item)
          manager.ShowCurrency(false)
        }}
        />
      }
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
});
export default AccountScreen;
