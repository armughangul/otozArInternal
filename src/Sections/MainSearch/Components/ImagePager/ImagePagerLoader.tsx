import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
import SinglePageLoader from './SinglePageLoader';
import { ImagesModel } from '../../../../Model/VehicleModel';
interface Props {
  list: ImagesModel[];
  scrollIndex: number;
}
const ImagePagerLoader = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      {props.list.map((item, index) => {
        return (
          <SinglePageLoader
          key={`${index}`}
            isSelected={index <= props.scrollIndex}
          />
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    maxHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default React.memo(ImagePagerLoader);
