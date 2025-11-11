import { VehicleModelApi } from "../../Model/VehicleModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { SMART_MATCH_INQUIRY_URL, VISITED_CARS_CHECK_LIST_URL, VISITED_CARS_LIST_URL } from "../Urls";

export const getLastVisitedCarsApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<VehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    // number_of_cars : 10
  }
  try {
    let response = await ApiManager<VehicleModelApi>(VISITED_CARS_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};
export const checkLastVisitedListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<VehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
  }
  try {
    let response = await ApiManager<VehicleModelApi>(VISITED_CARS_CHECK_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};

export const smartInquiryApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(SMART_MATCH_INQUIRY_URL, params,HttpMethod.POST);
    if (response && response) {
      return response;
    }
  } catch (err) {
    throw err
  }
};
