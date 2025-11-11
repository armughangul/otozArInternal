import { QuickFilterApiModel } from "../../Model/QuickFilerModel";
import { ApiReviewModel } from "../../Model/ReviewModel";
import { VehicleModel, VehicleModelApi } from "../../Model/VehicleModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { QUICK_FILTERS_LIST_URL, REVIEW_LIST_URL, VEHICLE_LIST_URL } from "../Urls";

export const getQuickFilters = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<QuickFilterApiModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
    make: [],
    bodyType : [],
    model : [],
    budget : []
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    make: "1",
    model : "1",
    bodyType : "1",
    budget : "1"
  };
  try {
    let response = await ApiManager<QuickFilterApiModel>(QUICK_FILTERS_LIST_URL, params);
    if (response && response.make) {
      return response;
    }
  } catch (err) {
      throw err
  }
};

export const getReviewsListingApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ApiReviewModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
  };
  try {
    let response = await ApiManager<ApiReviewModel>(REVIEW_LIST_URL, params);
    if (response && response.ratings) {
      return response;
    }
  } catch (err) {
         throw err
  }
};

export const getCarListingApi = async (params : any) => {
  let carListingParams = {
    ...params
  }
  if (CommonManager.shared.ip != ""){
    carListingParams["ip"] = CommonManager.shared.ip
  }
  // FOR USER ID
   if (CommonManager.shared.currentUser){
    carListingParams["uid"] = CommonManager.shared.currentUser.id
  }
  else {
  if (CommonManager.shared.deviceId != ""){
    carListingParams["uuid"] = CommonManager.shared.deviceId
  }
  }

  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<VehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<VehicleModelApi>(VEHICLE_LIST_URL, carListingParams);
    if (response && response.cars) {
      return response;
    }
  } catch (err) {
     throw err
  }
};