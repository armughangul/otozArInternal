import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {AppHorizontalMargin, MAX_SEATS} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import BudgetRange from '../../../../components/BudgetRange/BudgetRange';
import LightInput from '../../../../components/LightInput/LightInput';
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager';

interface Props {
  manager : RefineSearchManagerType
}
const RefineSeatView = (props: Props) => {
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
        Seats
      </Text>
      <BudgetRange
        onChange={(values) => {
                 if (values && values[0] != props.manager.seatsObj.minPrice) {
                minRef.current?.setNativeProps({text: values[0]});
              }
              if (values && values[1] != props.manager.seatsObj.maxPrice) {
                maxRef.current?.setNativeProps({text: values[1]});
              }
          props.manager.setSeatsObj({
            maxPrice : values[1],
            minPrice : values[0]
          })
        }}
        range={Dimensions.get('screen').width - AppHorizontalMargin * 4}
        minValue={props.manager.seatsObj.minPrice ?? 0}
        maxValue={props.manager.seatsObj.maxPrice ?? MAX_SEATS}
        min={0}
        max={MAX_SEATS}
      />
      <View
        style={{
          ...style.horiMainView,
        }}>
        <LightInput
          inputRef={minRef}
          value={(props.manager.seatsObj.minPrice ?? 0).toString()}
          title="Min"
          placeHolder="Min 0"
          onChangeTxt={txt => {
            if (
              Number(txt) &&
              Number(props.manager.seatsObj.maxPrice) &&
              Number(txt) > Number(props.manager.seatsObj.maxPrice)
            ) {
              return;
            }
            props.manager.setSeatsObj({
              ...props.manager.seatsObj,
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
          value={(props.manager.seatsObj.maxPrice ?? MAX_SEATS).toString()}
          title="Max"
          placeHolder="Max 72"
          onChangeTxt={txt => {
            if (
              Number(txt) &&
              Number(props.manager.seatsObj.minPrice) &&
              Number(txt) < Number(props.manager.seatsObj.minPrice)
            ) {
              return;
            }
              props.manager.setSeatsObj({
              ...props.manager.seatsObj,
              maxPrice : Number(txt) ?? MAX_SEATS
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

export default React.memo(RefineSeatView);
