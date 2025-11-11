import { BodyTypeModel } from "./BodyTypeModel";
import { BudgetModel } from "./BudgetModel";
import { MakeModel } from "./CarMakeModel";
import { CarModel } from "./CarModel";

export interface QuickFilterApiModel {
    make : MakeModel[],
    model : CarModel[],
    bodyType : BodyTypeModel[],
    budget : BudgetModel[]
}
export interface QuickFilterHomeModel {
    make : MakeModel[][] | undefined,
      model : CarModel[][] | undefined,
    bodyType : BodyTypeModel[][] | undefined,
    budget : BudgetModel[][] | undefined
}