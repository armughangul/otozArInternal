export interface CurrencyModel {
id : number,
currency : string,
currency_rate : string
}
export interface CurrencyModelApi {
    currencies? : CurrencyModel[]
}