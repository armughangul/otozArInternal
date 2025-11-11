import { PreferenceModel } from "../../Model/PreferenceModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { SEARCH_PREFERENCES_URL } from "../Urls";

export const addPreferenceApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<PreferenceModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<PreferenceModel>(SEARCH_PREFERENCES_URL, params,HttpMethod.POST);
    if (response) {
      return response;
    }
  } catch (err) {
      throw err
  }
};
