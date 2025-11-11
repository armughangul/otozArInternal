export interface ColorModel {
    id : number,
    name : string,
    code : string,
    status : number
}
export interface ColorModelApi {
    colors? : ColorModel[]
}