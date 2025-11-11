import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../../../utilis/AppStyle';
import SingleMake from './SingleQuickModel';
import SingleQuickModel from './SingleQuickModel';
import CommonManager from '../../../../utilis/CommonManager';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {CarModel} from '../../../../Model/CarModel';
interface Props {
  modeList: any[];
  size: any;
  onPress: (item: CarModel) => void;
}
const SingleQuickModelItem = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      {props.modeList.length > 0 && (
        <SingleQuickModel
          size={props.size}
          model={props.modeList[0]}
          onPress={() => props.onPress(props.modeList[0])}
        />
      )}
      {props.modeList.length > 1 && (
        <SingleQuickModel
          size={props.size}
          model={props.modeList[1]}
          onPress={() => props.onPress(props.modeList[1])}
        />
      )}
      {props.modeList.length > 2 && (
        <SingleQuickModel
          onPress={() => props.onPress(props.modeList[2])}
          size={props.size}
          model={props.modeList[2]}
        />
      )}
      {props.modeList.length > 3 && (
        <SingleQuickModel
          onPress={() => props.onPress(props.modeList[3])}
          size={props.size}
          model={props.modeList[3]}
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

export default React.memo(SingleQuickModelItem);
