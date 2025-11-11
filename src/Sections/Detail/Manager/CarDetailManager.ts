import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScreenProps} from '../../../utilis/AppConstant';
import {VehicleModel} from '../../../Model/VehicleModel';
import {useDispatch, useSelector} from 'react-redux';
import {setImagesList, setLoading} from '../../../redux/Reducers/AppReducer';
import {
  getCarDetailApi,
  getPriceMapChartApi,
  getSimilarCarsApi,
} from '../../../Network/Services/DetailService';
import {ApiResponseHandler} from '../../../Network/ApiResponseHandler';
import {Alert, Linking, Platform} from 'react-native';
import {Routes} from '../../../utilis/Routes';
import CommonManager from '../../../utilis/CommonManager';
import {ChartModel} from '../../../Model/ChartModel';
import {font, FontWeight} from '../../../utilis/AppStyle';
import { checkLastVisitedListApi } from '../../../Network/Services/SmartServices';

const CarDetailManager = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const similarCarList = useRef<VehicleModel[]>([]);
  const [carObj, setCarObj] = useState<VehicleModel>();
  const [tab, setTab] = useState(0);
  const tabList = useRef<any[]>([]);
  const listingTabs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const selector = useSelector((state: any) => state.appReducer);
  const [priceMapData, setPriceMapData] = useState<ChartModel[]>([]);
  const chartData = useCallback(()=>{
    return generateChartData()
  },[priceMapData])
  useEffect(() => {
    initialize();
  }, [selector.appUser]);
  useEffect(() => {
    if (carObj) {
      getPriceChart();
    }
  }, [carObj]);
  const showImagesList = (index: number = 0) => {
    let list = carObj?.images?.map(item => item.image);
    dispatch(setImagesList({imagesList: list, index: index}));
  };
  const initialize = () => {
    if (props.route.params && props.route.params['id']) {
      let id = props.route.params['id'];
      dispatch(setLoading(true));
      getSimilarCarsList(id).finally(() => {
        getCarData(id).finally(() => {
          checkVisitedList()
          dispatch(setLoading(false));
        });
      });
    }
  };
  const checkVisitedList = ()=>{
    if (CommonManager.shared.currentUser){
         checkLastVisitedListApi()
        .then(response => {
          if (response && response.cars && response?.cars?.length > 0) {
            props.navigation.push(Routes.SmartMatchIntroScreen)
          } 
        })
    }
  }
  const getPriceChart = () => {
    return new Promise((resolve, reject) => {
      let params = {
        model_id: carObj?.model.id,
        maker_id: carObj?.make.id,
      };
      getPriceMapChartApi(params)
        .then(response => {
          if (response?.data) {
            setPriceMapData(response.data);
            resolve(true);
          } else {
            reject(true);
          }
        })
        .catch((err: ApiResponseHandler) => {
          reject(true);
        });
    });
  };
  const getCarData = (id: number) => {
    return new Promise((resolve, reject) => {
      getCarDetailApi(id)
        .then(response => {
          if (response?.car) {
            generateTabList(response.car);
            setCarObj(response.car);
            resolve(true);
          } else {
            reject(true);
          }
        })
        .catch((err: ApiResponseHandler) => {
          Alert.alert('Error', err.message[0] ?? '');
          reject(true);
        });
    });
  };
  const getSimilarCarsList = (id: number) => {
    return new Promise((resolve, reject) => {
      getSimilarCarsApi(id)
        .then(response => {
          if (response?.cars) {
            similarCarList.current = response.cars;
            resolve(true);
          } else {
            reject(true);
          }
        })
        .catch((err: ApiResponseHandler) => {
          reject(true);
        });
    });
  };
  const generateTabList = (car: VehicleModel) => {
    let mainList = [];
    let firstList = [];
    firstList.push({
      title: 'Drive Train',
      value: car.drive,
    });
    firstList.push({
      title: 'Steering Type',
      value: car.steering,
    });
    firstList.push({
      title: 'Transmission',
      value: car.transmission,
    });
    firstList.push({
      title: 'Doors',
      value: car.doors,
    });
    mainList.push(firstList);
    let secondList = [];
    secondList.push({
      title: 'Airbags',
      value: car.air_bags == 1 ? 'Yes' : 'No',
    });
    secondList.push({
      title: 'Air Conditioning',
      value: car.air_conditioning == 1 ? 'Yes' : 'No',
    });
    secondList.push({
      title: 'Power Steering',
      value: car.power_steering == 1 ? 'Yes' : 'No',
    });
    secondList.push({
      title: 'Power Windows',
      value: car.power_window == 1 ? 'Yes' : 'No',
    });
    mainList.push(secondList);
    tabList.current = mainList;
  };

  const handleCall = async () => {
    Linking.openURL(`tel:${'+81 3 6435 2269'}`)
      .then(data => {
        console.log('call ' + data); //<---Success
      })
      .catch(() => {
        console.log('call failed');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };
  const handleSMS = async () => {
    let number =
      Platform.OS === 'android'
        ? `sms:${'+81 3 6435 2269'}?body=`
        : `sms:${'+81 3 6435 2269'}&body=`;

    Linking.openURL(number)
      .then(data => {
        console.log('sms ' + data); //<---Success
      })
      .catch(() => {
        console.log('sms');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const handleWhatsApp = (whatsApp: string = '') => {
    let url =
      'whatsapp://send?text=' + '' + '&phone=+92 370 3634253' + whatsApp;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        console.log('Make sure WhatsApp installed on your device');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
    // const whatsappNumber = whatsApp.replace(/\D/g, '');
    // Communications.textWithoutEncoding(`whatsapp:${whatsappNumber}`);
  };

  const handleEmail = async () => {
    const mail =
      Platform.OS === 'android'
        ? `mailto:${'info@otoz.ai'}?cc=?subject=OTOZ AI &body=`
        : `mailto:${'info@otoz.ai'}?cc=&subject=OTOZ AI t&body=`;
    Linking.openURL(mail)
      .then(data => {
        console.log('email ' + data); //<---Success
      })
      .catch(() => {
        console.log('email');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const onDetail = (id: number) => {
    props.navigation.replace(Routes.CarDetailScreen, {
      id,
    });
  };
  const onInquiry = () => {
    if (CommonManager.shared.userToken == '') {
      CommonManager.shared.showPopUpWithOption(
        'Otoz.ai',
        'You are not login do you want to login now?',
        'Yes',
        '',
        item => {
          if (item == '1') {
            props.navigation.push(Routes.LoginScreen, {
              onUpdate: () => {
                // initialize()
              },
            });
          }
        },
      );
    } else {
      if (carObj?.has_inquiries) {
        CommonManager.shared.showMessage(
          'You already send inquiry for this car.',
          0,
        );
      } else {
        props.navigation.push(Routes.InquiryScreen, {
          inquiryCar: carObj,
          onInquiry: () => {
            initialize();
          },
        });
      }
    }
  };
  const generateChartData = () => {
    let data = [];
    if (priceMapData == null){
      return []
    }
    for (let i = 0; i < priceMapData.length; i++) {
      const element = priceMapData[i];
      data.push({
        label: element.month,
        value: 0,
        labelTextStyle: {
          ...font(12, FontWeight.Light),
          color: '#111111',
          width: 60,
        },
      });
      element.weeks.forEach((item) => {
        data.push({
          value : item.result_price,
          date : item.week
        });
      });
    }
    return data
  };
 const onSparky = ()=>{
  props.navigation.push(Routes.SparkyScreen,{
    carObj : carObj
  })
  }
  return {
    listingTabs,
    carObj,
    tab,
    setTab,
    tabList,
    similarCarList,
    showImagesList,
    handleCall,
    handleSMS,
    handleWhatsApp,
    handleEmail,
    onDetail,
    onInquiry,
    selector,
    priceMapData,
    chartData,
    onSparky,
  };
};

export default CarDetailManager;
export type CarDetailManagerType = ReturnType<typeof CarDetailManager>;
