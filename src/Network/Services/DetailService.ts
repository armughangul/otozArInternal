import { ChartModelApi } from "../../Model/ChartModel";
import { SingleVehicleModelApi, VehicleModelApi } from "../../Model/VehicleModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { PRICE_MAP_CHART_URL, VEHICLE_LIST_URL } from "../Urls";

export const getCarDetailApi = async (id : number) => {
    let url = VEHICLE_LIST_URL + "/" + id
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<SingleVehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  
  let params = {
  }
  try {
    let response = await ApiManager<SingleVehicleModelApi>(url,params);
    if (response && response.car) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getSimilarCarsApi = async (id : number) => {
    let url = VEHICLE_LIST_URL + "/" + id + "/similar_cars"
    console.log(url)
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<VehicleModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    ip : CommonManager.shared.ip
  }
  try {
    let response = await ApiManager<VehicleModelApi>(url,params);
    if (response && response.cars) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getPriceMapChartApi = async (params : any) => {
    let url = PRICE_MAP_CHART_URL
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<ChartModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<ChartModelApi>(url,params);
    if (response && response.data) {
      return response;
    }
  } catch (err) {
       throw err
  }
};