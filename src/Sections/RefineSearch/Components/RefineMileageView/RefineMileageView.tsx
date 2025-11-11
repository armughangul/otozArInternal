import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {AppHorizontalMargin, MAX_PRICE} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import BudgetRange from '../../../../components/BudgetRange/BudgetRange';
import LightInput from '../../../../components/LightInput/LightInput';
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager';

interface Props {
  manager : RefineSearchManagerType
}
const RefineMileageView = (props: Props) => {
  const minRef = useRef<TextInput>(null);
  const maxRef = useRef<TextInput>(null);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleTxt,
        }}>
        Mileage
      </Text>
      <BudgetRange
        onChange={(values) => {
                 if (values && values[0] != props.manager.mileageObj.minPrice) {
                minRef.current?.setNativeProps({text: values[0]});
              }
              if (values && values[1] != props.manager.mileageObj.maxPrice) {
                maxRef.current?.setNativeProps({text: values[1]});
              }
          props.manager.setMileageObj({
            maxPrice : values[1],
            minPrice : values[0]
          })
        }}
        range={Dimensions.get('screen').width - AppHorizontalMargin * 4}
        minValue={props.manager.mileageObj.minPrice ?? 0}
        maxValue={props.manager.mileageObj.maxPrice ?? MAX_PRICE}
        min={0}
        max={MAX_PRICE}
      />
      <View
        style={{
          ...style.horiMainView,
        }}>
        <LightInput
          inputRef={minRef}
          value={(props.manager.mileageObj.minPrice ?? 0).toString()}
          title="Min"
          placeHolder="Min 0"
          onChangeTxt={txt => {
            if (
              Number(txt) &&
              Number(props.manager.mileageObj.maxPrice) &&
              Number(txt) > Number(props.manager.mileageObj.maxPrice)
            ) {
              return;
            }
            props.manager.setMileageObj({
              ...props.manager.mileageObj,
              minPrice : Number(txt) ?? 0
            })
          }}
        />
        <View
          style={{
            ...style.paddingView,
          }}
        />
        <LightInput
          inputRef={maxRef}
          value={(props.manager.mileageObj.maxPrice ?? MAX_PRICE).toString()}
          title="Max"
          placeHolder="Max 500000"
          onChangeTxt={txt => {
            if (
              Number(txt) &&
              Number(props.manager.mileageObj.minPrice) &&
              Number(txt) < Number(props.manager.mileageObj.minPrice)
            ) {
              return;
            }
              props.manager.setMileageObj({
              ...props.manager.mileageObj,
              maxPrice : Number(txt) ?? MAX_PRICE
            })
          }}
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
  horiMainView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  paddingView: {
    width: 15,
  },
});

export default React.memo(RefineMileageView);
