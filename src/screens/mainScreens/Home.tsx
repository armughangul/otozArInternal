import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';
import Header from '../../components/Header';
import TrendingCarInJapan from '../../components/TrendingCarInJapan';
import BrowesByCategory from '../../components/BrowesByCategory';
import UsedCarsInJapan from '../../components/UsedCarsInJapan';
import BrowesByBody from '../../components/BrowesByBody';
import {useAppDispatch} from '../../redux/store';
import {getBodies, getMakers} from '../../redux/Reducers/bodiesMakersReducers';
import {getTrendingCars} from '../../redux/Reducers/carsReducers';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loaders/Loader';
import {Colors, orange, white} from '../../utilis/Colors';
import LottieView from 'lottie-react-native';
import {
  setIp,
} from '../../redux/Reducers/userReducers';
import appServices from '../../app-services/appServices';
import PrimaryButton from '../../components/PrimaryButton';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Home = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {trendingCars} = useSelector((state: any) => state.cars);
  const [makes, setMakes] = useState<any>(true);
  const [body, setBody] = useState<any>(false);
  const {ip} = useSelector((state: any) => state.user);
  const [loading2, setLoading2] = useState(false);
  const [usedCars2, setUsedCars2] = useState<any>([]);
  const [usedCarsPagination2, setUsedCarsPagination2] = useState<any>({
    total_count: 0,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [country, setCountry] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      fetchIP();
      getUsedCars();
      // setCountry(usedCars?.country)
      // console.log('getUsedCarsss>>>>>>>>',getUsedCars)

    }, []),
  );

  useEffect(() => {
    dispatch(getBodies());
    dispatch(getMakers());
    dispatch(getTrendingCars({page: 1, ip: ip}));
    // dispatch(getUsedCars({page: 1, ip: ip}));
    // getUsedCars();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    
  }, []);

  const fetchIP = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      if (data.ip) {
        dispatch(setIp(data.ip));
      } else {
        console.log('')
      }
      // console.log('ipAddress',ip)
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  const handleMakes = async () => {
    setMakes(true);
    setBody(false);
  };
  const formattedNumber = (number: any) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
    return formatted;
  };

  const handleBody = async () => {
    setMakes(false);
    setBody(true);
  };

  // const getUsedCars = async () => {
  //   setLoading2(true);
  //   try {
  //     const used = await appServices.getUsed(
  //       `external/cars?per_page=30&q[status_eq]=1&ip=${ip}`,
  //     );
  //     setUsedCars2(used?.cars);
  //     setUsedCarsPagination2(used.pagination);
  //     setLoading2(false);
  //   } catch (error) {
  //     setLoading2(false);
  //   }
  // };
  const getUsedCars = async () => {
    setLoading2(true);
    try {
      const used = await appServices.getUsed(
        `external/cars?per_page=30&q[status_eq]=1&ip=${ip}`
      );
      // console.log('Initial fetch:', {
      //   cars: used?.cars?.length,
      //   pagination: used?.pagination
      // });
      setCountry(used?.country)
      setUsedCars2(used?.cars || []);
      setUsedCarsPagination2(used?.pagination || {});
      setLoading2(false);
    } catch (error) {
      console.error('Initial fetch error:', error);
      setLoading2(false);
    }
  };

  const loadMore = async () => {
    if (usedCarsPagination2?.next_page) {
      try {
        setLoading2(true);
        console.log('Loading more, page:', usedCarsPagination2?.next_page);
        
        const used = await appServices.getUsed(
          `external/cars?per_page=30&q[status_eq]=1&ip=${ip}&page=${usedCarsPagination2?.next_page}`
        );
        
        console.log('New data:', {
          cars: used?.cars?.length,
          pagination: used?.pagination
        });
        
        setUsedCars2((prevCars: any) => [...prevCars, ...(used?.cars || [])]);
        setUsedCarsPagination2(used?.pagination || {});
        setLoading2(false);
      } catch (error) {
        console.error('Load more error:', error);
        setLoading2(false);
      }
    }
  };
  


  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowScrollTop(yOffset > 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Loader visible={loading2} />
      <Header />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Explore', {
              filters: undefined,
            })
          }>
          <SearchBar
            // searchValue={searchValue}
            onChange={text => console.log(text)}
            onClickFilter={() => navigation.navigate('FiltersScreen')}
            onClickMic={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.dealsContainer}>
            <View style={{width: 90, height: 70}}>
              <LottieView
                source={require('../../assets/lottie/Animation.json')}
                style={{width: 80, height: 80, marginLeft: 7, marginTop: 5}}
                autoPlay
                loop
              />
            </View>
            <View style={styles.dealsTextContainer}>
              <Text style={styles.dealsTitle}>
                Bringing the Best Cars to{' '}
                <Text style={styles.dealsSubTitle}>Your Doorstep.</Text>
              </Text>
            </View>
          </View>
          <View style={styles.browseContainer}>
            {/* <Text style={styles.browseTitle}>Browse by Categories</Text> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                borderBottomWidth: 0.8,
                borderColor: '#C3C3C3',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => handleMakes()}
                style={{
                  borderBottomWidth: makes ? 2 : 0,
                  borderColor: orange,
                  zIndex: makes ? 1 : 0,
                }}>
                <Text
                  style={{
                    color: makes ? orange : Colors.ai_gray_900,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Make
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBody()}
                style={{
                  borderBottomWidth: body ? 2 : 0,
                  borderColor: orange,
                  marginLeft: 15,
                  paddingBottom: 5,
                  zIndex: body ? 1 : 0,
                }}>
                <Text
                  style={{
                    color: body ? orange : Colors.ai_gray_900,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Body
                </Text>
              </TouchableOpacity>
            </View>
            {makes ? <BrowesByCategory /> : <BrowesByBody />}
            <TrendingCarInJapan
              data={trendingCars}
              title={`Trending Vehicles`}
              onClick={item =>
                navigation.navigate('DetaildScreen', {car: item})
              }
            />

            {/* used cars start */}
            <View
              style={{
                width: '100%',
                height: '100%',
                marginTop: 20,
                alignSelf: 'center',
                paddingBottom: 50,
              }}>
              {usedCarsPagination2?.total_count > 0 && (
                <UsedCarsInJapan
                  usedCars={usedCars2}
                  navigation={navigation}
                  title={
                    formattedNumber(usedCarsPagination2?.total_count) +
                    ` Vehicles Available in ${country}`
                  }
                />
              )}
              {usedCarsPagination2.next_page > 0 && (
                <PrimaryButton
                  onPress={()=>loadMore()}
                  backgroundColor={Colors.ai_gray_900}
                  width={240}
                  title={loading2 ? 'Loading...' : 'Load More'}
                />
              )}
            </View>
            {/* used cars ends */}
            <View style={{height: 100}}></View>
          </View>
        </View>
      </ScrollView>

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={()=>scrollToTop()}>
          <Text style={styles.scrollTopText}>↑</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ai_gray_900,
  },
  contentContainer: {
    backgroundColor: white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dealsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
    marginTop: 10,
    // backgroundColor:'green',
    width: '100%',
    alignSelf: 'center',
    paddingRight: 10,
  },
  robotImage: {
    width: 40,
    height: 54,
  },
  dealsTextContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    width: '60%',
    // backgroundColor:'gray'
  },
  dealsTitle: {
    color: Colors.ai_gray_900,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  dealsSubTitle: {
    color: orange,
    fontSize: 18,
  },
  browseContainer: {
    width: '90%',
    height: '100%',
    // marginTop: 20,
    position: 'relative',
    alignSelf: 'center',
  },
  browseTitle: {
    color: Colors.ai_gray_900,
    fontWeight: 'bold',
    fontSize: 20,
  },
  browseTabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 0.8,
    borderColor: '#C3C3C3',
    width: '100%',
  },
  browseTab: {
    borderBottomWidth: 2,
    borderColor: '#F8B50E',
    zIndex: -1,
  },
  activeTab: {
    zIndex: 1,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.ai_gray_900,
  },
  activeTabText: {
    color: '#F8B50E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bodyTab: {
    marginLeft: 15,
    paddingBottom: 5,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 80,
    // top:12,
    right: 20,
    backgroundColor: 'rgba(17, 53, 81, .7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 5,
  },
  scrollTopText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default React.memo(Home);
