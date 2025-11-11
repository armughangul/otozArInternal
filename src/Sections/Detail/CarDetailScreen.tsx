import React from 'react';
import {FlatList, ImageBackground, ScrollView, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import DetailTopBar from './Components/DetailTopBar';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import {AppImages, ScreenProps} from '../../utilis/AppConstant';
import CarDetailManager from './Manager/CarDetailManager';
import CarDetailBanner from './Components/CarDetailBanner';
import DetailImagesList from './Components/DetailImagesList/DetailImagesList';
import CarDetailDescription from './Components/CarDetailDescription';
import DetailTopTabView from './Components/DetailTopTab/DetailTopTabView';
import ExpertsReviewView from './Components/DetailExpertsReview/ExpertsReviewView';
import MidBanner from '../Home/Components/MidBanner/MidBanner';
import HorizontalListing from '../Home/Components/HorizontalListing/HorizontalListing';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import BottomDetailView from './Components/BottomDetailView/BottomDetailView';
import MainChartView from './Components/Charts/MainChartView';
import SmartCard from './Components/SmartCard/SmartCard';
import { Routes } from '../../utilis/Routes';

const CarDetailScreen = (props: ScreenProps) => {
  const manager = CarDetailManager(props);
  return (
    <ImageBackground
      source={AppImages.Detail.background}
      style={{
        ...AppStyle.mainView,
      }}>
      {manager.carObj && (
        <View
          style={{
            ...AppStyle.mainView,
          }}>
          <TopAppSafeArea />
          <DetailTopBar
          manager={manager}
            title={manager.carObj.make_name + ' ' + (manager.carObj.model_name ?? "")}
            onBack={() => {
              props.navigation.goBack()
            }}
          />
          <View
            style={{
              ...AppStyle.mainView,
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={manager.listingTabs}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({index}) => {
                switch (index) {
                  case 0:
                    return <CarDetailBanner manager={manager} />;
                  case 1:
                    return <DetailImagesList manager={manager} />;
                  case 2:
                    return <CarDetailDescription car={manager.carObj!} />;
                  case 3:
                    return <DetailTopTabView manager={manager} />;
                  case 4:
                    return <ExpertsReviewView />;
                  case 5:
                    return manager.priceMapData && <MainChartView manager={manager}  />;
                  case 6:
                    return (
                      <MidBanner
                        title="Smart Matching"
                        type={0}
                        bannerImg={AppImages.Home.matchingBg}
                      />
                    );
                  case 7:
                    return (
                      <MidBanner
                        title="Smart Auction"
                        type={1}
                        bannerImg={AppImages.Home.auctionBg}
                      />
                    );
                  case 8:
                    return (
                      <HorizontalListing
                      hideSeeAll = {true}
                      onSelect={(id)=>{
                        manager.onDetail(id)
                      }}
                        onSeeAll={() => {

                        }}
                        type={0}
                        list={manager.similarCarList.current ?? []}
                        title="Similar Cars"
                      />
                    );
                  case 9:
                    return (
                      <MidBanner
                        title="Third Party Auction"
                        type={2}
                        bannerImg={AppImages.Home.partyAuctionBg}
                      />
                    );
                  default:
                    return null;
                }
              }}
            />
          </View>
      
          {
            props.route && props.route.params && props.route.params["smart"] ?
    <SmartCard
          onSmartInquiry={()=>{
            props.navigation.push(Routes.SmartMatchInquiryScreen,{
              inquiryCar : manager.carObj
            })
          }}
          manager={manager}
          /> :
    <BottomDetailView
          manager={manager}
          />
          }
      
          <BottomAppSafeArea/>
        </View>
      )}
    </ImageBackground>
  );
};

export default CarDetailScreen;
