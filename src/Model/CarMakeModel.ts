 export interface  MakeModel {
    id : number,
    name : string,
    name_en : string,
    name_jp : string,
    logo : string,
    mobile_icon : String
}
export default interface ApiMakeModel {
    makes : MakeModel[]
} 