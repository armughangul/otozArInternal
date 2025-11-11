import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {SafeAreaView}  from "react-native-safe-area-context"
import {AppStyle} from '../../utilis/AppStyle';
import {AppImages, ScreenProps} from '../../utilis/AppConstant';
import TopBar from './Components/TopBar';
import Step1 from './Components/Steps/Step1';
import Step2 from './Components/Steps/Step2';
import DropDownModal from './Components/DropDown/DropDownModal';
import JourneyManager from './Manager/JourneyManager';
import BudgetDropDown from '../../components/Budget/BudgetDropDown';
import CarYearDropDown from '../../components/CarYear/CarYearDropDown';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import CommonManager from '../../utilis/CommonManager';

const Journey = (props : ScreenProps) => {
  const manager = JourneyManager(props);
  useEffect(()=>{
    manager.instatiateManager()
  },[])
  return (
    <ImageBackground
      source={AppImages.Journey.journeyBackground}
      style={{
        ...style.mainView,
      }}>
      <SafeAreaView 
      edges={{
        top : "maximum"
      }}
      />
      <TopBar
        onSkip={() => {
         manager.onMoveJourney()
        }}
        onBack={() => manager.setStep(manager.step - 1)}
        step={manager.step}
      />
      {manager.step == 0 ? (
        <Step1 onStart={() => manager.setStep(1)} />
      ) : (
        <Step2 manager={manager} />
      )}
      {manager.modelObj && (
        <DropDownModal
          onSelect={(index) => {
            manager.onSelectModel(index)
          }}
          onClose={() => {
            manager.setModelObj(null);
          }}
          model={manager.modelObj}
        />
      )}
      {manager.budgetObj.isVisible && (
        <BudgetDropDown
        manager={manager}
        minPrice={manager.budgetObj.minPrice}
        maxPrice={manager.budgetObj.maxPrice}
        setBudget={(minPrice,maxPrice)=>{
          manager.setBudgetObj({
            minPrice,
            maxPrice,
            isVisible : false
          })
        }}
          title="Select Car Budget"
          onClose={() => {
            manager.setBudgetObj({
              ...manager.budgetObj,
              isVisible : false
            });
          }}
        />
      )}
        {manager.yearRangeObj.isVisible && (
        <CarYearDropDown
        manager={manager}
          title="Select Car Year"
        />
      )}
      {
        manager.datePicker.isVisible &&
        <DatePickerModal
        selectedValue={manager.setPickerSelectedValue(manager?.datePicker?.type ?? 0)}
        dataList={(manager.datePicker.type == 0 || manager.datePicker.type == 2) ? CommonManager.shared.generateYearsList() : CommonManager.shared.monthList}
        title={manager.datePicker.type == 0 ? "Min Year" : manager.datePicker.type == 1 ? "Min Month" : manager.datePicker.type == 2 ? "Max Year" : "Max Month"} 
        onClose={()=>{
          manager.showDatePicker({
            ...manager.datePicker,
            isVisible : false
          })
        }}
        onConfirm={(value)=>{
        manager.setYearPickerValue(value)
        }}
        />
      }
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
});
export default Journey;
