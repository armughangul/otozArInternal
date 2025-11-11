import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {CarDetailManagerType} from '../../Manager/CarDetailManager';
import SingleDetailImageItem from './SingleDetailImageItem';
import {AppStyle} from '../../../../utilis/AppStyle';
import CommonManager from '../../../../utilis/CommonManager';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import ImageMore from './ImagesMore';
import {useDispatch} from 'react-redux';
import {setImagesList} from '../../../../redux/Reducers/AppReducer';
interface Props {
  manager: CarDetailManagerType;
}
const DetailImagesList = (props: Props) => {
  const dispatch = useDispatch();
  const size = CommonManager.shared.generateViewAspectRatioSize(
    2 / 1.6,
    (Dimensions.get('window').width - AppHorizontalMargin * 2) / 4 - 8,
  );
  return (
    <View
      style={{
        ...style.mainView,
        height: size.height,
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={AppStyle.commonFlatLeftPadding}
        horizontal
        data={props.manager.carObj?.images ?? []}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          if (index < 3) {
            return (
              <SingleDetailImageItem
                onPress={() => props.manager.showImagesList(index)}
                size={size}
                image={item}
              />
            );
          }
          if (index == 3) {
            return (
              <ImageMore
                size={size}
                imagesList={props.manager.carObj?.images ?? []}
                onMore={() => {
                  props.manager.showImagesList();
                }}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
});

export default DetailImagesList;
