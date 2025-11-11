import React, { useState } from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import JourneyDropDown from '../DropDown/JourneyDropDown';
import BorderBtn from '../../../../components/BorderBtn/BorderBtn';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {AppColors} from '../../../../utilis/AppColors';
import SelectionDropDownModel from '../../../../Model/SelectionDropDownModel';
import {journeyCards} from '../../../../utilis/AppStrings';
import JourneyCard from '../JourneyCard/JourneyCard';
import { JourneyManagerType } from '../../Manager/JourneyManager';
import TopAppSafeArea from '../../../../components/AppSafeArea/TopAppSafeArea';
import CommonManager from '../../../../utilis/CommonManager';
let singleWidth = Dimensions.get('screen').width / 3;
interface Props {
    manager :  JourneyManagerType
}
const rotateView = (index: number) => {
  let calculatedWidth = 143.3
  let finalPaddingX = singleWidth - calculatedWidth
  let rotationDegree = index == 0 ? -15 : index == 2 ? 15 : 0;
  let positionX = index == 0 ? -singleWidth  + finalPaddingX : index == 2 ? singleWidth - finalPaddingX  : 0;
  let positionY = index == 2 ? -20 : index == 0 ? -20 : 0
  return {
    transform: [
      {
        rotateZ: `${rotationDegree}deg`,
      },
      {
        translateX: positionX,
      },
      {
        translateY : positionY
      }
    ],
  };
};
const Step2 = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <JourneyDropDown
        placeHolder="Select make"
        onPress={() => {
          props.manager.setModelObj({
            show: true,
            data: CommonManager.shared.makeList,
            title: 'Make',
            type: 0,
          });
        }}
        value={props.manager.selectedMaker.current?.name}
        tite="Which car make do you prefer?"
      />
      <JourneyDropDown
        placeHolder="Select model"
        value={props.manager.selectedModel.current?.name}
        onPress={() => {
          props.manager.setModelObj({
            show: true,
            data: props.manager.getSelectedModelList() ?? [],
            title: 'Model',
            type: 1,
          });
        }}
        tite="Which car model do you prefer?"
      />
      <BorderBtn
        onPress={() => {
          props.manager.addPreference()
        }}
        btnStyle={{
          ...style.searchBtnStyle,
        }}
        titleStyle={style.btnTitleStyle}
        title="Search"
      />
      <View
        style={{
          ...style.bottomView,
        }}>
        <View>
          {journeyCards.map((item, index) => {
            return (
            <View
            key={`${index}`}
            >
                  <View
                style={{
                  ...style.singleCard,
                  ...rotateView(index),
                }}>
                <JourneyCard
                onPress={()=>{
                    if (index == 1){
                        props.manager.setBudgetObj({
                          ...props.manager.budgetObj,isVisible : true
                        })
                    }
                     if (index == 2){
                        props.manager.setYearRangeObj({
                          ...props.manager.yearRangeObj,
                          isVisible : true
                        })
                    }
                }}
                isSelected = {props.manager.validateCard(index)}
                model={item} />
              </View>
                </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
  searchBtnStyle: {
    marginHorizontal: AppHorizontalMargin,
    marginTop: 25,
  },
  btnTitleStyle: {
    ...font(14, FontWeight.Bold),
    color: AppColors.primary,
  },
  bottomView: {
    ...AppStyle.mainView,
    alignItems: 'center',
    justifyContent : "center",
    paddingBottom : 200
},
  singleCard: {
    width: singleWidth,
    height: singleWidth,
    position: 'absolute',
    right: -singleWidth / 2.2,
    transform: [
      {
        rotate: '-32deg',
      },
    ],
  },
});

export default Step2;
