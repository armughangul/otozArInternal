import { MakeModel } from "./CarMakeModel"
import { CarModel } from "./CarModel"
import { ColorModel } from "./ColorModel"

export interface VehicleModel {
    id? : number,
    make_name? : string,
    model_name? : string,
    is_favorite : boolean,
    enable_auction : number,
    advance_payment : number,
    auction_start_datetime : string,
    auction_end_datetime : string,
    refrence_type : string,
    refrence_id : string,
    carlength : string,
    carwidth : string,
    carheight : string,
    m3 : string,
    serial_code : string,
    year : number,
    manufacturer_month : string,
    month_id : string,
    interior_color : ColorModel,
    fuel_type : FuelTypeModel,
    exterior_color : ColorModel,
    mileage : number,
    engine_size : number,
    type_id : number,
    chassis_no : string,
    transmission : string,
    drive : string,
    regular_price : number,
    price_yen : string,
    sale_price : number,
    sale_price_yen : number,
    breaking_system : string,
    steering : string,
    air_bags : number,
    air_conditioning : number,
    seats : number,
    doors : number,
    weight : number,
    is_featured : number,
    insurance : string,
    inventory_location : string,
    date_created : string,
    date_modified : string,
    status : number,
    images_count : number,
    images? : ImagesModel[],
    type : TypeModel,
    otoz_recommended : boolean,
    make : MakeModel,
    model : CarModel,
    power_steering : number,
    power_window : number,
    has_inquiries : boolean
}
export interface TypeModel {
id : number,
name : string
}
export interface ImagesModel {
    id : number,
    image : string,
    thumbnail : string,
    is_main_image : boolean
}
export interface FuelTypeModel {
    id : number,
    name : string,
}
export interface VehicleModelApi {
    cars? : VehicleModel[]
}
export interface SingleVehicleModelApi {
    car? : VehicleModel
}
export enum VehicleType {
  Discounted = "discounted",
  OtozRecommended = "otoz_recommended",
  TopDemanded = "top_demanded",
  AiRecommended = "ai_recommended",
  PremiumCars = "premium_Cars"
}