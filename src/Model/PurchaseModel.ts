import { InquiryModel } from "./InquiryModel"

export interface PurchaseModelListApi {
  purchase_histories? : InquiryModel[]
}
export interface PurchaseModelDetailApi {
  purchase_history? : InquiryModel
}