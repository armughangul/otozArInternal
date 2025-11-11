import axios from 'axios';
import { AppStrings } from '../utilis/AppStrings';
import CommonManager from '../utilis/CommonManager';
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const Api = async (
  url: string,
  method: HttpMethod = HttpMethod.GET,
  body : any = {},
  isLogin = false,
  isFormData = false,
) => {
  let headers: any;
  const {CancelToken} = axios;
  const source = CancelToken.source();
  console.log("url is ",url)
  var apiTimeout = setTimeout(() => {
    source.cancel(AppStrings.Network.requestTimeoutError);
  }, 120000);
  if (isFormData) {
    headers = {
      'Content-Type': 'multipart/form-data',
      "auth_token" : CommonManager.shared.authToken,
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
      "auth_token" : CommonManager.shared.authToken
    };
  }
  if (CommonManager.shared.userToken != "") {
    headers['Authorization'] = `${CommonManager.shared.userToken}`;
  }
  headers["X-Client-Type"] = "app"
  const structure: any = {
    url,
    method,
    headers,
    cancelToken: source.token,
  };
  if (method === 'GET') {
    structure.params = body;
  } else {
    structure['data'] = body;
  }
  console.log(url)
  console.log("structure is ",structure)
  return axios(structure)
    .then(resp => {
      clearTimeout(apiTimeout);
        if (isLogin && resp.headers && resp.headers["authorization"]){
          CommonManager.shared.setToken(resp.headers["authorization"])
        }
      return resp.data;
    })
    .catch(async error => {
      console.log("error is",error)
      clearTimeout(apiTimeout);
      let msg = [AppStrings.Network.somethingWrong]
      console.log("api error is ",error.response)
      if (error && error.response && error.response.data){
        if (error.response.data.message)
        {
        msg = error.response.data.message
        }
          if (error.response.data.errors)
        {
        msg = error.response.data.errors
        }
      }
      throw {
            message: msg,
            data: null,
            success: false,
          }
    });
};

export default Api;
