import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyle} from '../../../../utilis/AppStyle';
import SingleMake from './SingleQuickBudget';
import SingleQuickModel from './SingleQuickBudget';
import SingleQuickBudget from './SingleQuickBudget';
import {BudgetModel} from '../../../../Model/BudgetModel';
interface Props {
  budgetList: any[];
  size: any;
  onPress: (item: BudgetModel) => void;
}
const SingleQuickBudgetItem = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      {props.budgetList.length > 0 && (
        <SingleQuickBudget
          size={props.size}
          budgetModel={props.budgetList[0]}
          onPress={() => props.onPress(props.budgetList[0])}
        />
      )}
      {props.budgetList.length > 1 && (
        <SingleQuickBudget
          size={props.size}
          budgetModel={props.budgetList[1]}
          onPress={() => props.onPress(props.budgetList[1])}
        />
      )}
      {props.budgetList.length > 2 && (
        <SingleQuickBudget
          size={props.size}
          budgetModel={props.budgetList[2]}
          onPress={() => props.onPress(props.budgetList[2])}
        />
      )}
      {props.budgetList.length > 3 && (
        <SingleQuickBudget
          size={props.size}
          budgetModel={props.budgetList[3]}
          onPress={() => props.onPress(props.budgetList[3])}
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

export default React.memo(SingleQuickBudgetItem);
