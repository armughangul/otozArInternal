import { InquiryModelApi } from "../../Model/InquiryModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { ADD_ADVANCE_URL, ADD_BALANCE_URL, ADD_CONSIGNEE_URL, CAR_RECEIVED_URL, DOC_RECEIVED_URL } from "../Urls";

export const addAdvanceApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(ADD_ADVANCE_URL, params,HttpMethod.POST,false,true);
    if (response) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const addConsigneeApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(ADD_CONSIGNEE_URL, params,HttpMethod.POST,false,true);
    if (response) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const addBalanceApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(ADD_BALANCE_URL, params,HttpMethod.POST,false,true);
    if (response) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};

export const confirmDocReceivedApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(DOC_RECEIVED_URL, params,HttpMethod.POST,false,true);
    if (response) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const confirmCarReceivedApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(CAR_RECEIVED_URL, params,HttpMethod.POST,false,true);
    if (response) {
      return response;
    }
  } catch (err) {
    throw err
  }
};