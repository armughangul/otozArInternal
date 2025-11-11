import React from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {AppHorizontalMargin, AppImages, ScreenProps} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import FavTopBar from './Components/FavTopBar';
import FavouriteManager from './Manager/FavouriteManager';
import SingleRowCarItem from '../MainSearch/Components/Cards/SingleRowCarItem';
import FavEmptyView from './Components/FavEmptyView';
import DescTopBar from '../../components/DescTopBar/DescTopBar';

const FavouriteScreen = (props: ScreenProps) => {
  const manager = FavouriteManager();
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <FavTopBar title="Favourites" />
      <DescTopBar
      title = {`${manager.getFavList.length} Favourite Cars`}/>
      <View
        style={{
          ...style.paddingView,
        }}>
        <FlatList
          data={manager.getFavList}
            contentContainerStyle={{
          paddingBottom: 100,
        }}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return <SingleRowCarItem car={item} onPress={() => {
              manager.onDetail(item.id,props.navigation)
            }}
             />;
          }}
          ListEmptyComponent={()=>{
            return(
              <FavEmptyView
              onBrowse={()=>manager.onBrowse(props)}
              />
            )
          }}
        />
      </View>
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  paddingView : {
    flex : 1,
    marginHorizontal : 10
  }
});

export default FavouriteScreen;
