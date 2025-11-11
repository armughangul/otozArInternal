import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {font} from '../../../../../utilis/AppStyle';
import {AppImages} from '../../../../../utilis/AppConstant';
interface Props {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}
const SingleSortItem = (props: Props) => {
  return (
          <TouchableWithoutFeedback
        onPress={() => props.onSelect && props.onSelect()}>
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        {props.title}
      </Text>

        <Image
          source={
            props.isSelected
              ? AppImages.MainSearch.radioSelected
              : AppImages.MainSearch.radio
          }
          style={{
            ...style.iconStyle,
          }}
        />
    </View>
          </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop : 10
  },
  titleStyle: {
    ...font(14),
  },
  iconStyle: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default SingleSortItem;
