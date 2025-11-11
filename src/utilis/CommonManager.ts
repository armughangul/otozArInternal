import NetInfo from '@react-native-community/netinfo';

import CarMakeModel, {MakeModel} from '../Model/CarMakeModel';
import {CarModel} from '../Model/CarModel';
import {BodyTypeModel} from '../Model/BodyTypeModel';
import {FuelModel} from '../Model/FuelModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageKeys} from './AppStrings';
import {CurrencyModel} from '../Model/CurrencyModel';
import {ColorModel} from '../Model/ColorModel';
import {Alert, Linking, Platform} from 'react-native';
import {UserModel} from '../Model/UserModel';
import {CountryModel} from '../Model/CountryModel';
import {useDispatch, useSelector} from 'react-redux';
import {
  setFavCars,
  setLoading,
  setMessageBar,
} from '../redux/Reducers/AppReducer';
import {PortModel} from '../Model/PortModel';
import {BASE_URLS, VEHICLE_LIST_URL, VERSION} from '../Network/Urls';
import {
  getFavouriteCarsApi,
  markFavUnFavApi,
} from '../Network/Services/SharedService';
import {ApiResponseHandler} from '../Network/ApiResponseHandler';
import {VehicleModel} from '../Model/VehicleModel';
import { EdgeInsets } from 'react-native-safe-area-context';
type dispatchType = ReturnType<typeof useDispatch>;
export default class CommonManager {
  static shared = new CommonManager();
  makeList: MakeModel[] = [];
  bodyTypeList: BodyTypeModel[] = [];
  quickFiltersModelList: CarModel[] = [];
  quickFiltersBodyTypeList: BodyTypeModel[] = [];
  colorList: ColorModel[] = [];
  fuelList: FuelModel[] = [];
  currencyList: CurrencyModel[] = [];
  portList: PortModel[] = [];
  deviceId: string = '';
  heightRef: number | null = null;
  globalMakeList: CarMakeModel[] = [];
  countriesList: CountryModel[] = [];
  userCountry: CountryModel | null = null;
  yenObj: CurrencyModel = {id: -1, currency: '', currency_rate: ''};
  authToken =
    'fU5DZc1HCdlBzfJZ5k9ECR7tU8a11685OWZ0J9T1QqWgqWvdbR538aOjGfP4SMpG';
  userToken = '';
  ip = '';
  yearsList: number[] = [];
  monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currentUser: UserModel | null = null;
  dispatch: dispatchType | null = null;
  selector: any;
  onAiFilters : any
  saveAreaInsects : EdgeInsets
  generateViewAspectRatioSize = (aspectRatio: any, width: number) => {
    const height = width / aspectRatio;
    return {
      width,
      height,
    };
  };
  showPopUp = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK'}], {
      cancelable: true,
    });
  };
  isNetConnect = async () => {
    let status = await NetInfo.refresh();
    return status.isConnected;
  };
  checkTxtExist = (search: string, word: string) => {
    if (word.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  };
  generateYearsList = () => {
    if (CommonManager.shared.yearsList.length > 0) {
      return CommonManager.shared.yearsList;
    }
    const startYear = 1974;
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      {length: currentYear - startYear + 1},
      (_, i) => startYear + i,
    );
    CommonManager.shared.yearsList = years;
    return CommonManager.shared.yearsList;
  };
  chunkArray = (arr: any, size = 2) => {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  getDiscountPercentage = (originalPrice: number, salePrice: number) => {
    if (originalPrice <= 0) {
      throw new Error('Original price must be greater than 0');
    }
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Number(discount.toFixed(2)); // returns percentage with 2 decimals
  };
  // SAVE AND RETREIVE JOURNEY FLOW
  saveJourney = async (value: string) => {
    await AsyncStorage.setItem(LocalStorageKeys.journey, value);
  };
  getJourney = async () => {
    let value = '0';
    let result = await AsyncStorage.getItem(LocalStorageKeys.journey);
    if (result && result != '') {
      value = result;
    }
    return value;
  };
  convertDollarToYen = (price: number) => {
    let amount = 0;
    if (CommonManager.shared.yenObj.id == -1) {
      let obj = CommonManager.shared.currencyList.find(item => item.id == 3);
      if (obj) {
        CommonManager.shared.yenObj = obj;
      }
    }
    if (CommonManager.shared.yenObj.id != -1) {
      let yenCurrency = Number(CommonManager.shared.yenObj.currency_rate);
      if (yenCurrency) {
        amount = Number((price * yenCurrency).toFixed(0));
      }
    }
    return amount;
  };
  formattedNumber = (number: any) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
    return formatted;
  };
  isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  showPopUpWithOption = (
    title: string,
    message: string,
    ok: string = '',
    cancel: string = '',
    onClick: (option: string) => void,
  ) => {
    Alert.alert(
      title,
      message,
      cancel?.length == 0
        ? [
            {text: ok == '' ? 'OK' : ok, onPress: () => onClick('1')},
            {text: 'Cancel', onPress: () => {}},
          ]
        : [
            {
              text: cancel == '' ? 'Cancel' : cancel,
              onPress: () => onClick('0'),
            },

            {text: ok == '' ? 'OK' : ok, onPress: () => onClick('1')},
            {text: 'Cancel', onPress: () => {}},
          ],
      {cancelable: true},
    );
  };
  setUser = async (user: UserModel) => {
    await AsyncStorage.setItem(LocalStorageKeys.user, JSON.stringify(user));
  };
  getUser = async () => {
    let user;
    let result = await AsyncStorage.getItem(LocalStorageKeys.user);
    if (result && result != '') {
      user = JSON.parse(result);
    }
    return user;
  };
  deleteUser = async () => {
    CommonManager.shared.userToken = '';
    await AsyncStorage.removeItem(LocalStorageKeys.user);
  };
  setToken = async (token: string) => {
    CommonManager.shared.userToken = token;
    await AsyncStorage.setItem(LocalStorageKeys.token, token);
  };
  getToken = async () => {
    CommonManager.shared.userToken = '';
    let token = await AsyncStorage.getItem(LocalStorageKeys.token);
    if (token) {
      CommonManager.shared.userToken = token;
    }
  };
  validatePhoneNumber = (regex: string, phone: string) => {
    const phoneRegex = new RegExp(regex);
    return phoneRegex.test(phone);
  };
  showMessage = (title: string = '', type: number = 0) => {
    if (this.dispatch) {
      this.dispatch(
        setMessageBar({
          title,
          msgType: type,
        }),
      );
    }
  };
  // FAV METHOD
  markFav = async (carId: number, onComplete: () => void = () => {}) => {
    let url = BASE_URLS + VERSION + `/cars/${carId}/` + 'toggle_favorite';
    let isFav = CommonManager.shared.checkFavStatus(this.selector, carId);
    if (this.dispatch) {
      this.dispatch(setLoading(true));
    }
    markFavUnFavApi(url, !isFav)
      .then(async response => {
        await CommonManager.shared.getFavListing();
        onComplete();
        CommonManager.shared.showMessage(response?.message[0] ?? '', 1);
        if (this.dispatch) {
          this.dispatch(setLoading(false));
        }
      })
      .catch((err: ApiResponseHandler) => {
        CommonManager.shared.showMessage(err.message[0] ?? '');
        onComplete();
        if (this.dispatch) {
          this.dispatch(setLoading(false));
        }
      });
  };
  getFavListing = async () => {
    return new Promise((resolve, reject) => {
      getFavouriteCarsApi()
        .then(response => {
          if (response && CommonManager.shared.dispatch) {
            CommonManager.shared.dispatch(setFavCars(response.cars));
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  checkFavStatus = (selector: any, id: number) => {
    let isLike = false;
    if (selector && selector.userFavCars && id) {
      if (Object.hasOwn(CommonManager.shared.selector.userFavCars, id)) {
        console.log('item is liked ', id);
        isLike = true;
      }
    }
    return isLike;
  };
  handleCall = () => {
    const call = '+81 3 6435 2269';
    Linking.openURL(`tel:${call}`)
      .then(data => {
        console.log('call ' + data); //<---Success
      })
      .catch(() => {
        console.log('call failed');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  handleSMS = () => {
    const message = '+81 3 6435 2269';
    let number =
      Platform.OS === 'android'
        ? `sms:${message}?body=`
        : `sms:${message}&body=`;

    Linking.openURL(number)
      .then(data => {
        console.log('sms ' + data); //<---Success
      })
      .catch(() => {
        console.log('sms');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };
  handleEmail = () => {
    const email = 'info@otoz.ai';
    const mail =
      Platform.OS === 'android'
        ? `mailto:${email}?cc=?subject=OTOZ AI &body=`
        : `mailto:${email}?cc=&subject=OTOZ AI t&body=`;
    Linking.openURL(mail)
      .then(data => {
        console.log('email ' + data); //<---Success
      })
      .catch(() => {
        console.log('email');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };
  // APPLE USER DATA
    getAppleUser = async (userId : string) => {
      let user 
      let findedUser = await AsyncStorage.getItem(userId)
      if (findedUser){
        user = JSON.parse(findedUser)
      }
      return user
  };
  saveAppleUser = async (userId : string,data : any) => {
    await AsyncStorage.setItem(userId,JSON.stringify(data))
  };
}
