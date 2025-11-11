import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {font, FontWeight} from '../../../utilis/AppStyle';
import {AppColors} from '../../../utilis/AppColors';
interface Props {
  title: String;
  onClick: () => void;
  isSelected: boolean;
  key: string;
}
const QuickFilterTopTab = (props: Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onClick()}
    >
      <View
        style={{
          ...style.mainView,
        }}>
        <Text
          style={{
            ...(props.isSelected ? style.txtSelectedStyle : style.txtStyle),
          }}>
          {props.title}
        </Text>
        <View
          style={{
            ...(props.isSelected ? style.selectedBoderView : style.borderView),
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: {
    ...font(14, FontWeight.Light),
  },
  txtSelectedStyle: {
    ...font(14, FontWeight.SemiBold),
    color: AppColors.primary,
  },
  borderView: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    height: 1,
    backgroundColor: AppColors.white(1),
  },
  selectedBoderView: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    height: 2.5,
    backgroundColor: AppColors.primary,
  },
});

export default QuickFilterTopTab;
