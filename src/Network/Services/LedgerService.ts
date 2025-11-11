import { LedgerModelApi, LedgerModelPdfApi } from "../../Model/LedgerModel";
import { VehicleModelApi } from "../../Model/VehicleModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { LEDGERS_LIST_URL } from "../Urls";

export const getLedgerListApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<LedgerModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
  }
  try {
    let response = await ApiManager<LedgerModelApi>(LEDGERS_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};
export const getLedgerPdfLinkApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<LedgerModelPdfApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  let params = {
    type : "pdf"
  }
  try {
    let response = await ApiManager<LedgerModelPdfApi>(LEDGERS_LIST_URL,params);
    if (response) {
      return response;
    }
  } catch (err) {
     throw err
  }
};