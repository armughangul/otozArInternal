import React from 'react';
import {FlatList, ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {
  AppHorizontalMargin,
  AppImages,
  ScreenProps,
} from '../../utilis/AppConstant';
import MakeModelView from './Components/MakeModelView/MakeModelView';
import RefineYearView from './Components/RefineYearView/RefineYearView';
import {AppColors} from '../../utilis/AppColors';
import RefineRangeView from './Components/RefineRangeView/RefineRangeView';
import RefineBodyTypeView from './Components/RefineBodyTypeView/RefineBodyTypeView';
import RefineMileageView from './Components/RefineMileageView/RefineMileageView';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import RefineOptionListView from './Components/RefineOptionListView/RefineOptionListView';
import {
  driveTrainList,
  engineSizeList,
  refineItems,
  steeringList,
  transmissionList,
} from '../../utilis/AppStrings';
import CommonManager from '../../utilis/CommonManager';
import RefineColorListView from './Components/RefineColorListView/RefineColorListView';
import RefineSeatView from './Components/RefineSeatView/RefineSeatView';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import BgBtn from '../../components/BgBtn/BgBtn';
import RefineSearchManager from './Manager/RefineSearchManager';
import MakeModal from '../MainSearch/Components/DropDownSheets/MakeDropDown/MakeModal';
import MultiModelModal from './Components/MultiModelModal/MultiModelModal';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import TopBar from '../../components/TopBar/TopBar';

const RefineSearchScreen = (props: ScreenProps) => {
  const manager = RefineSearchManager(props);
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar
        title="Refine Search"
        onBack={() => props.navigation.goBack()}
      />
      <View
        style={{
          ...AppStyle.mainView,
        }}>
        <FlatList
          data={refineItems}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => {
            switch (item.type) {
              case 'makeModel':
                return (
                  <MakeModelView
                    title="Make & Model"
                    manager={manager}
                    placeHolder="Search Make & Model"
                    onPress={() => manager.setShowMake(true)}
                  />
                );
              case 'year':
                return <RefineYearView manager={manager} />;
              case 'range':
                return <RefineRangeView manager={manager} />;
              case 'bodyType':
                return <RefineBodyTypeView manager={manager} />;
              case 'mileage':
                return <RefineMileageView manager={manager} />;
              case 'steering':
                return (
                  <RefineOptionListView
                    title="Steering"
                    list={steeringList.map(item => item.name)}
                    selectedIndex={steeringList.findIndex(
                      item => item.name === manager.steeringType.value,
                    )}
                    onSelect={value => manager.setSteeringType({value})}
                  />
                );
              case 'transmission':
                return (
                  <RefineOptionListView
                    title="Transmission"
                    list={transmissionList.map(item => item.name)}
                    selectedIndex={transmissionList.findIndex(
                      item => item.name === manager.tranmissionType.value,
                    )}
                    onSelect={value => manager.setTransmissionType({value})}
                  />
                );
              case 'engineSize':
                return (
                  <RefineOptionListView
                    title="Engine Size"
                    list={engineSizeList}
                    selectedIndex={engineSizeList.findIndex(
                      item => item === manager.engineType.value,
                    )}
                    onSelect={value => manager.setEngineType({value})}
                  />
                );
              case 'color':
                return <RefineColorListView manager={manager} />;
              case 'fuel':
                return (
                  <RefineOptionListView
                    title="Fuel"
                    list={CommonManager.shared.fuelList.map(fuel => fuel.name)}
                    selectedIndex={CommonManager.shared.fuelList.findIndex(
                      item => item.name === manager.fuelType.value,
                    )}
                    onSelect={value => manager.setFuelType({value})}
                  />
                );
              case 'seats':
                return <RefineSeatView manager={manager} />;
              case 'drivetrain':
                return (
                  <RefineOptionListView
                    title="Drivetrain"
                    list={driveTrainList.map(item => item.name)}
                    selectedIndex={driveTrainList.findIndex(
                      item => item.name === manager.driveTrain.value,
                    )}
                    onSelect={value => manager.setDriveTrain({value})}
                  />
                );
              case 'divider':
                return <View style={style.borderView} />;
              default:
                return null;
            }
          }}
        />
      </View>
      <View
        style={{
          ...style.horiMainView,
        }}>
        <BgBtn
          btnStyle={{
            ...style.btnStyle,
          }}
          onPress={() => manager.clearFilters()}
          title="Clear"
        />
        <View
          style={{
            ...style.paddingView,
          }}
        />
        <BorderBtn
          isSelected={manager.validateForm()}
          btnStyle={{
            ...style.btnStyle,
          }}
          onPress={() => {
            manager.onAdvanceFilters();
          }}
          title="Apply Filter"
        />
      </View>
      <BottomAppSafeArea />
      {manager.showMake && (
        <MakeModal
          onSelect={index => {
            manager.setSelectedMaker(CommonManager.shared.makeList[index]);
            manager.setShowMake(false);
            manager.setShowModel(true);
          }}
          onClose={() => manager.setShowMake(false)}
        />
      )}
      {manager.showModel && (
        <MultiModelModal
          selectedList={manager.selectedModelList}
          onSelect={list => {
            manager.setShowModel(false);
            manager.setSelectedModelList(list);
          }}
          onClose={() => manager.setShowModel(false)}
          manager={manager}
        />
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
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
  borderView: {
    ...AppStyle.commonBorder,
    marginVertical: 20,
    backgroundColor: AppColors.seperatorColor,
  },
  horiMainView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: AppHorizontalMargin,
  },
  horiInnerView: {
    flex: 1,
    flexDirection: 'row',
  },
  paddingView: {
    width: 15,
  },
  paddingInnerView: {
    width: 8,
  },
  btnStyle: {
    flex: 1,
  },
  monthStyle: {
    flex: 0.6,
  },
});
export default React.memo(RefineSearchScreen);
