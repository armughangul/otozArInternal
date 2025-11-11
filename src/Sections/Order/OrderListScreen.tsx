import React from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {AppImages, ScreenProps} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import SingleRowCarItem from '../MainSearch/Components/Cards/SingleRowCarItem';
import TopBar from '../../components/TopBar/TopBar';
import DescTopBar from '../../components/DescTopBar/DescTopBar';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import OrderManager from './Manager/OrderManager';
import InquiryEmptyView from '../Inquiry/Components/InquiryEmptyView';
const OrderListScreen = (props: ScreenProps) => {
  const manager = OrderManager(props, true);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar title="Track Orders" onBack={() => props.navigation.goBack()} />
      <DescTopBar
        title={`${
          manager.orderList ? manager.orderList.length : 0
        } Orders in Progress`}
      />
      <View
        style={{
          ...style.paddingView,
        }}>
        <FlatList
          data={manager.orderList ?? []}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => manager.handleLoadMore()}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={() => {
            if (manager.orderList) {
              return (
                <InquiryEmptyView
                  title="No vehicle orders yet"
                  desc="Once you place an order, you’ll be able to track its progress here."
                  onBrowse={() => manager.onBrowse(props)}
                />
              );
            }
            return null;
          }}
          renderItem={({item, index}) => {
            return (
              <SingleRowCarItem
                car={item.car}
                onPress={() => {
                  manager.onDetail(item, props, manager);
                }}
              />
            );
          }}
        />
      </View>
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
    marginHorizontal: 10,
  },
});

export default OrderListScreen;
