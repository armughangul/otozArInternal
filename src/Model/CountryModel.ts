export interface CountryModel {
    id : number,
    stock : string,
    name : string,
    flag : string,
    thumb : string,
    right_banner : string,
    facebook_page_url : string,
    region_id : number,
    office_time : string,
    import_regulations : string,
    sort_order : number,
    status : number,
    user_id : number,
    country_code : string,
    phone_regex : string,
    example_phone : string
}
export interface CountriesModelApi {
    countries? : CountryModel[]
}