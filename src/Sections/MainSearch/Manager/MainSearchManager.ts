import React, {useEffect, useRef, useState} from 'react';
import {
  driveTrainList,
  mainSearchFilterTypes,
  sortingTypes,
  steeringList,
  transmissionList,
} from '../../../utilis/AppStrings';
import {CarModel} from '../../../Model/CarModel';
import {MakeModel} from '../../../Model/CarMakeModel';
import {useDispatch} from 'react-redux';
import CommonManager from '../../../utilis/CommonManager';
import {getModelListApi} from '../../../Network/Services/SharedService';
import {setLoading} from '../../../redux/Reducers/AppReducer';
import {BudgetProps, YearRange} from '../../Journey/Manager/JourneyManager';
import {Alert} from 'react-native';
import {BodyTypeModel} from '../../../Model/BodyTypeModel';
import {VehicleModel} from '../../../Model/VehicleModel';
import {ScreenProps} from '../../../utilis/AppConstant';
import {BudgetModel} from '../../../Model/BudgetModel';
import {getCarListingApi} from '../../../Network/Services/HomeService';
import moment from 'moment';
import {addPreferenceApi} from '../../../Network/Services/JourneyService';
import {Routes} from '../../../utilis/Routes';
import {ColorModel} from '../../../Model/ColorModel';
import {AiSearchModel} from '../../../Model/AiSearchModel';
export interface OptionType {
  value?: string;
  isVisible?: boolean;
}
export interface ColorTypesList {
  value?: ColorModel[];
  isVisible?: boolean;
}
const MainSearchManager = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const [showMake, setShowMake] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showBodyType, setShowBodyType] = useState(false);
  const [showSortType, setShowSortType] = useState(false);
  const [type, setType] = useState(0);
  const modelListMap = useRef<Map<number, CarModel[]>>(new Map());
  const [selectedMaker, setSelectedMaker] = useState<MakeModel | null>();
  const [selectedModel, setSelectedModel] = useState<CarModel>();
  const [yearRangeObj, setYearRangeObj] = useState<YearRange>({
    isVisible: false,
  });
  const [datePicker, showDatePicker] = useState<YearRange>({isVisible: false});
  const [budgetObj, setBudgetObj] = useState<BudgetProps>({isVisible: false});
  const [mileageObj, setMileageObj] = useState<BudgetProps>({isVisible: false});
  const [bodyType, setBodyType] = useState<BodyTypeModel>();
  const [steeringType, setSteeringType] = useState<OptionType>({
    isVisible: false,
  });
  const [tranmissionType, setTransmissionType] = useState<OptionType>({
    isVisible: false,
  });
  const [engineType, setEngineType] = useState<OptionType>({isVisible: false});
  const [fuelType, setFuelType] = useState<OptionType>({isVisible: false});
  const [driveTrain, setDriveTrain] = useState<OptionType>({isVisible: false});
  const [colorType, setColorType] = useState<ColorTypesList>({
    isVisible: false,
  });
  const [seatsObj, setSeatsObj] = useState<BudgetProps>({isVisible: false});
  const [carList, setCarList] = useState<VehicleModel[]>([]);
  const carListRef = useRef<VehicleModel[]>([]);
  const listType = useRef<any>(null);
  const pageRef = useRef<number>(1);
  const totalPageRef = useRef<number>(5);
  const loadingMore = useRef<boolean>(false);
  const per_page = 30;
  const [priceSorting, setPriceSorting] = useState(-1);
  const [mileageSorting, setMileageSorting] = useState(-1);
  const [modelSorting, setModelSorting] = useState(-1);
  const [dateSorting, setDateSorting] = useState(-1);
  const [isAdvanceFilters, setAdvanceFilters] = useState(false);
  useEffect(() => {
    if (!isAdvanceFilters) {
      totalPageRef.current = 5;
      pageRef.current = 1;
      getFilterData(1, false);
    }
  }, [
    selectedMaker,
    selectedModel,
    yearRangeObj.fromYear,
    yearRangeObj.toYear,
    budgetObj.maxPrice,
    budgetObj.minPrice,
    mileageObj.maxPrice,
    mileageObj.minPrice,
    bodyType,
    steeringType.value,
    tranmissionType.value,
    engineType.value,
    fuelType.value,
    driveTrain.value,
    colorType.value,
    seatsObj.maxPrice,
    seatsObj.minPrice,
    setAdvanceFilters,
  ]);
  useEffect(() => {
    setCarListing();
  }, [priceSorting, mileageSorting, modelSorting, dateSorting]);
  //Methods
  const updateSortingValues = (
    priceValue: number,
    mileageSort: number,
    modelSort: number,
    dateSort: number,
  ) => {
    setPriceSorting(priceValue);
    setMileageSorting(mileageSort);
    setModelSorting(modelSort);
    setDateSorting(dateSort);
  };
  const initialize = () => {
    receivedScreenParams(props.route.params);
  };
  const setHoriFilters = (title: string, type: mainSearchFilterTypes) => {
    let obj = {
      title: title,
      isSelected: false,
    };
    switch (type) {
      case mainSearchFilterTypes.make:
        if (selectedMaker) {
          obj = {
            title: selectedMaker.name,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.model:
        if (selectedModel) {
          obj = {
            title: selectedModel?.name ?? '',
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.year:
        if (checkMainYearStatus()) {
          obj = {
            title: `${yearRangeObj.fromYear ?? 0} - ${
              yearRangeObj.toYear ?? ''
            }`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.price:
        if (budgetObj.maxPrice || budgetObj.minPrice) {
          obj = {
            title: `$${CommonManager.shared.formattedNumber(
              budgetObj.minPrice ?? 0,
            )} - $${
              budgetObj.maxPrice
                ? CommonManager.shared.formattedNumber(budgetObj.maxPrice)
                : ''
            }`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.bodyType:
        if (bodyType) {
          obj = {
            title: bodyType.name,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.mileage:
        if (mileageObj.maxPrice || mileageObj.minPrice) {
          obj = {
            title: `${mileageObj.minPrice ?? 0}km - ${
              mileageObj.maxPrice ?? ''
            }km`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.steering:
        if (steeringType.value) {
          obj = {
            title: `${steeringType.value}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.transmission:
        if (tranmissionType.value) {
          obj = {
            title: `${tranmissionType.value}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.engineSize:
        if (engineType.value) {
          obj = {
            title: `${engineType.value}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.color:
        if (colorType.value && colorType.value.length > 0) {
          let name = '';
          colorType.value.forEach(item => {
            name += `${item.name}, `;
          });
          obj = {
            title: `${name}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.fuelType:
        if (fuelType.value) {
          obj = {
            title: `${fuelType.value}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.seats:
        if (seatsObj.minPrice && seatsObj.maxPrice) {
          obj = {
            title: `${seatsObj.minPrice} - ${seatsObj.maxPrice}`,
            isSelected: true,
          };
        }
        break;
      case mainSearchFilterTypes.driveTrain:
        if (driveTrain.value) {
          obj = {
            title: `${driveTrain.value}`,
            isSelected: true,
          };
        }
        break;
      default:
        break;
    }
    return obj;
  };
  const openModalType = (
    type: mainSearchFilterTypes,
    isSelected: boolean = false,
  ) => {
    switch (type) {
      case mainSearchFilterTypes.make:
        if (isSelected) {
          setSelectedMaker(null);
          return;
        }
        setShowMake(true);
        break;
      case mainSearchFilterTypes.model:
        if (isSelected) {
          setSelectedModel(null);
          return;
        }
        setShowModel(true);
        break;
      case mainSearchFilterTypes.year:
        if (isSelected) {
          setYearRangeObj({
            isVisible: false,
          });
          return;
        }
        setYearRangeObj({
          ...yearRangeObj,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.price:
        if (isSelected) {
          setBudgetObj({
            isVisible: false,
          });
          return;
        }
        setBudgetObj({
          ...budgetObj,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.bodyType:
        if (isSelected) {
          setBodyType(null);
          return;
        }
        setShowBodyType(true);
        break;
      case mainSearchFilterTypes.mileage:
        if (isSelected) {
          setMileageObj({
            isVisible: false,
          });
          return;
        }
        setMileageObj({
          ...mileageObj,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.steering:
        if (isSelected) {
          setSteeringType({
            isVisible: false,
          });
          return;
        }
        setSteeringType({
          ...steeringType,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.transmission:
        if (isSelected) {
          setTransmissionType({
            isVisible: false,
          });
          return;
        }
        setTransmissionType({
          ...tranmissionType,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.engineSize:
        if (isSelected) {
          setEngineType({
            isVisible: false,
          });
          return;
        }
        setEngineType({
          ...engineType,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.color:
        if (isSelected) {
          setColorType({
            isVisible: false,
          });
          return;
        }
        setColorType({
          ...colorType,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.fuelType:
        if (isSelected) {
          setFuelType({
            isVisible: false,
          });
          return;
        }
        setFuelType({
          ...fuelType,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.seats:
        if (isSelected) {
          setSeatsObj({
            isVisible: false,
          });
          return;
        }
        setSeatsObj({
          ...seatsObj,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.driveTrain:
        if (isSelected) {
          setDriveTrain({
            isVisible: false,
          });
          return;
        }
        setDriveTrain({
          ...driveTrain,
          isVisible: true,
        });
        break;
      case mainSearchFilterTypes.sort:
        setShowSortType(true);
        break;
      default:
        break;
    }
  };
  const getList = async (id: number = -1) => {
    return new Promise((resolve, reject) => {
      if (id === -1) {
        resolve(CommonManager.shared.quickFiltersModelList);
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
  const checkMainYearStatus = () => {
    if (yearRangeObj.fromYear || yearRangeObj.toYear) {
      return true;
    }
    return false;
  };
  const checkYearStatus = () => {
    if (datePicker.fromYear || datePicker.toYear) {
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
  const validateBudget = (minPrice: number, maxPrice: number) => {
    if (minPrice > maxPrice) {
      Alert.alert('Error', 'Minimum price must be less than maximum price.');
      return false;
    }
    if (minPrice || maxPrice) {
      return true;
    }
    return true;
  };
  const getSelectedColorListIndex = () => {
    let indexList: number[] = [];
    if (colorType.value) {
      colorType.value.forEach(color => {
        let index = CommonManager.shared.colorList.findIndex(
          item => item.id == color.id,
        );
        if (index != -1) {
          indexList.push(index);
        }
      });
    }
    return indexList;
  };
  const receivedScreenParams = (params: any) => {
    listType.current = null;
    
    if (params && params?.searchParams) {
      if (params.searchParams?.searchType) {
        listType.current = params.searchParams.searchType;
      } else {
        listType.current = '';
      }
      if (params?.searchParams?.type) {
        let item = params.searchParams.item;
        let type: any = params.searchParams.type;
        setReceivedParams(item, type);
      }
      else if (params?.searchParams?.aiParams) {
        onAiParams(params?.searchParams?.aiParams)
      }
      else {
        totalPageRef.current = 5;
        pageRef.current = 1;
        getFilterData(1, false);
      }
    }
  };
  const setReceivedParams = (obj: any, type: mainSearchFilterTypes) => {
    switch (type) {
      case mainSearchFilterTypes.make:
        setSelectedMaker(obj);
        break;
      case mainSearchFilterTypes.model:
        setSelectedModel(obj);
        break;
      case mainSearchFilterTypes.bodyType:
        setBodyType(obj);
        break;
      case mainSearchFilterTypes.price:
        let finedObj: BudgetModel = obj;
        setBudgetObj({
          isVisible: false,
          maxPrice: Number(finedObj.max_price) ?? 0,
          minPrice: Number(finedObj.min_price) ?? 0,
        });
        break;
      default:
        break;
    }
  };
  const setReceiveAdvanceParams = (obj: any, type: mainSearchFilterTypes) => {
    console.log(type);
    switch (type) {
      case mainSearchFilterTypes.make:
        setSelectedMaker(obj);
        break;
      case mainSearchFilterTypes.model:
        setSelectedModel(obj[0]);
        break;
      case mainSearchFilterTypes.year:
        setYearRangeObj(obj);
        break;
      case mainSearchFilterTypes.price:
        setBudgetObj({
          ...obj,
        });
        break;
      case mainSearchFilterTypes.bodyType:
        setBodyType(obj);
        break;
      case mainSearchFilterTypes.mileage:
        setMileageObj(obj);
        break;
      case mainSearchFilterTypes.steering:
        setSteeringType(obj);
        break;
      case mainSearchFilterTypes.transmission:
        setTransmissionType(obj);
        break;
      case mainSearchFilterTypes.engineSize:
        setEngineType(obj);
        break;
      case mainSearchFilterTypes.fuelType:
        setFuelType(obj);
        break;
      case mainSearchFilterTypes.color:
        setColorType(obj);
        break;
      case mainSearchFilterTypes.seats:
        setSeatsObj(obj);
        break;
      case mainSearchFilterTypes.driveTrain:
        setDriveTrain(obj);
        break;
      default:
        break;
    }
  };
  const getFilterData = (page: number, isLoadMore: boolean) => {
    if (listType.current == null) {
      return;
    }
    if (pageRef.current > totalPageRef.current) {
      return;
    }
    let required_images = 5;
    let params: any = {
      required_images,
      per_page,
      page,
    };
    if (listType.current && listType.current != '') {
      params[`type`] = listType.current;
    }
    if (selectedMaker) {
      params['q[maker_id_eq]'] = selectedMaker.id;
    }
    if (selectedModel) {
      params['q[model_id_eq]'] = selectedModel.id;
    }
    if (yearRangeObj.fromYear) {
      params['q[year_gteq]'] = yearRangeObj.fromYear;
    }
    if (yearRangeObj.toYear) {
      params['q[year_lteq]'] = yearRangeObj.toYear;
    }
    if (budgetObj.maxPrice) {
      params['q[sale_price_lteq]'] = budgetObj.maxPrice;
    }
    if (budgetObj.minPrice) {
      params['q[sale_price_gteq]'] = budgetObj.minPrice;
    }
    if (bodyType) {
      params['q[type_id_eq]'] = bodyType.id;
    }
    if (mileageObj.maxPrice) {
      params['q[mileage_lteq]'] = budgetObj.maxPrice;
    }
    if (mileageObj.minPrice) {
      params['q[mileage_gteq]'] = budgetObj.minPrice;
    }
    if (engineType.value) {
      params['q[engine_size_lteq]'] = engineType.value.replaceAll(' cc', '');
    }
    if (steeringType.value) {
      params['q[steering_eq]'] = steeringType.value;
    }
    if (fuelType.value) {
      let obj = CommonManager.shared.fuelList.find(
        item => item.name == fuelType.value,
      );
      if (obj) {
        params['q[fuel_type_id_eq]'] = obj.id;
      }
    }
    if (tranmissionType.value) {
      let obj = transmissionList.find(
        item => item.name == tranmissionType.value,
      );
      if (obj) {
        params['q[transmission_id_eq]'] = obj.id;
      }
    }
    if (driveTrain.value) {
      let obj = driveTrainList.find(item => item.name == driveTrain.value);
      if (obj) {
        params['q[drive_eq]'] = obj.name;
      }
    }
    if (seatsObj.maxPrice) {
      params['q[seats_lteq]'] = seatsObj.maxPrice;
    }
    if (seatsObj.minPrice) {
      params['q[seats_gteq]'] = seatsObj.minPrice;
    }
    if (CommonManager.shared.ip != '') {
      params['ip'] = CommonManager.shared.ip;
    }
    if (colorType.value && colorType.value.length > 0) {
      params['q[exterior_color_id_in]'] = colorType.value.map(item => item.id);
    }
    dispatch(setLoading(true));
    getCarListingApi(params)
      .then(response => {
        pageRef.current = pageRef.current + 1;
        console.log('current page is ', pageRef.current);
        totalPageRef.current = response?.pagination?.total_pages ?? 0;
        if (response?.cars) {
          if (isLoadMore) {
            carListRef.current = [...carListRef.current, ...response.cars];
          } else {
            carListRef.current = response.cars;
          }
          setCarListing();
        }
      })
      .catch(() => {})
      .finally(() => {
        loadingMore.current = false;
        dispatch(setLoading(false));
      });
  };
  const addPreference = () => {
    let filters: any = {};
    if (selectedMaker) {
      filters['make'] = {
        id: selectedMaker.id,
        name: selectedMaker.name,
      };
    }
    if (selectedModel) {
      filters['model'] = {
        id: selectedModel.id,
        name: selectedModel.name,
      };
    }
    if (yearRangeObj.fromYear) {
      filters['minYear'] = `${yearRangeObj.fromYear}`;
    }
    if (yearRangeObj.toYear) {
      filters['maxYear'] = `${yearRangeObj.toYear}`;
    }
    if (yearRangeObj.fromMonth) {
      filters['minMonth'] = `${yearRangeObj.fromMonth}`;
    }
    if (yearRangeObj.fromMonth) {
      filters['maxMonth'] = `${yearRangeObj.toMonth}`;
    }
    if (budgetObj.minPrice) {
      filters['minPrice'] = `${budgetObj.minPrice}`;
    }
    if (budgetObj.minPrice) {
      filters['maxPrice'] = `${budgetObj.maxPrice}`;
    }
    if (bodyType) {
      filters['body'] = {
        id: bodyType.id,
        name: bodyType.name,
      };
    }
    if (mileageObj.minPrice) {
      filters['minMileage'] = mileageObj.minPrice;
    }
    if (mileageObj.maxPrice) {
      filters['maxMileage'] = mileageObj.maxPrice;
    }
    if (steeringType.value) {
      let item = steeringList.find(item => item.name == steeringType.value);
      if (item) {
        filters['steering'] = item;
      }
    }
    if (tranmissionType.value) {
      let item = transmissionList.find(item => item.name == steeringType.value);
      if (item) {
        filters['transmission'] = item;
      }
    }
    if (engineType.value) {
      filters['engineSize'] = engineType.value.replaceAll(' cc', '');
    }
    if (colorType.value) {
      filters['colors'] = colorType.value.map(item => item.id);
    }
    if (fuelType.value) {
      let item = CommonManager.shared.fuelList.find(
        item => item.name == fuelType.value,
      );
      if (item) {
        filters['fuel'] = item;
      }
    }
    if (seatsObj.maxPrice) {
      filters['maxSeats'] = seatsObj.maxPrice;
    }
    if (seatsObj.minPrice) {
      filters['minSeats'] = seatsObj.minPrice;
    }
    if (driveTrain.value) {
      let item = driveTrainList.find(item => item.name == fuelType.value);
      if (item) {
        filters['driveTrain'] = item;
      }
    }
    if (Object.entries(filters).length == 0) {
      Alert.alert('Error', 'Atleast select one search option.');
      return;
    }
    let params = {
      uuid: CommonManager.shared.deviceId,
      preference_type: 'save_search',
      filters,
    };
    dispatch(setLoading(true));
    addPreferenceApi(params)
      .then(response => {
        if (response) {
          Alert.alert('Success', 'Search Preference saved');
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const setCarListing = () => {
    if (carListRef.current) {
      let sortedList = [...carListRef.current];
      if (priceSorting != -1) {
        if (priceSorting == 0) {
          sortedList.sort((a, b) => a.sale_price - b.sale_price);
        } else {
          sortedList.sort((a, b) => b.sale_price - a.sale_price);
        }
      }
      if (mileageSorting != -1) {
        if (mileageSorting == 0) {
          sortedList.sort((a, b) => a.mileage - b.mileage);
        } else {
          sortedList.sort((a, b) => b.mileage - a.mileage);
        }
      }
      if (modelSorting != -1) {
        if (modelSorting == 0) {
          sortedList.sort((a, b) => a.year - b.year);
        } else {
          sortedList.sort((a, b) => b.year - a.year);
        }
      }
      if (dateSorting != -1) {
        if (dateSorting == 0) {
          sortedList.sort(
            (a, b) =>
              moment(a.date_modified).date() - moment(b.date_modified).date(),
          );
        } else {
          sortedList.sort(
            (a, b) =>
              moment(b.date_modified).date() - moment(a.date_modified).date(),
          );
        }
      }
      setCarList(sortedList);
    }
  };
  const handleLoadMore = () => {
    if (loadingMore.current) {
      return;
    }
    loadingMore.current = true;
    getFilterData(pageRef.current, true);
  };
  const onFilters = () => {
    props.navigation.push(Routes.RefineSearch, {
      onAdvanceFilters: (params: any[]) => onAdvanceFilters(params),
    });
  };
  const onAdvanceFilters = (paramsList: any[]) => {
    setAdvanceFilters(true);
    paramsList.map((item: any, index) => {
      if (index == paramsList.length - 1) {
        setAdvanceFilters(false);
      }
      setReceiveAdvanceParams(item.value, item.type);
    });
  };
  const onAiParams = async (params: AiSearchModel) => {
    console.log("ai params call ",params)
    dispatch(setLoading(true))
    setAdvanceFilters(true)
    if (params.car_maker) {
      let make = CommonManager.shared.makeList.find(
        item => item.name.toLowerCase() == params.car_maker?.toLowerCase(),
      );
      if (make) {
        setReceiveAdvanceParams(make,mainSearchFilterTypes.make)
        if (params.car_model) {
          let id = make?.id;
         await getModelListApi(make.id).then(response => {
            if (
              response?.success &&
              response.models &&
              response.models.length > 0
            ) {
              modelListMap.current.set(id, response.models);
              let model = response.models.find(
                item =>
                  item.name.toLowerCase() == params.car_model?.toLowerCase(),
              );
              if (model){
                setSelectedModel(model)
              }
            }
          });
        }
      }
    }
    if (params.car_color){
      let color = CommonManager.shared.colorList.find((item)=>item.name.toLowerCase() == params.car_color?.toLowerCase())
      if (color){
        setColorType({
          ...colorType,
          value : [color]
        })
      }
    }
    if (params.car_body_type){
      let findedType = CommonManager.shared.bodyTypeList.find((item)=>item.name.toLowerCase() === params.car_body_type?.toLowerCase())
      if (findedType){
        setBodyType(findedType)
      }
    }
    let fromBud = 0
    let toBud = 0
    if (params.car_from_budget){
      fromBud = Number(params.car_from_budget) ?? 0
    }
     if (params.car_to_budget){
      toBud = Number(params.car_to_budget) ?? 0
    }
    if (fromBud != 0 || toBud != 0){
    let findedObj : BudgetProps = {
      isVisible : false,
      minPrice : fromBud != 0 ? fromBud : null,
      maxPrice : toBud != 0 ? toBud : null
    }
    setBudgetObj(findedObj)
    }
    dispatch(setLoading(false))
    setAdvanceFilters(false)
  };
  const onDetail = (id: any) => {
    props.navigation.push(Routes.CarDetailScreen, {
      id: id,
    });
  };
  return {
    bodyType,
    setBodyType,
    showBodyType,
    setShowBodyType,
    validateBudget,
    yearRangeObj,
    setYearRangeObj,
    datePicker,
    showDatePicker,
    setYearPickerValue,
    setPickerSelectedValue,
    validateYear,
    checkYearStatus,
    setHoriFilters,
    getList,
    openModalType,
    type,
    setType,
    showMake,
    setShowMake,
    showModel,
    setShowModel,
    selectedMaker,
    setSelectedMaker,
    selectedModel,
    setSelectedModel,
    onSelectMake,
    budgetObj,
    setBudgetObj,
    mileageObj,
    setMileageObj,
    steeringType,
    setSteeringType,
    tranmissionType,
    setTransmissionType,
    engineType,
    setEngineType,
    colorType,
    setColorType,
    fuelType,
    setFuelType,
    seatsObj,
    setSeatsObj,
    driveTrain,
    setDriveTrain,
    getSelectedColorListIndex,
    carList,
    setCarList,
    initialize,
    handleLoadMore,
    showSortType,
    setShowSortType,
    updateSortingValues,
    priceSorting,
    mileageSorting,
    modelSorting,
    dateSorting,
    addPreference,
    onFilters,
    onDetail,
  };
};

export default MainSearchManager;
export type MainSearchManagerType = ReturnType<typeof MainSearchManager>;
