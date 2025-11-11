import ApiBodyTypeModel from '../../Model/BodyTypeModel';
import ApiMakeModel from '../../Model/CarMakeModel';
import ApiCarModel from '../../Model/CarModel';
import { ColorModelApi } from '../../Model/ColorModel';
import { CountriesModelApi } from '../../Model/CountryModel';
import { CurrencyModelApi } from '../../Model/CurrencyModel';
import { FuelModelApi } from '../../Model/FuelModel';
import { PortModelApi } from '../../Model/PortModel';
import { VehicleModelApi } from '../../Model/VehicleModel';
import {AppStrings} from '../../utilis/AppStrings';
import CommonManager from '../../utilis/CommonManager';
import { HttpMethod } from '../Api';
import {ApiManager} from '../ApiManager';
import {ApiResponseHandler, ApiResponseWithExtras} from '../ApiResponseHandler';
import {BODY_TYPE_LIST_URL, COLOR_LIST_URL, COUNTRIES_LIST_URL, CURRENCIES_LIST_URL, FUEL_LIST_URL, MAKERS_LIST_URL, MODEL_LIST_URL, PORTS_LIST_URL, VEHICLE_FAV_LIST_URL} from '../Urls';

//MAKE API
export const getMakeListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ApiMakeModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
    makes: [],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page: 100,
  };
  try {
    let response = await ApiManager<ApiMakeModel>(MAKERS_LIST_URL, params);
    if (response.success && response?.makes?.length > 0) {
      return response;
    }
  } catch (err) {
       throw err

  }
};
//MODEL API
export const getModelListApi = async (id: number) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ApiCarModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
    models: [],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    make_id: id,
    per_page: 1000,
  };
  try {
    let response = await ApiManager<ApiCarModel>(MODEL_LIST_URL, params);
    if (response.success && response?.models?.length > 0) {
      return response;
    }
  } catch (err) {
     throw err

  }
};
export const getBodyTypeListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ApiBodyTypeModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page: 100,
  };
  try {
    let response = await ApiManager<ApiBodyTypeModel>(BODY_TYPE_LIST_URL, params);
    if (response.success) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getColorListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ColorModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page: 100,
  };
  try {
    let response = await ApiManager<ColorModelApi>(COLOR_LIST_URL, params);
    if (response.success) {
      return response;
    }
  } catch (err) {
      throw err
  }
};
export const getFuelTypeListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<FuelModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page: 100,
  };
  try {
    let response = await ApiManager<FuelModelApi>(FUEL_LIST_URL, params);
    if (response.success) {
      return response;
    }
  } catch (err) {
      throw err
  }
};
export const getCurrenciesListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<CurrencyModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<CurrencyModelApi>(CURRENCIES_LIST_URL);
    console.log("currencyList response is ",response)
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getCountriesListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<CountriesModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page : 255
  }
  try {
    let response = await ApiManager<CountriesModelApi>(COUNTRIES_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};
export const getCountriesPortListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<PortModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page : 255
  }
  try {
    let response = await ApiManager<PortModelApi>(PORTS_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};
export const getFavouriteCarsApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<VehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    per_page : 300
  }
  try {
    let response = await ApiManager<VehicleModelApi>(VEHICLE_FAV_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};
export const markFavUnFavApi = async (url : string,isFav : boolean) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ApiResponseHandler> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    car : {
      is_favourite :isFav 
    }
  }
  try {
    let response = await ApiManager<ApiResponseHandler>(url,params,HttpMethod.PATCH);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
     throw err
  }
};