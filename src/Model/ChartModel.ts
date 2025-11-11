export interface ChartModel {
    month : string,
    weeks : ChartWeekModel[],
}
export interface ChartModelApi {
    model_id? : string,
    maker_id? : string,
    data? : ChartModel[]
}
interface ChartWeekModel {
    week : string,
    start_price : number,
    result_price : number,
}