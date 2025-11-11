import React, {useEffect} from 'react';
import Background from './Components/Background';
import {View} from 'react-native';
import {HomeStyle} from './Style';
import HomeBar from './Components/HomeBar';
import HomeSearchBar from './Components/HomeSearchBar';
import QuickFilterView from './Components/QuickFilterView';
import HorizontalListing from './Components/HorizontalListing/HorizontalListing';
import ReviewListing from './Components/ReviewListing/ReviewListing';
import BottomDescription from './Components/BottomDescription/BottomDescription';
import MidBanner from './Components/MidBanner/MidBanner';
import {AppImages, ScreenProps} from '../../utilis/AppConstant';
import {AppStyle} from '../../utilis/AppStyle';
import {FlashList} from '@shopify/flash-list';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import HomeManager from './Manager/HomeManager';
import HomePricePopup from './Components/HomePricePopup/HomePricePopup';
import {VehicleType} from '../../Model/VehicleModel';
import { Routes } from '../../utilis/Routes';
const HomeScreen = (props: ScreenProps) => {
  const manager = HomeManager();
  useEffect(() => {
    manager.initialize();
  }, []);
  return (
    <Background>
      <View
        style={{
          ...HomeStyle.mainView,
        }}>
        <TopAppSafeArea />
        <HomeBar manager={manager}
         />
        {manager.isMenuVisible && <HomePricePopup manager={manager} />}
        <View
          style={{
            ...AppStyle.mainView,
          }}>
          {manager.loadHome && (
            <FlashList
              onRefresh={() => {
                manager.initialize();
              }}
              maxItemsInRecyclePool={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                ...AppStyle.bottomPaddingView,
              }}
              data={manager.sectionCounts}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({index}) => {
                if (index == 0) {
                  return <HomeSearchBar
                  isHome
                  onFilters={() => {
                    manager.onAiFilter(props)
                  }} />;
                }
                if (index == 1) {
                  return (
                    <QuickFilterView
                      data={manager.homeDataRef.current.filtersList}
                      onPress={(item, type) =>
                        manager.onMove(
                          {
                            item,
                            type,
                          },
                          props.navigation,
                        )
                      }
                    />
                  );
                }
                if (index == 2) {
                  return (
                    <HorizontalListing
                      onSelect={id => manager.onDetail(id, props.navigation)}
                      onSeeAll={() => {
                        manager.onMove(
                          {
                            searchType: VehicleType.AiRecommended,
                          },
                          props.navigation,
                        );
                      }}
                      type={0}
                      list={manager.homeDataRef.current.aiRecommended ?? []}
                      title="AI Recommended Cars"
                    />
                  );
                }
                if (index == 3) {
                  return (
                    manager.homeDataRef.current.otozRecommended && manager.homeDataRef.current.otozRecommended.length > 0 ?
                    <HorizontalListing
                      onSelect={id => manager.onDetail(id, props.navigation)}
                      onSeeAll={() => {
                        manager.onMove(
                          {
                            searchType: VehicleType.OtozRecommended,
                          },
                          props.navigation,
                        );
                      }}
                      type={1}
                      list={manager.homeDataRef.current.otozRecommended ?? []}
                      title="Otoz.ai Recommended Cars"
                    /> : null
                  );
                }
                if (index == 4) {
                  return (
                    <MidBanner
                    onPress={()=>{
                      manager.onCard(0,props)
                    }}
                      title="Smart Matching"
                      type={0}
                      bannerImg={AppImages.Home.matchingBg}
                    />
                  );
                }
                if (index == 5) {
                  return (
                    <MidBanner
                      title="Smart Auction"
                      type={1}
                      bannerImg={AppImages.Home.auctionBg}
                    />
                  );
                }
                if (index == 6) {
                  return (
                    <HorizontalListing
                      onSelect={id => manager.onDetail(id, props.navigation)}
                      onSeeAll={() => {
                        manager.onMove(
                          {
                            searchType: VehicleType.Discounted,
                          },
                          props.navigation,
                        );
                      }}
                      type={2}
                      list={manager.homeDataRef.current.discountedCars ?? []}
                      title="Discounted Cars"
                    />
                  );
                }
                if (index == 7) {
                  return (
                    <MidBanner
                      title="Third Party Auction"
                      type={2}
                      bannerImg={AppImages.Home.partyAuctionBg}
                    />
                  );
                }
                if (index == 8) {
                  return (
                    <HorizontalListing
                      onSelect={id => manager.onDetail(id, props.navigation)}
                      onSeeAll={() => {
                        manager.onMove(
                          {
                            searchType: VehicleType.TopDemanded,
                          },
                          props.navigation,
                        );
                      }}
                      type={0}
                      list={manager.homeDataRef.current.topDemanded ?? []}
                      title="Top Demanding Cars"
                    />
                  );
                }
                if (index == 9) {
                  return (
                    <HorizontalListing
                      onSelect={id => manager.onDetail(id, props.navigation)}
                      onSeeAll={() => {
                        manager.onMove(
                          {
                            searchType: VehicleType.PremiumCars,
                          },
                          props.navigation,
                        );
                      }}
                      type={0}
                      list={manager.homeDataRef.current.premiumCars ?? []}
                      title="Premium Cars"
                    />
                  );
                }
                if (index == 10) {
                  return (
                    <ReviewListing
                      title="Success Stories"
                      list={manager.homeDataRef.current.reviewList ?? []}
                    />
                  );
                }
                if (index == 11) {
                  return <BottomDescription />;
                }
                return null;
              }}
            />
          )}
        </View>
      </View>
    </Background>
  );
};
export default HomeScreen;
