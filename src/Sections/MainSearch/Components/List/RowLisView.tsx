import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../../../utilis/AppStyle';
import SingleRowCarItem from '../Cards/SingleRowCarItem';
import {VehicleModel} from '../../../../Model/VehicleModel';
import {FlashList} from '@shopify/flash-list';
import EmptyCar from '../NoCar/EmptyCar';
interface Props {
  list: VehicleModel[];
  handleLoadMore: () => void;
  onPress : (id : number)=>void
}
const RowLisView = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <FlashList
        onEndReached={() => props.handleLoadMore()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        data={props.list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return <SingleRowCarItem car={item} 
          onPress={()=>props.onPress(item.id ?? -1)}
          />;
        }}
          ListEmptyComponent={()=>{
        return (<EmptyCar/>)
    }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
});
export default React.memo(RowLisView);
