import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import HomeSearchBar from '../Home/Components/HomeSearchBar';
import FilterListing from './Components/Filters/FilterListing';
import {AppHorizontalMargin, AppImages, ScreenProps} from '../../utilis/AppConstant';
import ListSwitcher from './Components/ListSwitcher/ListSwitcher';
import ColumnListView from './Components/List/ColumnListView';
import RowLisView from './Components/List/RowLisView';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import MainSearchManager from './Manager/MainSearchManager';
import MakeModal from './Components/DropDownSheets/MakeDropDown/MakeModal';
import ModelMadal from './Components/DropDownSheets/ModelDropDown/ModelModal';
import CommonManager from '../../utilis/CommonManager';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import CarYearDropDown from '../../components/CarYear/CarYearDropDown';
import BudgetDropDown from '../../components/Budget/BudgetDropDown';
import BodyTypeDropDown from './Components/DropDownSheets/BodyTypeDropDown/BodyTypeDropDown';
import {BodyTypeModel} from '../../Model/BodyTypeModel';
import MileageDropDown from './Components/DropDownSheets/Mileage/MileageDropDown';
import SimpleDropDown from './Components/DropDownSheets/SimpleDropDown/SimpleDropDown';
import {driveTrainList, engineSizeList, steeringList, transmissionList} from '../../utilis/AppStrings';
import ColorModal from './Components/DropDownSheets/ColorDropDown/ColorModal';
import SeatDropDown from './Components/DropDownSheets/SeatDropDown/SeatDropDown';
import SortDropDown from './Components/DropDownSheets/SortDropDown/SortDropDown';
const MainSearchScreen = (props : ScreenProps) => {
  const manager = MainSearchManager(props);
  useEffect(()=>{
    manager.initialize()
  },[])
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <HomeSearchBar
      onFilters={()=>manager.onFilters()}
      />
      <FilterListing manager={manager} />
      <ListSwitcher type={manager.type} setType={manager.setType}
      carLength={manager.carList.length}
      onPrefSave={()=>manager.addPreference()}
      />
      <View
        style={{
          ...style.listStyle,
        }}>
        {manager.type == 0 ? (
          <ColumnListView list={manager.carList}
                    handleLoadMore = {()=>manager.handleLoadMore()
                    }
                    onPress={(id)=>manager.onDetail(id)}
          />
        ) : (
          <RowLisView list={manager.carList} 
          handleLoadMore = {()=>manager.handleLoadMore()}
         onPress={(id)=>manager.onDetail(id)}
          />
        )}
      </View>
      {manager.showMake && (
        <MakeModal
          onSelect={(index: number) => {
            manager.setSelectedMaker(CommonManager.shared.makeList[index]);
            manager.setShowMake(false);
          }}
          onClose={() => manager.setShowMake(false)}
        />
      )}
      {manager.showModel && (
        <ModelMadal
        showMakeList = {true}
          manager={manager}
          onSelect={item => {
            manager.setSelectedModel(item);
            manager.setShowModel(false);
          }}
          onClose={() => manager.setShowModel(false)}
        />
      )}
      {manager.yearRangeObj.isVisible && (
        <CarYearDropDown manager={manager} title="Model Year" />
      )}
      {manager.datePicker.isVisible && (
        <DatePickerModal
          selectedValue={manager.setPickerSelectedValue(
            manager?.datePicker?.type ?? 0,
          )}
          dataList={
            manager.datePicker.type == 0 || manager.datePicker.type == 2
              ? CommonManager.shared.generateYearsList()
              : CommonManager.shared.monthList
          }
          title={
            manager.datePicker.type == 0
              ? 'Min Year'
              : manager.datePicker.type == 1
              ? 'Min Month'
              : manager.datePicker.type == 2
              ? 'Max Year'
              : 'Max Month'
          }
          onClose={() => {
            manager.showDatePicker({
              ...manager.datePicker,
              isVisible: false,
            });
          }}
          onConfirm={value => {
            manager.setYearPickerValue(value);
          }}
        />
      )}
      {manager.budgetObj.isVisible && (
        <BudgetDropDown
          manager={manager}
          minPrice={manager.budgetObj.minPrice}
          maxPrice={manager.budgetObj.maxPrice}
          setBudget={(minPrice, maxPrice) => {
            manager.setBudgetObj({
              minPrice,
              maxPrice,
              isVisible: false,
            });
          }}
          title="Price Range"
          onClose={() => {
            manager.setBudgetObj({
              ...manager.budgetObj,
              isVisible: false,
            });
          }}
        />
      )}
      {manager.showBodyType && (
        <BodyTypeDropDown
          onSelect={(type: BodyTypeModel) => {
            manager.setBodyType(type);
            manager.setShowBodyType(false);
          }}
          onClose={() => manager.setShowBodyType(false)}
        />
      )}
      {manager.mileageObj.isVisible && (
        <MileageDropDown
          manager={manager}
          minPrice={manager.budgetObj.minPrice}
          maxPrice={manager.budgetObj.maxPrice}
          setMileage={(minPrice, maxPrice) => {
            manager.setMileageObj({
              minPrice,
              maxPrice,
              isVisible: false,
            });
          }}
          title="Mileage"
          onClose={() => {
            manager.setMileageObj({
              ...manager.mileageObj,
              isVisible: false,
            });
          }}
        />
      )}
      {manager.steeringType.isVisible && (
        <SimpleDropDown
          list={steeringList.map((item)=>item.name)}
          onClose={() => {
            manager.setSteeringType({
              ...manager.steeringType,
              isVisible: false,
            });
          }}
          onSelect={item => {
            manager.setSteeringType({
              value: item,
              isVisible: false,
            });
          }}
        />
      )}
       {manager.tranmissionType.isVisible && (
        <SimpleDropDown
        title='Steering'
          list={transmissionList.map((item)=>item.name)}
          onClose={() => {
            manager.setTransmissionType({
              ...manager.tranmissionType,
              isVisible: false,
            });
          }}
          onSelect={item => {
            manager.setTransmissionType({
              value: item,
              isVisible: false,
            });
          }}
        />
      )}
       {manager.engineType.isVisible && (
        <SimpleDropDown
        title='Engine Size'
          list={engineSizeList}
          onClose={() => {
            manager.setEngineType({
              ...manager.engineType,
              isVisible: false,
            });
          }}
          onSelect={item => {
            manager.setEngineType({
              value: item,
              isVisible: false,
            });
          }}
        />
      )}
       {manager.colorType.isVisible && (
        <ColorModal
        manager={manager}
          onSelect={item => {
            manager.setColorType({
              value : item,
          isVisible : false
          })
          }}
          onClose={() => manager.setColorType({
            ...manager.colorType,
          isVisible : false
          })}
        />
      )}
       {manager.fuelType.isVisible && (
        <SimpleDropDown
        title='Fuel Type'
          list={CommonManager.shared.fuelList.map((item)=>item.name)}
          onClose={() => {
            manager.setFuelType({
              ...manager.fuelType,
              isVisible: false,
            });
          }}
          onSelect={item => {
            manager.setFuelType({
              value: item,
              isVisible: false,
            });
          }}
        />
      )}
        {manager.seatsObj.isVisible && (
        <SeatDropDown
          manager={manager}
          minPrice={manager.seatsObj.minPrice}
          maxPrice={manager.seatsObj.maxPrice}
          setSeats={(minPrice, maxPrice) => {
            manager.setSeatsObj({
              minPrice,
              maxPrice,
              isVisible: false,
            });
          }}
          title="Seats"
          onClose={() => {
            manager.setSeatsObj({
              ...manager.seatsObj,
              isVisible: false,
            });
          }}
        />
      )}
       {manager.driveTrain.isVisible && (
        <SimpleDropDown
        title='Drivetrain'
          list={driveTrainList.map((item)=>item.name)}
          onClose={() => {
            manager.setDriveTrain({
              ...manager.driveTrain,
              isVisible: false,
            });
          }}
          onSelect={item => {
            manager.setDriveTrain({
              value: item,
              isVisible: false,
            });
          }}
        />
      )}
      {
        manager.showSortType &&
        <SortDropDown
        manager={manager}
        title='Sort By'
        onClose={()=>{
          manager.setShowSortType(false)
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
  listStyle: {
    ...AppStyle.mainView,
    marginHorizontal: AppHorizontalMargin,
  },
});

export default MainSearchScreen;
