import { AiInterestModel, AiSearchModel } from "../../Model/AiSearchModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { AI_SMART_MATCH_SEARCH_URL, AI_TEXT_SEARCH_URL, MAKERS_LIST_URL } from "../Urls";

export const getAiFiltersData = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<AiSearchModel> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<AiSearchModel>(AI_TEXT_SEARCH_URL, params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};
export const getSmartMatchDataApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<AiInterestModel[]> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<AiInterestModel[]>(AI_SMART_MATCH_SEARCH_URL, params);
    if (response) {
      return response;
    }
  } catch (err) {
       throw err
  }
};