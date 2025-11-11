import React from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import TopBar from '../../components/TopBar/TopBar';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import MainSequenceView from '../../components/SequenceSlider/MainSequenceView';
import OrderInquiryStep from './Components/DetailSteps/OrderInquiryStep/OrderInquiryStep';
import SingleRowCarItem from '../MainSearch/Components/Cards/SingleRowCarItem';
import AdvancePaymentStep from './Components/DetailSteps/OrderAdvanceStep/AdvancePaymentStep';
import OrderBalanceStep from './Components/DetailSteps/BalanceStep/OrderBalanceStep';
import OrderDocumentStep from './Components/DetailSteps/DocumentStep/OrderDocumentStep';
import OrderReceivedStep from './Components/DetailSteps/ReceivedStep/OrderReceivedStep';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppColors} from '../../utilis/AppColors';
import PurchaseManager from './Manager/PurchaseManager';
import ConsigneeDetailView from './Components/DetailSteps/ConsigneeStep/ConsigneeDetailView';
const HistoryDetailScreen = (props: ScreenProps) => {
  const manager = PurchaseManager(props,false);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar title="Purchase History" onBack={() => props.navigation.goBack()} />
      {manager.obj && (
        <View
          style={{
            ...style.paddingView,
          }}>
          <MainSequenceView manager={manager} />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={manager.refreshing}
                onRefresh={() => manager.getInquiryObj(manager.obj?.id ?? -1)}
                colors={[AppColors.primary]} // Customize refresh indicator color (Android)
                tintColor={AppColors.primary} // Customize refresh indicator color (iOS)
              />
            }>
            <SingleRowCarItem
              viewStyle={{
                ...style.removeCarPadding,
              }}
              car={manager.obj.car}
              onPress={() => {}}
            />
            {manager.tab == 0 ? (
              <OrderInquiryStep manager={manager} />
            ) : manager.tab == 1 ? (
              <AdvancePaymentStep manager={manager} />
            ) : manager.tab == 2 ? (
              <ConsigneeDetailView manager={manager} />
            ) : manager.tab == 3 ? (
              <OrderBalanceStep manager={manager} />
            ) : manager.tab == 4 ? (
              <OrderDocumentStep manager={manager} />
            ) : manager.tab == 5 ? (
              <OrderReceivedStep
              manager={manager}
              isCompleted={manager.obj.shipping.car_received} />
            ) : null}
          </KeyboardAwareScrollView>
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
    marginHorizontal: AppHorizontalMargin,
  },
  removeCarPadding: {
    marginHorizontal: 0,
    marginTop: 10,
  },
});

export default HistoryDetailScreen;
