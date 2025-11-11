export interface ReviewModel {
    id : number,
    inquiry_id : number,
    rating : number,
    feedback : string,
    created_at : string,
    updated_at : string,
    title : string,
    user : ReviewUserModel
}
interface ReviewUserModel {
    id : number,
    name : string
}
export interface ApiReviewModel {
    ratings? : ReviewModel[]
}