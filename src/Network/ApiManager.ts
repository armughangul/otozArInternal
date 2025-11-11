import Api, { HttpMethod } from "./Api"
import {ApiResponseWithExtras} from "./ApiResponseHandler"

export const ApiManager = async<T>(url : string,body : any = {},method : HttpMethod = HttpMethod.GET,isLogin = false,isForm = false)=>{
  let response : ApiResponseWithExtras<T> = await Api(url,method,body,isLogin,isForm)
  return response
}