
export interface LedgerModelApi {
    ledger? : LedgerModel[]
}
export interface LedgerModel {
    car_id : number,
    car_name : string,
    dealer_name : string,
    car_price : number,
    amount_paid : number,
    date_created : string,
    cumulative_paid : number,
    overall_balance : number,
    car_balance : number,
    dealer_balance : number
}
export interface LedgerModelPdfApi {
    pdf_link? : string,
    success? : boolean,
}
