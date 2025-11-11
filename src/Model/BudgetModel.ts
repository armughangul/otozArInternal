 export interface  BudgetModel {
    id : number,
    name : string,
    name_en : string,
    name_jp : string,
    logo : string,
    min_price : string,
    max_price : string
}
export default interface ApiBudgetModel {
    budgets : BudgetModel[]
} 