import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
import {AppImages} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
interface Props {
  onPress : ()=>void
}
const SortingComp = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
          <View
      style={{
        ...style.mainView,
      }}>
      <Image
        style={{
          ...style.iconStyle,
        }}
        source={AppImages.MainSearch.sortingIcon}
      />
      <Text
        style={{
          ...style.titleStyle,
        }}>
        Sort
      </Text>
    </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    paddingHorizontal : 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white(1),
    flexDirection: 'row',
    borderRadius: 4,
    marginRight : 8,
  },
  titleStyle: {
    ...font(12, FontWeight.Light),
    marginLeft : 5
  },
  iconStyle: {
    height: 10,
    width: 9,
    resizeMode: 'contain',
  },
});

export default React.memo(SortingComp);
