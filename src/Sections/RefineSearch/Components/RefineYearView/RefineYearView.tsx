import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import DateDropDown from '../../../../components/DateDropDown/DateDropDown';
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager';
interface Props {
  manager : RefineSearchManagerType
}
const RefineYearView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleTxt,
        }}>
        Model Year
      </Text>
      <View
        style={{
          ...style.yearView,
        }}>
        <DateDropDown
          value={ `${props.manager.yearRangeObj.fromYear ?? ""}`}
          onPress={() => {
            props.manager.showDatePicker({
              ...props.manager.datePicker,
              type: 0,
              isVisible: true,
            });
          }}
          title="Min"
          placeHolder="Min Year"
        />
        <View
        style = {{
            ...style.dividerView
        }}
        />
         <DateDropDown
          value={ `${props.manager.yearRangeObj.toYear ?? ""}`}
          onPress={() => {
            props.manager.showDatePicker({
              ...props.manager.datePicker,
              type: 2,
              isVisible: true,
            });
          }}
          title="Max "
          placeHolder="Max Year"
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginHorizontal: AppHorizontalMargin,
  },
  titleTxt: {
    ...font(18, FontWeight.SemiBold),
  },
  yearView: {
    flexDirection: 'row',
    marginTop : 10
  },
  dividerView : {
    width : 20
  }
});
export default RefineYearView;
