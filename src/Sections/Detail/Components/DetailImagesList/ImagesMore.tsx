import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ImagesModel} from '../../../../Model/VehicleModel';
import {AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
interface Props {
  size: any;
  onMore: () => void;
  imagesList: ImagesModel[];
}
const ImageMore = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onMore()}>
      <View
        style={{
          ...props.size,
          ...style.mainView,
        }}>
        <Text
          style={{
            ...style.titleStyle,
          }}>
          +{props.imagesList.length - 3}
          {'\n'}More
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: AppColors.primaryOP(0.1),
    overflow: 'hidden',
    justifyContent : "center"
  },
  titleStyle: {
    ...font(12, FontWeight.SemiBold),
    color: AppColors.primary,
    textAlign : "center",
  },
});
export default ImageMore;
