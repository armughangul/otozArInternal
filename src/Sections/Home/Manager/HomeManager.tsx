import React, {useRef, useState} from 'react';
import {
  getCarListingApi,
  getQuickFilters,
  getReviewsListingApi,
} from '../../../Network/Services/HomeService';
import {QuickFilterHomeModel} from '../../../Model/QuickFilerModel';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, setShowAiFilters} from '../../../redux/Reducers/AppReducer';
import CommonManager from '../../../utilis/CommonManager';
import {ReviewModel} from '../../../Model/ReviewModel';
import {VehicleModel, VehicleType} from '../../../Model/VehicleModel';
import {Routes} from '../../../utilis/Routes';
import { ScreenProps } from '../../../utilis/AppConstant';
interface HomeDataProps {
  filtersList?: QuickFilterHomeModel;
  sectionList?: any[];
  reviewList?: ReviewModel[];
  aiRecommended?: VehicleModel[];
  otozRecommended?: VehicleModel[];
  discountedCars?: VehicleModel[];
  topDemanded?: VehicleModel[];
  premiumCars?: VehicleModel[];
}
const HomeManager = () => {
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const selector = useSelector((state: any) => state.appReducer);
  const sectionCounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [loadHome, setHomeLoaded] = useState<any>(null);
  const homeDataRef = useRef<HomeDataProps>({});
  //INITIALIZE MANAGER
  const initialize = () => {
    dispatch(setLoading(true));
    getFilterList().finally(()=>{
  Promise.all([
      ...getCarsListingPromises(),
      getFilterList(),
      getReviewListing(),
    ])
      .finally(() => {
        dispatch(setLoading(false));
        setHomeLoaded(true);
      });
    })
  };
  const getCarsListingPromises = () => {
    let promisesList = [];
    //AI RecommendedCars
    let required_images = 1;
    let aiPromise = new Promise((resolve, reject) => {
      let aiParams = {
        required_images,
        type: VehicleType.AiRecommended,
      };
      getCarListingApi(aiParams)
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            aiRecommended: response?.cars,
          };
          resolve(true);
        })
        .catch(() => reject(false));
    });
    promisesList.push(aiPromise);
    let otozRecommendedPromise = new Promise((resolve, reject) => {
      let aiParams = {
        required_images,
        type: VehicleType.OtozRecommended,
      };
      getCarListingApi(aiParams)
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            otozRecommended: response?.cars,
          };
          resolve(true);
        })
        .catch(() => reject(false));
    });
    promisesList.push(otozRecommendedPromise);
    let discountedPromise = new Promise((resolve, reject) => {
      let aiParams = {
        required_images,
        type: VehicleType.Discounted,
      };
      getCarListingApi(aiParams)
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            discountedCars: response?.cars,
          };
          resolve(true);
        })
        .catch(() => reject(false));
    });
    promisesList.push(discountedPromise);
    let demandedPromise = new Promise((resolve, reject) => {
      let aiParams = {
        required_images,
        type: VehicleType.TopDemanded,
      };
      getCarListingApi(aiParams)
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            topDemanded: response?.cars,
          };
          resolve(true);
        })
        .catch(() => reject(false));
    });
    promisesList.push(demandedPromise);
    let premiumPromise = new Promise((resolve, reject) => {
      let aiParams = {
        required_images,
        'q[engine_size_gteq]': 1700,
      };
      getCarListingApi(aiParams)
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            premiumCars: response?.cars,
          };
          resolve(true);
        })
        .catch(() => reject(false));
    });
    promisesList.push(premiumPromise);
    return promisesList;
  };
  //MARK API CALLING METHODS
  const getFilterList = async () => {
    return new Promise((resolve, reject) => {
      getQuickFilters()
        .then(response => {
          CommonManager.shared.quickFiltersModelList = response?.model ?? [];
          let newResponse: QuickFilterHomeModel = {
            make: CommonManager.shared.chunkArray(response?.make, 2),
            model: CommonManager.shared.chunkArray(response?.model, 4),
            bodyType: CommonManager.shared.chunkArray(response?.bodyType, 2),
            budget: CommonManager.shared.chunkArray(response?.budget, 4),
          };
          console.log(newResponse);
          if (newResponse) {
            homeDataRef.current = {
              ...homeDataRef.current,
              filtersList: newResponse,
            };
          }
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });
  };
  //REVIEW LISTING
  const getReviewListing = async () => {
    return new Promise((resolve, reject) => {
      getReviewsListingApi()
        .then(response => {
          homeDataRef.current = {
            ...homeDataRef.current,
            reviewList: response?.ratings,
          };
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });
  };
  const onMove = (params: any, navigation: any) => {
    navigation.push(Routes.MainSearchScreen, {
      searchParams: params,
    });
  };
   const onDetail = (id: any, navigation: any) => {
    navigation.push(Routes.CarDetailScreen, {
      id: id,
    });
  };
  const onAiFilter = (props : ScreenProps)=>{
    dispatch(setShowAiFilters(true))
    CommonManager.shared.onAiFilters = (params : any)=>{
      console.log("param received are ",params)
      let aiParams = {
        aiParams : params
      }
      onMove(aiParams,props.navigation)
    }
  }
  const onCard = (index : number,props : ScreenProps)=>{
    if (CommonManager.shared.currentUser){
    if (index == 0){
      props.navigation.push(Routes.SmartMatchIntroScreen)
    }
    }
    else {
      CommonManager.shared.showMessage("Please login to access this feature.")
    }
  }
  return {
    dispatch,
    isMenuVisible,
    setMenuVisible,
    selector,
    loadHome,
    setHomeLoaded,
    initialize,
    sectionCounts,
    homeDataRef,
    onMove,
    onDetail,
    onAiFilter,
    onCard
  };
};

export default HomeManager;
export type HomeManagerType = ReturnType<typeof HomeManager>;
