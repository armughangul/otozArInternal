import {createSlice} from '@reduxjs/toolkit';
import CommonManager from '../../utilis/CommonManager';
import { UserModel } from '../../Model/UserModel';
import { VehicleModel } from '../../Model/VehicleModel';
export enum PriceType {
  dollar = '$',
  yen = '¥',
}
export interface SliceState {
  isLoading: boolean;
  priceType: PriceType;
  tabbarVisibility: boolean;
  isJourney: string;
  imagesList: string[];
  initialImageIndex : number,
  appUser : UserModel | null,
  messageBar : {title : string, msgType : number} | null,
  userFavCars : any,
  showAiFilters : boolean
}
const initialState: SliceState = {
  isLoading: false,
  priceType: PriceType.dollar,
  tabbarVisibility: true,
  isJourney: '0',
  imagesList: [],
  initialImageIndex : 0,
  appUser : null,
  messageBar  : null,
  userFavCars :{},
  showAiFilters : false
};
const AppReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPriceType: (state, action) => {
      state.priceType = action.payload;
    },
    setTabbarVisibility: (state, action) => {
      state.tabbarVisibility = action.payload;
    },
    setJourney: (state, action) => {
      state.isJourney = action.payload;
      CommonManager.shared.saveJourney(action.payload);
    },
    setImagesList: (state, action) => {
      state.imagesList = action.payload.imagesList;
      state.initialImageIndex = action.payload.index
    },
     setAppUser: (state, action) => {
      state.appUser = action.payload;
      CommonManager.shared.currentUser = action.payload
      if (action.payload){
        CommonManager.shared.getFavListing()
      }
    },
     setMessageBar: (state, action) => {
      state.messageBar = action.payload;
    },
      setFavCars: (state, action) => {
        let data : VehicleModel[]  = action.payload
        let newObj : any = {}
        data.forEach((item)=>{
          if (item.id){
            if (!Object.hasOwn(newObj,item.id)){
              newObj[item.id] = item
            }
          }
        })
      state.userFavCars = newObj;
    },
        setShowAiFilters: (state, action) => {
      state.showAiFilters = action.payload;
    },
  },
});
export const {
  setLoading,
  setPriceType,
  setTabbarVisibility,
  setJourney,
  setImagesList,
  setAppUser,
  setMessageBar,
  setFavCars,
  setShowAiFilters
} = AppReducer.actions;
export default AppReducer.reducer;
