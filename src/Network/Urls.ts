import { OTOZ_AI_API_URL,OTOZ_AI_API_STAGING_URL,OTOZ_AI_UPLOADS_URL } from "@env";
let staging = true
export const BASE_URLS = (staging ? OTOZ_AI_API_STAGING_URL : OTOZ_AI_API_URL) + "/"
export const IMAGE_BASE_URL = (staging ? OTOZ_AI_UPLOADS_URL : OTOZ_AI_UPLOADS_URL) + "/"
export const IMAGE_MAKES_BASE_URL = "https://otoz.ai/otozai-v2/makes/"
export const IMAGE_BODY_TYPE_BASE_URL = "https://otoz.ai/otozai-v2/body_types/"
export const IMAGE_COUNTRY_CODE_BASE_URL = "https://otoz.ai/otozai-v2/flags/"
export const BASE_DOC_URLS = (staging ? "https://stage.otoz.ai/" : "https://otoz.ai/") + "/"
export const EXTERNAL = "external/"
 export const VERSION = "v1"
 export const INQUIRIES = "inquiries"
 export const SHIPPING = "shippings"
 export const SESSIONS = "sessions/"
export const MAKERS_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/makes"
export const MODEL_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/models"
export const BODY_TYPE_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/types"
export const QUICK_FILTERS_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/vehicles_settings"
export const REVIEW_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/ratings"
export const SEARCH_PREFERENCES_URL = BASE_URLS + EXTERNAL + VERSION + "/preferences"
export const VEHICLE_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/cars"
export const VEHICLE_FAV_LIST_URL = BASE_URLS + VERSION  + "/cars/favorite_cars"

export const COLOR_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/colors"
export const FUEL_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/fuel_types"
export const CURRENCIES_LIST_URL = BASE_URLS + EXTERNAL + VERSION + "/currencies"
export const LOGIN_URL = BASE_URLS + "/login"
export const SOCIAL_LOGIN_URL = BASE_URLS + SESSIONS + "social_login"
export const SOCIAL_REGISTRATION_URL = BASE_URLS + SESSIONS + "complete_registration"

export const REGISTER_URL = BASE_URLS + "/register"
export const EDIT_PROFILE_URL = BASE_URLS + "/users/update"
export const DELETE_PROFILE_URL = BASE_URLS + "users/delete_account"

export const CONFIRM_EMAIL_URL = BASE_URLS + "/confirm_email"
export const FORGET_PASSWORD_URL = BASE_URLS + "/forgot_password"
export const RESET_PASSWORD_URL = BASE_URLS + "/reset_password"
export const CHANGE_PASSWORD_URL = BASE_URLS + "/change_password"
export const COUNTRIES_LIST_URL = BASE_URLS + EXTERNAL + "/countries" 
export const PORTS_LIST_URL = BASE_URLS + EXTERNAL + "/ports" 
export const INQUIRIES_URL = BASE_URLS   + INQUIRIES 
export const ADD_ADVANCE_URL = BASE_URLS  + INQUIRIES + "/add_advance"
export const ADD_CONSIGNEE_URL = BASE_URLS + INQUIRIES + "/add_consignee"
export const ADD_BALANCE_URL = BASE_URLS + INQUIRIES + "/add_balance"
export const DOC_RECEIVED_URL = BASE_URLS + SHIPPING + "/document_received"
export const CAR_RECEIVED_URL = BASE_URLS + SHIPPING + "/car_received"
export const PURCHASE_LIST_URL = BASE_URLS  + "purchase_histories"
export const AI_TEXT_SEARCH_URL = "https://textgenerator-production.up.railway.app/car-info"
export const AI_SMART_MATCH_SEARCH_URL = "https://textgenerator-production.up.railway.app/detect-user-interest"

export const PRICE_MAP_CHART_URL = BASE_URLS + EXTERNAL + VERSION + "/cars/cars_chart_data"
export const LEDGERS_LIST_URL = BASE_URLS  + VERSION + "/ledgers"
export const VISITED_CARS_LIST_URL = BASE_URLS  + VERSION + "/cars/viewed_car_list"
export const VISITED_CARS_CHECK_LIST_URL = BASE_URLS  + VERSION + "/car_views"
export const SMART_MATCH_INQUIRY_URL = BASE_URLS  + VERSION + "/smart_matchings"










