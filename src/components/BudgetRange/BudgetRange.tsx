import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AppHorizontalMargin} from '../../utilis/AppConstant';
import {AppColors} from '../../utilis/AppColors';
import RangeSlider from 'react-native-fast-range-slider';

interface Props {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  onChange: (values: number[]) => void;
  range?: number;
}
const BudgetRange = (props: Props) => {
  const handleRangeChange = useCallback((values: number[]) => {
    console.log(values);
    props.onChange(values);
  }, []);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <RangeSlider
        initialMinValue={props.minValue}
        initialMaxValue={props.maxValue}
        min={props.min}
        max={props.max}
        step={1}
        // Style customization
        width={
          props.range
            ? props.range
            : Dimensions.get('screen').width - AppHorizontalMargin * 2
        }
        thumbSize={20}
        trackHeight={3}
        selectedTrackStyle={{backgroundColor: AppColors.primary}}
        unselectedTrackStyle={{backgroundColor: AppColors.txtLightColor}}
        thumbStyle={{backgroundColor: AppColors.primary,borderColor : AppColors.primary,borderWidth : 3,}}
        pressedThumbStyle={{backgroundColor: AppColors.primary,transform : [{scale : 1.5}]}}
        // Behavior
        enabled={true}
        allowOverlap={false}
        showThumbLines={false}
        minimumDistance={16}
        // Callbacks
        onValuesChange={handleRangeChange}
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 40,
    justifyContent: 'center',
    marginHorizontal: AppHorizontalMargin,
  },
});

export default React.memo(BudgetRange);
