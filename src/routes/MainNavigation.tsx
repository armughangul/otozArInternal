import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NewStack from "./newStack"
import AppLoader from '../components/AppLoader/AppLoader';
import { View } from 'react-native';
import { AppStyle } from '../utilis/AppStyle';
import SplashScreen from '../Sections/Splash/SplashScreen';
import { setImagesList, setShowAiFilters } from '../redux/Reducers/AppReducer';
import ImageViewModal from '../components/ImageViewer/ImageViewModal';
import MessageBar from '../components/MessageBar/MessageBar';
import AiSearchView from '../components/AiSearch/AiSearchView';
import CommonManager from '../utilis/CommonManager';
const MainNavigation = () => {
  const dispatch = useDispatch()
  const [showSplash, setShowSplash] = React.useState(true);
    const [loaded, setLoaded] = React.useState(false);
    const selector = useSelector((AppState : any) => AppState.appReducer);
  return (
    <View
    style = {{
        ...AppStyle.mainView
    }}
    >
     {
      loaded &&
      <NewStack/>
     }
      {
        selector.isLoading &&
        <AppLoader
        visisble = {selector.isLoading}
        />
      }
           {
        showSplash &&
         <SplashScreen
         onLoadScreen={()=>setLoaded(true)}
      onComplete={()=>{
        setTimeout(() => {
                  setShowSplash(false)
        }, 4000);
      }}
      />
     }
        {
           selector?.imagesList.length > 0 && (
            <ImageViewModal
              isVisible={true}
              onClose={() => {
                dispatch(
                  setImagesList({
                    imagesList : [],
                    index : 0
                  })
                )
              }}
              imagesList={selector.imagesList}
              initialIndex={selector.initialImageIndex}
            />
          )}
          {selector.messageBar &&
                    <MessageBar/>
          }
          {
            selector.showAiFilters &&
                      <AiSearchView
                      onClose={()=>{
                        dispatch(setShowAiFilters(false))
                      }}
                      onSearch={(response)=>{
                        dispatch(setShowAiFilters(false))
                        CommonManager.shared.onAiFilters(response)
                      }}
                      />
          }
    </View>
  );
};

export default MainNavigation;