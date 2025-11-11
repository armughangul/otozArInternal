 export interface  CarModel {
    id : number,
    name : string,
    name_en : string,
    name_jp : string,
}
export default interface ApiCarModel {
    models : CarModel[]
} 