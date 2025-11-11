import { CountryModel } from "./CountryModel";

export interface PortModel {
    id : number,
    name : string,
    fare : number,
    insurance : number,
    ship_inspection : number,
    is_pre_ship : number,
    country : CountryModel,
}
export interface PortModelApi {
    ports? : PortModel[]
}