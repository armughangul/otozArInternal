import { InquiryModelApi, InquiryModelDetailApi } from "../../Model/InquiryModel";
import { PurchaseModelDetailApi, PurchaseModelListApi } from "../../Model/PurchaseModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import {INQUIRIES_URL, PURCHASE_LIST_URL } from "../Urls";

export const inquiryApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(INQUIRIES_URL, params,HttpMethod.POST);
    if (response && response) {
      return response;
    }
  } catch (err) {
    throw err
  }
};

export const getInquiryListApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<InquiryModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<InquiryModelApi>(INQUIRIES_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getInquiryDetailApi = async (id : string,params : any = {}) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<InquiryModelDetailApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let url = INQUIRIES_URL + `/` + id
  try {
    let response = await ApiManager<InquiryModelDetailApi>(url,params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getPurchaseListApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<PurchaseModelListApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<PurchaseModelListApi>(PURCHASE_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getPurchaseObjDetailApi = async (id : string,params : any = {}) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<PurchaseModelDetailApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let url = PURCHASE_LIST_URL + `/` + id
  try {
    let response = await ApiManager<PurchaseModelDetailApi>(url,params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};