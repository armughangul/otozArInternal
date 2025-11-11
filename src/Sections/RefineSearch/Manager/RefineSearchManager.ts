import React, {useRef, useState} from 'react';
import {MakeModel} from '../../../Model/CarMakeModel';
import {CarModel} from '../../../Model/CarModel';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../../redux/Reducers/AppReducer';
import {getModelListApi} from '../../../Network/Services/SharedService';
import {BudgetProps, YearRange} from '../../Journey/Manager/JourneyManager';
import {Alert} from 'react-native';
import {BodyTypeModel} from '../../../Model/BodyTypeModel';
import {
  ColorTypesList,
  OptionType,
} from '../../MainSearch/Manager/MainSearchManager';
import {MAX_PRICE, MAX_SEATS, ScreenProps} from '../../../utilis/AppConstant';
import {mainSearchFilterTypes} from '../../../utilis/AppStrings';
const RefineSearchManager = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const [budgetObj, setBudgetObj] = useState<BudgetProps>({
    minPrice: 0,
    maxPrice: MAX_PRICE,
  });
  const [mileageObj, setMileageObj] = useState<BudgetProps>({
    minPrice: 0,
    maxPrice: MAX_PRICE,
  });
  const [selectedMaker, setSelectedMaker] = useState<MakeModel | null>();
  const [selectedModelList, setSelectedModelList] = useState<CarModel[]>([]);
  const [showMake, setShowMake] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [datePicker, showDatePicker] = useState<YearRange>({});
  const [yearRangeObj, setYearRangeObj] = useState<YearRange>({});
  const [bodyType, setBodyType] = useState<BodyTypeModel | null>();
  const [steeringType, setSteeringType] = useState<OptionType>({});
  const [tranmissionType, setTransmissionType] = useState<OptionType>({});
  const [engineType, setEngineType] = useState<OptionType>({});
  const [fuelType, setFuelType] = useState<OptionType>({});
  const [driveTrain, setDriveTrain] = useState<OptionType>({});
  const [colorType, setColorType] = useState<ColorTypesList>({});
  const [seatsObj, setSeatsObj] = useState<BudgetProps>({
    minPrice: 0,
    maxPrice: MAX_SEATS,
  });

  const modelListMap = useRef<Map<number, CarModel[]>>(new Map());
  const getList = async (id: number = -1) => {
    return new Promise((resolve, reject) => {
      if (id === -1) {
        resolve([]);
        return;
      }
      if (modelListMap.current.has(id)) {
        resolve(modelListMap.current.get(id));
        return;
      }
      dispatch(setLoading(true));
      getModelListApi(id)
        .then(response => {
          if (
            response?.success &&
            response.models &&
            response.models.length > 0
          ) {
            modelListMap.current.set(id, response.models);
            resolve(response.models);
          }
        })
        .catch(() => resolve([]))
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };
  const onSelectMake = (make: MakeModel | null) => {
    if (selectedMaker != make) {
      setSelectedMaker(make);
    }
  };
  const onClearMakeFilter = () => {
    setSelectedMaker(null);
    setSelectedModelList([]);
  };
  const checkMakeModel = () => {
    if (selectedMaker && selectedModelList.length > 0) {
      return true;
    }
    return false;
  };
  const validateYear = () => {
    if (datePicker.fromYear || datePicker.toYear) {
      return true;
    }
    Alert.alert('Please fill all the required fields');
    return false;
  };
  const setYearPickerValue = (value: number) => {
    let obj = {
      ...datePicker,
      isVisible: false,
    };
    switch (obj.type) {
      case 0:
        obj.fromYear = value;
        break;
      case 1:
        obj.fromMonth = value;
        break;
      case 2:
        obj.toYear = value;
        break;
      case 3:
        obj.toMonth = value;
        break;
      default:
        obj.fromYear = value;
        break;
    }
    showDatePicker(obj);
    setYearRangeObj(obj);
  };
  const checkYearStatus = () => {
    if (datePicker.fromYear || datePicker.toYear) {
      return true;
    }
    return false;
  };
  const setPickerSelectedValue = (type: number) => {
    switch (type) {
      case 0:
        return yearRangeObj.fromYear;
      case 1:
        return yearRangeObj.fromMonth;
      case 2:
        return yearRangeObj.toYear;
      case 3:
        return yearRangeObj.toMonth;
      default:
        return null;
    }
  };
  const validateForm = () => {
    if (selectedMaker && selectedModelList.length > 0) {
      return true;
    }
    if (yearRangeObj.fromYear || yearRangeObj.toYear) {
      return true;
    }
    if (budgetObj.minPrice != 0 || budgetObj.maxPrice != MAX_PRICE) {
      return true;
    }
    if (bodyType) {
      return true;
    }
    if (mileageObj.minPrice != 0 || mileageObj.maxPrice != MAX_PRICE) {
      return true;
    }
    if (steeringType.value) {
      return true;
    }
    if (tranmissionType.value) {
      return true;
    }
    if (engineType.value) {
      return true;
    }
    if (fuelType.value) {
      return true;
    }
    if (seatsObj.minPrice != 0 || seatsObj.maxPrice != MAX_SEATS) {
      return true;
    }
    if (driveTrain.value) {
      return true;
    }
    if (colorType.value && colorType.value.length > 0) {
      return true;
    }
    return false;
  };
  const clearFilters = () => {
    setBudgetObj({isVisible: false, minPrice: 0, maxPrice: MAX_PRICE});
    setMileageObj({isVisible: false, minPrice: 0, maxPrice: MAX_PRICE});
    setSelectedMaker(null);
    setSelectedModelList([]);
    setYearRangeObj({});
    setBodyType(null);
    setSteeringType({});
    setTransmissionType({});
    setEngineType({});
    setFuelType({});
    setDriveTrain({});
    setColorType({});
    setSeatsObj({});
  };
  const onAdvanceFilters = () => {
    let filterLists = [];
    if (selectedMaker && selectedModelList.length > 0) {
      filterLists.push({
        type: mainSearchFilterTypes.make,
        value: selectedMaker,
      });
      filterLists.push({
        type: mainSearchFilterTypes.model,
        value: selectedModelList,
      });
    }
    if (yearRangeObj.fromYear || yearRangeObj.toYear) {
      filterLists.push({
        type: mainSearchFilterTypes.year,
        value: yearRangeObj,
      });
    }
    if (budgetObj.minPrice != 0 || budgetObj.maxPrice != MAX_PRICE) {
      filterLists.push({
        type: mainSearchFilterTypes.price,
        value: budgetObj,
      });
    }
    if (bodyType) {
      filterLists.push({
        type: mainSearchFilterTypes.bodyType,
        value: bodyType,
      });
    }
    if (mileageObj.minPrice != 0 || mileageObj.maxPrice != MAX_PRICE) {
      filterLists.push({
        type: mainSearchFilterTypes.mileage,
        value: mileageObj,
      });
    }
    if (steeringType.value) {
      filterLists.push({
        type: mainSearchFilterTypes.steering,
        value: steeringType,
      });
    }
    if (tranmissionType.value) {
      filterLists.push({
        type: mainSearchFilterTypes.transmission,
        value: tranmissionType,
      });
    }
    if (engineType.value) {
      filterLists.push({
        type: mainSearchFilterTypes.engineSize,
        value: engineType,
      });
    }
    if (fuelType.value) {
      filterLists.push({
        type: mainSearchFilterTypes.fuelType,
        value: fuelType,
      });
    }
    if (seatsObj.minPrice != 0 || seatsObj.maxPrice != MAX_SEATS) {
      filterLists.push({
        type: mainSearchFilterTypes.seats,
        value: seatsObj,
      });
    }
    if (driveTrain.value) {
      filterLists.push({
        type: mainSearchFilterTypes.driveTrain,
        value: driveTrain,
      });
    }
    if (colorType.value && colorType.value.length > 0) {
      filterLists.push({
        type: mainSearchFilterTypes.color,
        value: colorType,
      });
    }
    if (props.route.params && props.route.params['onAdvanceFilters']) {
      props.route.params.onAdvanceFilters(filterLists);
      props.navigation.goBack()
    }
  };
  return {
    selectedMaker,
    setSelectedMaker,
    selectedModelList,
    setSelectedModelList,
    showMake,
    setShowMake,
    showModel,
    setShowModel,
    getList,
    onSelectMake,
    onClearMakeFilter,
    checkMakeModel,
    datePicker,
    showDatePicker,
    validateYear,
    setYearPickerValue,
    checkYearStatus,
    setPickerSelectedValue,
    yearRangeObj,
    setYearRangeObj,
    budgetObj,
    setBudgetObj,
    bodyType,
    setBodyType,
    mileageObj,
    setMileageObj,
    steeringType,
    setSteeringType,
    tranmissionType,
    setTransmissionType,
    engineType,
    setEngineType,
    fuelType,
    setFuelType,
    driveTrain,
    setDriveTrain,
    colorType,
    setColorType,
    seatsObj,
    setSeatsObj,
    validateForm,
    clearFilters,
    onAdvanceFilters
  };
};

export default RefineSearchManager;
export type RefineSearchManagerType = ReturnType<typeof RefineSearchManager>;
