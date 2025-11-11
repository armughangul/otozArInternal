import React from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import SingleRowCarItem from '../MainSearch/Components/Cards/SingleRowCarItem';
import InquiryManager from './Manager/InquiryManager';
import TopBar from '../../components/TopBar/TopBar';
import DescTopBar from '../../components/DescTopBar/DescTopBar';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import InquiryEmptyView from './Components/InquiryEmptyView';

const InquiryListScreen = (props: ScreenProps) => {
  const manager = InquiryManager(props);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar title="My Inquiries" onBack={() => props.navigation.goBack()} />
      <DescTopBar title={`${manager.inquriyList ? manager.inquriyList.length : 0} Inquiries`} />
      <View
        style={{
          ...style.paddingView,
        }}>
        <FlatList
          data={manager.inquriyList ?? []}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator = {false}
          onEndReached={() => manager.handleLoadMore()}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={()=>{
            if (manager.inquriyList && manager.inquriyList.length == 0){
              return(
                    <InquiryEmptyView
                    title='No Inquiries Yet'
                    desc='Your vehicle inquiries will appear here.'
              onBrowse={()=>manager.onBrowse(props)}
              />
              )
            }
            return null
          }}
          renderItem={({item, index}) => {
            return (
              <SingleRowCarItem
                car={item.car}
                onPress={() => {
                    manager.onDetail(item,props,manager)
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

export default InquiryListScreen;
