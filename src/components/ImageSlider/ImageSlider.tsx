import React from 'react';
import {FlatList, StyleProp, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import {ImagesModel} from '../../Model/VehicleModel';
import AppImageView from '../AppImageView/AppImageView';
import {FlashList} from '@shopify/flash-list';
interface Props {
  images: ImagesModel[];
  singleItemStyle: any;
  onPageChange : (page : number)=>void,
  onPress : ()=>void
}
const ImageSlider = (props: Props) => {
  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / props.singleItemStyle.width);
    props.onPageChange(newPage)
  };
  return (
    <FlatList
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      data={props.images}
      keyExtractor={(item, index) => `${index}`}
      horizontal
      onMomentumScrollEnd={handleScrollEnd}
      renderItem={({item, index}) => {
        return (
       <TouchableOpacity
       onPress={()=>{
        props.onPress()
       }}
       >
           <AppImageView
            style={props.singleItemStyle}
            source={item.image}
            mode={'cover'}
          />
       </TouchableOpacity>
        );
      }}
    />
  );
};
const style = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
  },
});

export default ImageSlider;
