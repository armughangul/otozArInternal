import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyle} from '../../../../utilis/AppStyle';
import SingleMake from './SingleQuickBody';
import SingleQuickModel from './SingleQuickBody';
import SingleQuickBody from './SingleQuickBody';
import {BodyTypeModel} from '../../../../Model/BodyTypeModel';
interface Props {
  bodyList: BodyTypeModel[];
  size: any;
  onPress: (item: BodyTypeModel) => void;
}
const SingleQuickBodyTypeItem = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      {props.bodyList.length > 0 && (
        <SingleQuickBody
          size={props.size}
          bodyType={props.bodyList[0]}
          onPress={() => props.onPress(props.bodyList[0])}
        />
      )}
      {props.bodyList.length > 1 && (
        <SingleQuickBody
          size={props.size}
          bodyType={props.bodyList[1]}
          onPress={() => props.onPress(props.bodyList[1])}
        />
      )}
      {props.bodyList.length > 2 && (
        <SingleQuickBody
          size={props.size}
          bodyType={props.bodyList[2]}
          onPress={() => props.onPress(props.bodyList[2])}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
    marginRight: 12,
  },
});

export default React.memo(SingleQuickBodyTypeItem);
