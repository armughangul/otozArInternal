import { PreferenceModel } from "../../Model/PreferenceModel";
import { UserModelApi } from "../../Model/UserModel";
import { AppStrings } from "../../utilis/AppStrings";
import CommonManager from "../../utilis/CommonManager";
import { HttpMethod } from "../Api";
import { ApiManager } from "../ApiManager";
import { ApiResponseWithExtras } from "../ApiResponseHandler";
import { CHANGE_PASSWORD_URL, CONFIRM_EMAIL_URL, DELETE_PROFILE_URL, EDIT_PROFILE_URL, FORGET_PASSWORD_URL, LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL, SOCIAL_LOGIN_URL, SOCIAL_REGISTRATION_URL } from "../Urls";

export const loginApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<UserModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<UserModelApi>(LOGIN_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const socialLoginApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(SOCIAL_LOGIN_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const signUpApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<UserModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<UserModelApi>(REGISTER_URL, params,HttpMethod.POST,false);
    if (response && response.success) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const socialSignUpApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<UserModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<UserModelApi>(SOCIAL_REGISTRATION_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
    throw err
  }
};
export const confirmEmailApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(CONFIRM_EMAIL_URL, params,HttpMethod.GET);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
    throw err
  }
};
export const forgetPasswordApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(FORGET_PASSWORD_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const resetPasswordApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(RESET_PASSWORD_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
    throw err
  }
};

export const changePasswordApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<any> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<any>(CHANGE_PASSWORD_URL, params,HttpMethod.POST,true);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
    throw err
  }
};

export const editProfileApi = async (params : any) => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<UserModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<UserModelApi>(EDIT_PROFILE_URL, params,HttpMethod.POST,false,true);
    if (response && response.success) {
      return response;
    }else {
    }
  } catch (err) {
    throw err
  }
};
export const deleteAccountApi = async () => {
  let isConnected = await CommonManager.shared.isNetConnect();
  let apiResponse: ApiResponseWithExtras<UserModelApi> = {
    success: false,
    message: [AppStrings.Network.internetError],
  };
  if (!isConnected) {
    throw apiResponse;
  }
  try {
    let response = await ApiManager<UserModelApi>(DELETE_PROFILE_URL,{},HttpMethod.DELETE,false,true);
    if (response && response.success) {
      return response;
    }
  } catch (err) {
    throw err
  }
};