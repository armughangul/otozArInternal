import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppStyle, font, FontWeight} from '../../../../../utilis/AppStyle';
import SingleSortItem from './SingleSortItem';
import { AppHorizontalMargin } from '../../../../../utilis/AppConstant';

interface singleSortItemProps {
  title: string;
}
interface Props {
  title: string;
  itemList: singleSortItemProps[];
  onSelectItem: (index: number) => void;
  selectedIndex : number
}
const SortSection = (props: Props) => {
  return (
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
      {props.itemList.map((item, index) => {
        return (
          <SingleSortItem
            key={`${index}`}
            title={item.title}
            isSelected={props.selectedIndex == index}
            onSelect={() => props.onSelectItem(index)}
          />
        );
      })}
      <View
      style = {{
        ...style.borderStyle
      }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginHorizontal : AppHorizontalMargin,
    marginTop : 15
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  borderStyle : {
            ...AppStyle.commonBorder,
            marginTop : 15
  }
});

export default SortSection;
