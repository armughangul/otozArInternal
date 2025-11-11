import React, {useEffect, useState} from 'react';
import {
  getBodyTypeListApi,
  getColorListApi,
  getCountriesListApi,
  getCountriesPortListApi,
  getCurrenciesListApi,
  getFuelTypeListApi,
  getMakeListApi,
} from '../../../Network/Services/SharedService';
import CommonManager from '../../../utilis/CommonManager';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { setAppUser } from '../../../redux/Reducers/AppReducer';
import { Settings } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppManager = () => {
  const [dataLoaded,setDataLoaded] = useState(false)
  const dispatch = useDispatch()
  const selector = useSelector((State: any) => State.appReducer);
  useEffect(() => {
  Settings.initializeSDK();
  Settings.setAppID("1042641326229258");

              CommonManager.shared.dispatch = dispatch
              CommonManager.shared.selector = selector
    DeviceInfo.getUniqueId().then(id => {
      CommonManager.shared.deviceId = id;
    });
    initialize();
  }, []);
  useEffect(()=>{
    CommonManager.shared.selector = selector
  },[selector])
  const initialize = async() => {
    configureGoogleSigIn()
    await loadToken()
    Promise.all([loadLoginUser(),getCountriesList(),getMakeList(),getBodyTypes(),getColorLists(),getFuelTypeList(),getCurrenciesList(),getPortList()]).finally(() => {
      setDataLoaded(true)
    });
  };
  const loadToken = async()=>{
    await CommonManager.shared.getToken()
  }
    const configureGoogleSigIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      GoogleSignin.configure({
        webClientId:
          "712193512598-vsgerm7s9tjlm3pj6ifm030kh4em3kom.apps.googleusercontent.com",
        iosClientId:
          "712193512598-vsgerm7s9tjlm3pj6ifm030kh4em3kom.apps.googleusercontent.com",
        offlineAccess: true,
      });
    } catch (err) {}
  };

  const loadLoginUser = async()=>{
    return new Promise(async(resolve,reject)=>{
    let user = await CommonManager.shared.getUser()
    if (user){
      dispatch(setAppUser(user))
    }
    else {
      CommonManager.shared.setToken("")
    }
    resolve(true)
    })
  }
    const getCountriesList = async () => {
    return new Promise((resolve, reject) => {
      getCountriesListApi()
        .then(async(response) => {
          if (
            response?.success &&
            response.countries &&
            response.countries.length > 0
          ) {
            CommonManager.shared.countriesList = response.countries;
          }
          await fetchIP()
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  const getMakeList = async () => {
    return new Promise((resolve, reject) => {
      getMakeListApi()
        .then(response => {
          if (
            response?.success &&
            response.makes &&
            response.makes.length > 0
          ) {
            CommonManager.shared.makeList = response.makes;
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  const getBodyTypes = async () => {
    return new Promise((resolve, reject) => {
      getBodyTypeListApi()
        .then(response => {
          if (response?.success) {
            console.log("body type list is ",response.types)
            CommonManager.shared.bodyTypeList = response.types ?? [];
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  const getColorLists = async () => {
    return new Promise((resolve, reject) => {
      getColorListApi()
        .then(response => {
          if (response?.success) {
            CommonManager.shared.colorList = response.colors ?? [];
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
    const getFuelTypeList = async () => {
    return new Promise((resolve, reject) => {
      getFuelTypeListApi()
        .then(response => {
          if (response?.success) {
            CommonManager.shared.fuelList = response.fuel_types ?? [];
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
      const getCurrenciesList = async () => {
    return new Promise((resolve, reject) => {
      getCurrenciesListApi()
        .then(response => {
          if (response) {
            CommonManager.shared.currencyList = response.currencies ?? [];
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  const getPortList = async () => {
    return new Promise((resolve, reject) => {
      getCountriesPortListApi()
        .then(response => {
          if (response) {
            CommonManager.shared.portList = response.ports ?? [];
          }
          resolve(true);
        })
        .catch(() => reject(false));
    });
  };
  const fetchIP = async () => {
    return new Promise(async(resolve,reject)=>{
            try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        if (data.ip) {
          CommonManager.shared.ip = data.ip
         fetchCountryData(CommonManager.shared.ip)
        } else {
          console.log('')
        }
        resolve(true)
      } catch (error) {
        console.error('Error fetching IP:', error);
        reject(false)
      }
    })
    };
    const fetchCountryData = async(ip : string)=>{
          try {
            console.log("calling country data call ",CommonManager.shared.ip)
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        console.log("country data is ",data)
        if (data && data.country_name){
          let item = CommonManager.shared.countriesList.find((item)=>item.name.toLowerCase()== data.country_name.toLowerCase())
          if (item){
            CommonManager.shared.userCountry = item
          }
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    }
  return {
    dataLoaded
  };
};
export default AppManager;
