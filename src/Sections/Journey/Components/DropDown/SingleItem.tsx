import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {font} from '../../../../utilis/AppStyle';
import {AppHorizontalMargin, AppImages} from '../../../../utilis/AppConstant';
import {AppColors} from '../../../../utilis/AppColors';
import AppImageView from '../../../../components/AppImageView/AppImageView';
import {IMAGE_BASE_URL, IMAGE_MAKES_BASE_URL} from '../../../../Network/Urls';
interface Props {
  title: string;
  img?: any;
  onPress?: () => void;
  isSelected : boolean
}
const SingleItem = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress && props.onPress()}>
      <View>
        <View
          style={{
            ...style.mainView,
          }}>
          <Text style={{}}>{props.title ?? props.title}</Text>
          {props.img && props.img != '' && (
            <AppImageView
              style={{
                ...style.imgStyle,
              }}
              source={IMAGE_MAKES_BASE_URL + props.img}
            />
          )}
          {
            props.isSelected &&
            <Image
              style={{
                ...style.tickStyle,
              }}
            source={AppImages.Common.tick}
            />
          }
        </View>
        <View
          style={{
            ...style.borderView,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: AppHorizontalMargin,
  },
  txtStyle: {
    ...font(14),
  },
  imgStyle: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  borderView: {
    height: 0.5,
    backgroundColor: AppColors.seperatorColor,
    marginHorizontal: AppHorizontalMargin,
  },
  tickStyle : {
    height : 14,
    resizeMode : "contain",
    marginRight : 10
  }
});

export default SingleItem;
