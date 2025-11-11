import { CountryModel } from "./CountryModel"

export interface UserModel {
    id : number,
    first_name : string,
    last_name : string,
    email : string,
    gender : string,
    phone_no : string,
    image : string,
    address : string,
    country : CountryModel,
    port : number,
    city : string,
    company_name : string,
    location : string,
    dealer_type : string,
    how_heard_about_us : string,
    role : RoleModel,
    dob : string
}
export interface RoleModel {
    id : number,
    name : string
}
export interface UserModelApi {
    user? : UserModel
}