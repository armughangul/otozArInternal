 export interface  BodyTypeModel {
    id : number,
    name : string,
    mobile_icon : string,
    logo : string,
    name_en : string,
    name_jp : string    
}
export default interface ApiBodyTypeModel {
    bodyType? : BodyTypeModel[],
    types? : BodyTypeModel[]
} 