import React, {useEffect, useRef, useState} from 'react';
import {VehicleModel} from '../../../Model/VehicleModel';
import {useDispatch} from 'react-redux';
import {setLoading, setShowAiFilters} from '../../../redux/Reducers/AppReducer';
import {getCarListingApi} from '../../../Network/Services/HomeService';
import {ScreenProps} from '../../../utilis/AppConstant';
import CommonManager from '../../../utilis/CommonManager';
import {Routes} from '../../../utilis/Routes';
import {AiInterestModel, AiSearchModel} from '../../../Model/AiSearchModel';
import {getModelListApi} from '../../../Network/Services/SharedService';
import {
  getLastVisitedCarsApi,
  smartInquiryApi,
} from '../../../Network/Services/SmartServices';
import {getSmartMatchDataApi} from '../../../Network/Services/AiService';
import {CountryModel} from '../../../Model/CountryModel';
import {PortModel} from '../../../Model/PortModel';
import SelectionDropDownModel from '../../../Model/SelectionDropDownModel';
import {AppStrings} from '../../../utilis/AppStrings';

const SmartMatchManager = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const [list, setList] = useState<VehicleModel[]>([]);
  const [currentItem, setCurentItem] = useState(0);
  // forms params
  const [inquiryCar, setInquiryCar] = useState<VehicleModel>();
  const [country, setCountry] = useState<CountryModel>();
  const [port, setPort] = useState<PortModel>();
  const [modelObj, setModelObj] = useState<SelectionDropDownModel | null>();
  const portListRef = useRef<PortModel[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    generatePortList();
  }, [country]);
  const generatePortList = () => {
    let portList = CommonManager.shared.portList.filter(
      port => port.country.id == country?.id,
    );
    portListRef.current = portList;
    setPort(undefined);
    if (portListRef.current && portListRef.current.length > 0) {
      setPort(portListRef.current[0]);
    }
  };
  const onSelectItem = (index: number) => {
    if (modelObj?.type == 0) {
      setCountry(CommonManager.shared.countriesList[index]);
    } else {
      setPort(portListRef.current[index]);
    }
    setModelObj(null);
  };

  const initialize = () => {
    if (props.route.params && props.route.params['inquiryCar']) {
      setInquiryCar(props.route.params['inquiryCar']);
      if (CommonManager.shared.userCountry) {
        setCountry(CommonManager.shared.userCountry);
      }
    } else {
      getVisitedData();
    }
  };
  const getVisitedData = () => {
    dispatch(setLoading(true));
    getLastVisitedCarsApi()
      .then(response => {
        if (response?.cars) {
                  console.log("respons finded ",response)
          let newDataModelList = response.cars.map(item => {
            let obj = {
              make: item.make.name ?? "",
              model: item.model_name ?? "",
              price: item.sale_price,
              year: item.year,
              body: item.type.name,
              mileage: item.mileage,
              color: item.exterior_color,
              seat: item.seats,
            };
            return obj;
          });
          let params = {
            cars_data: JSON.stringify(newDataModelList),
          };
          console.log("calling next api")
          getSmartMatchDataApi(params)
            .then(response => {
              if (response) extractInterestParams(response);
            })
            .finally(() => {});
        }
      })
      .catch(() => {})
      .finally(() => {});
  };
  const extractInterestParams = async (response: AiInterestModel[]) => {
    if (response && response.length > 0) {
      let make = '';
      let model = '';
      let budget = '';
      let mileage = '';
      let year = '';
      let body = '';
      let color = '';
      console.log('param for interest is ', response);
      response.forEach(item => {
        switch (item.user_interest_type) {
          case 'car_maker':
            make = item.user_interest_value;
            break;
          case 'car_model':
            model = item.user_interest_value;
            break;
          case 'car_color':
            color = item.user_interest_value;
            break;
          case 'car_to_budget':
            budget = item.user_interest_value;
            break;
          case 'car_body_type':
            body = item.user_interest_value;
            break;
          case 'car_mileage_max':
            mileage = item.user_interest_value;
            break;
          case 'car_from_year':
            year = item.user_interest_value;
            break;
          default:
            console.log('default');
            break;
        }
      });
      let newParams: any = {};
      if (make != '') {
        let findedMake = CommonManager.shared.makeList.find(
          item => item.name.toLowerCase() == make?.toLowerCase(),
        );
        if (findedMake) {
          newParams['q[maker_id_eq]'] = findedMake.id;
          if (model != '') {
            await getModelListApi(findedMake.id).then(response => {
              if (
                response?.success &&
                response.models &&
                response.models.length > 0
              ) {
                let findedModel = response.models.find(
                  item => item.name.toLowerCase() == model?.toLowerCase(),
                );
                if (findedModel) {
                  newParams['q[model_id_eq]'] = findedModel.id;
                }
              }
            });
          }
        }
      }
      if (color != '') {
        let findedColor = CommonManager.shared.colorList.find(
          item => item.name.toLowerCase() == color?.toLowerCase(),
        );
        if (findedColor) {
          newParams['q[exterior_color_id_in]'] = [findedColor.id];
        }
      }
      if (body != '') {
        let findedType = CommonManager.shared.bodyTypeList.find(
          item => item.name.toLowerCase() === body?.toLowerCase(),
        );
        if (findedType) {
          newParams['q[type_id_eq]'] = findedType.id;
        }
      }
      if (budget != '') {
        newParams['q[sale_price_gteq]'] = budget;
      }
      if (year != '') {
        newParams['q[year_lteq]'] = year;
      }
      if (mileage != '') {
        newParams['q[mileage_lteq]'] = mileage;
      }
      getFilterData(newParams);
    }
  };
  const getFilterData = (findedParams: any = {}) => {
    let required_images = 1;
    let params: any = {
      required_images,
      per_page: 100,
      ...findedParams,
    };
    dispatch(setLoading(true));
    getCarListingApi(params)
      .then(response => {
        if (response?.cars) {
          setList(response.cars);
          setCurentItem(0);
        } else {
          setCurentItem(-1);
          setList([]);
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const onMenuItem = (index: number) => {
    if (index == 0) {
      let newList = [...list];
      newList.splice(currentItem - 1, 1);
      setList(newList);
    }
    if (index == 1) {
      onAiFilter(props);
    }
    if (index == 2) {
      onSmartForm(list[currentItem], props);
    }
  };
  const onSmartForm = (item: VehicleModel, props: ScreenProps) => {
    props.navigation.push(Routes.SmartMatchInquiryScreen, {
      inquiryCar: item,
    });
  };
  const onAiFilter = async (props: ScreenProps) => {
    dispatch(setShowAiFilters(true));
    CommonManager.shared.onAiFilters = async (params: AiSearchModel) => {
      if (Object.entries(params).length == 0) {
        return;
      }
      let newParams: any = {};
      if (params.car_maker) {
        let make = CommonManager.shared.makeList.find(
          item => item.name.toLowerCase() == params.car_maker?.toLowerCase(),
        );
        if (make) {
          newParams['q[maker_id_eq]'] = make.id;
          if (params.car_model) {
            await getModelListApi(make.id).then(response => {
              if (
                response?.success &&
                response.models &&
                response.models.length > 0
              ) {
                let model = response.models.find(
                  item =>
                    item.name.toLowerCase() == params.car_model?.toLowerCase(),
                );
                if (model) {
                  newParams['q[model_id_eq]'] = model.id;
                }
              }
            });
          }
        }
      }
      if (params.car_color) {
        let color = CommonManager.shared.colorList.find(
          item => item.name.toLowerCase() == params.car_color?.toLowerCase(),
        );
        if (color) {
          newParams['q[exterior_color_id_in]'] = [color.id];
        }
      }
      if (params.car_body_type) {
        let findedType = CommonManager.shared.bodyTypeList.find(
          item =>
            item.name.toLowerCase() === params.car_body_type?.toLowerCase(),
        );
        if (findedType) {
          newParams['q[type_id_eq]'] = findedType.id;
        }
      }
      let fromBud = 0;
      let toBud = 0;
      if (params.car_from_budget) {
        fromBud = Number(params.car_from_budget) ?? 0;
      }
      if (params.car_to_budget) {
        toBud = Number(params.car_to_budget) ?? 0;
      }
      if (fromBud == toBud) {
        fromBud = 0;
      }
      if (fromBud != 0) {
        newParams['q[sale_price_gteq]'] = fromBud;
      }
      if (toBud != 0) {
        newParams['q[sale_price_lteq]'] = toBud;
      }
      getFilterData(newParams);
    };
  };
  const onDetail = (id: any, navigation: any) => {
    navigation.push(Routes.CarDetailScreen, {
      id: id,
      smart : true
    });
  };
  const onSmartInquiryValidation = () => {
    if (country == null) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.countryError,
      );
      return false;
    }
    if (port == null) {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.portError);
      return false;
    }
    return true;
  };
  const onSmartMatchInquiry = () => {
    if (onSmartInquiryValidation()) {
      let bodyParams = {
        demand_by: 'Customer',
        customer_name: CommonManager.shared.currentUser?.first_name.trim(),
        color_id: inquiryCar?.exterior_color.id,
        millage_from: inquiryCar?.mileage,
        millage_to: inquiryCar?.mileage,
        year_from: inquiryCar?.year,
        year_to: inquiryCar?.year,
        phone: CommonManager.shared.currentUser?.phone_no,
        email: CommonManager.shared.currentUser?.email,
        start_price: inquiryCar?.sale_price,
        end_price: inquiryCar?.sale_price,
        country_id: country?.id,
        port_id: port?.id,
        status: 'Active',
        expires_in: 10,
        user_id: CommonManager.shared.currentUser?.id,
        make_id: inquiryCar?.make.id,
        model_id: inquiryCar?.model.id,
        message: message,
      };
      let params = {
        smart_matching: bodyParams,
      };
      console.log(params);
      dispatch(setLoading(true));
      smartInquiryApi(params)
        .then(response => {
          console.log('response is ', response);
          if (response) {
            CommonManager.shared.showMessage(
              'We have received your match Inquiry.',
              1,
            );
            navigateToMain(props);
          }
        })
        .catch(response => {
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showPopUp('Error', msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  const navigateToMain = (props: ScreenProps) => {
    let routeIndex = 0;
    const state = props.navigation.getState();

    let routeNames = state.routes;
    for (let i = 0; i < routeNames.length; i++) {
      const element = routeNames[i];
      if (element.name == Routes.CarDetailScreen) {
        routeIndex = i;
        break;
      }
      if (element.name == Routes.Container) {
        routeIndex = i;
        break;
      }
    }
    let finalIndex = routeNames.length - 1 - routeIndex;
    props.navigation.pop(finalIndex);
  };
  return {
    list,
    currentItem,
    setCurentItem,
    onMenuItem,
    inquiryCar,
    country,
    port,
    modelObj,
    setModelObj,
    message,
    setMessage,
    onSelectItem,
    portListRef,
    onSmartMatchInquiry,
    onDetail,
  };
};

export default SmartMatchManager;
export type SmartMatchManagerType = ReturnType<typeof SmartMatchManager>;
