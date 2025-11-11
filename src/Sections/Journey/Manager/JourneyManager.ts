import React, {useRef, useState} from 'react';
import SelectionDropDownModel from '../../../Model/SelectionDropDownModel';
import {MakeModel} from '../../../Model/CarMakeModel';
import {
  getMakeListApi,
  getModelListApi,
} from '../../../Network/Services/SharedService';
import {Alert} from 'react-native';
import {AppStrings} from '../../../utilis/AppStrings';
import {CarModel} from '../../../Model/CarModel';
import CommonManager from '../../../utilis/CommonManager';
import { addPreferenceApi } from '../../../Network/Services/JourneyService';
import { useDispatch } from 'react-redux';
import { setJourney, setLoading } from '../../../redux/Reducers/AppReducer';
import { Routes } from '../../../utilis/Routes';
import { ScreenProps } from '../../../utilis/AppConstant';
export interface BudgetProps {
  minPrice?: number | null;
  maxPrice?: number | null;
  isVisible?: boolean;
}
export interface YearRange {
  fromYear?: number | null;
  toYear?: number | null;
  fromMonth?: number | null;
  toMonth?: number | null;
  isVisible?: boolean;
  type?: number;
}
const JourneyManager = (props : ScreenProps) => {
  //VARIABLES
  const [step, setStep] = useState(0);
  const dispatch = useDispatch()
  const [modelObj, setModelObj] = useState<SelectionDropDownModel | null>();
  const [budgetObj, setBudgetObj] = useState<BudgetProps>({isVisible: false});
  const [yearRangeObj, setYearRangeObj] = useState<YearRange>({
    isVisible: false,
  });
  const [datePicker, showDatePicker] = useState<YearRange>({isVisible: false});
  const modelListMap = useRef<Map<number, CarModel[]>>(new Map());
  const selectedMaker = useRef<MakeModel>(null);
  const selectedModel = useRef<CarModel>(null);
  //METHODS
  const onSelectModel = (index: number) => {
    if (modelObj?.type == 0) {
      selectedMaker.current = CommonManager.shared.makeList[index];
      selectedModel.current = null;
      setModelObj(null);
      if (!modelListMap.current.has(CommonManager.shared.makeList[index].id)) {
        getSelectedModels(CommonManager.shared.makeList[index].id);
      }
    }
    if (modelObj?.type == 1) {
      selectedModel.current = modelListMap.current.get(
        selectedMaker.current!.id,
      )![index];
      setModelObj(null);
    }
  };
  //MARK API CALLING METHODS
  const getSelectedModels = async (id: number) => {
    getModelListApi(id).then(response => {
      if (response?.success && response.models && response.models.length > 0) {
        modelListMap.current.set(id, response.models);
      } else {
        Alert.alert(AppStrings.Network.errorTitle, response?.message[0]);
      }
    });
  };
  const addPreference = ()=>{
    let filters : any = {
    }
    if (selectedMaker.current && selectedModel.current){
      filters = {
        ...filters,
        make : {id : selectedMaker.current.id,name : selectedMaker.current.name},
        model : {id : selectedModel.current.id,name : selectedModel.current.name}
      }
    }
    if (budgetObj && budgetObj.minPrice && budgetObj.maxPrice){
      filters = {
        ...filters,
        minPrice : budgetObj.minPrice,
        maxPrice : budgetObj.maxPrice
      }
    }
    if (yearRangeObj.fromYear && yearRangeObj.fromMonth && yearRangeObj.toYear && yearRangeObj.toMonth){
      filters = {
        ...filters,
        minYear : yearRangeObj.fromYear,
        minMonth : yearRangeObj.fromMonth,
        maxYear : yearRangeObj.toYear,
        maxMonth : yearRangeObj.toMonth
      }
    }
    if (Object.entries(filters).length == 0){
      Alert.alert("Error","Atleast select one search option.")
      return
    }
    let params = {
      uuid : CommonManager.shared.deviceId,
      preference_type : "save_search",
      filters
    }
    console.log("uuid is ",params.uuid)
     dispatch(setLoading(true))
    addPreferenceApi(params)
    .then((response)=>{
    if (response){
    onMoveJourney()
    }
    })
    .finally(()=>{
     dispatch(setLoading(false))
    })
  }
  // SECTION METHODS
  const getSelectedModelList = () => {
    if (selectedMaker.current){
    if (modelListMap.current.has(selectedMaker.current!.id)) {
      return modelListMap.current.get(selectedMaker.current!.id);
    }
        }
    return [];
  };
  const instatiateManager = () => {
  };
  const validateCard = (index: number) => {
    if (index === 0) {
      return selectedMaker.current && selectedModel.current ? true : false;
    }
    if (index === 1) {
      return budgetObj.minPrice && budgetObj.maxPrice ? true : false;
    }
    if (index === 2) {
      console.log("index 2 ",yearRangeObj)
      if (yearRangeObj.fromYear && yearRangeObj.fromMonth && yearRangeObj.toYear && yearRangeObj.toMonth && yearRangeObj.fromYear < yearRangeObj.toYear){
        return true
      }
    }
    return false;
  };
  const validateBudget = (minPrice: number, maxPrice: number) => {
    if (minPrice > maxPrice) {
      Alert.alert('Error', 'Minimum price must be less than maximum price.');
      return false;
    }
    if (minPrice ||  maxPrice) {
      return true;
    }
    return true;
  };
  const setYearPickerValue = (value: number) => {
    let obj = {
      ...datePicker,
      isVisible : false
    };
    switch (obj.type) {
      case 0:
        obj.fromYear = value
        break;
      case 1:
      obj.fromMonth = value
        break;
      case 2:
           obj.toYear = value   
        break;
      case 3:
        obj.toMonth = value   
        break;
      default:
     obj.fromYear = value
        break;
    }
    showDatePicker(obj)
  };
  const setPickerSelectedValue = (type : number)=>{
      switch (type) {
      case 0:
        return yearRangeObj.fromYear
      case 1:
        return yearRangeObj.fromMonth
      case 2:
        return yearRangeObj.toYear
      case 3:
        return yearRangeObj.toMonth
      default:
    return null
    }
  }
   const checkYearStatus = () => {
    if (datePicker.fromYear || datePicker.toYear) {
      return true
    }
    return false;
  };
   const validateYear = () => {
    if (datePicker.fromYear || datePicker.toYear) {
      return true
    }
    Alert.alert("Please fill all the required fields")
    return false;
  };
  const onMoveJourney = ()=>{
    dispatch(setJourney("1"))
    props.navigation.reset({
      index : 0,
      routes : [{
        name : Routes.Container
      }]
    })
  }
  return {
    addPreference,
    setPickerSelectedValue,
    checkYearStatus,
    validateYear,
    setYearPickerValue,
    validateBudget,
    validateCard,
    getSelectedModelList,
    instatiateManager,
    yearRangeObj,
    setYearRangeObj,
    budgetObj,
    setBudgetObj,
    step,
    setStep,
    modelObj,
    setModelObj,
    onSelectModel,
    selectedMaker,
    selectedModel,
    datePicker,
    showDatePicker,
    onMoveJourney
  };
};

export default JourneyManager;
export type JourneyManagerType = ReturnType<typeof JourneyManager>;
