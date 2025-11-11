export interface ApiResponseHandler {
  success: boolean;
  message : string[],
  pagination? : Pagination
}
export interface Pagination  {
  current_page : number,
  next_page : number,
  prev_page : number
  total_pages : number,
  total_count : number
}
export type ApiResponseWithExtras<T,E = T> = ApiResponseHandler & E;
