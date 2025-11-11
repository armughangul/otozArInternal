import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import UsedCarsInJapan from '../../components/UsedCarsInJapan';
import {useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import {useAppDispatch} from '../../redux/store';
import {getFilteredCars} from '../../redux/Reducers/carsReducers';
import Loader from '../../components/Loaders/Loader';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import {Colors, orange, white} from '../../utilis/Colors';
import {setIp} from '../../redux/Reducers/userReducers';

const Explore = ({navigation, route}: any) => {
  const filters = route?.params?.filters;
  const dispatch = useAppDispatch();
  const [filteredCarsLocal, setFilteredCarsLocal] = useState<any>([]);
  const {filteredCars, filteredCarsPagination, isLoadingFilters} = useSelector(
    (state: any) => state.cars,
  );
  const {ip} = useSelector((state: any) => state.user);
  const {loading} = useSelector((state: any) => state.user);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };
  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowScrollTop(yOffset > 100);
  };
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchIP = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      const ip = data?.ip;
      dispatch(setIp(ip));
      // console.log('fetchIP-fetchIP-fetchIP', ip);
      return ip;
    } catch (error) {
      console.log('fetchIP error:', error);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);
  useEffect(() => {
    setFilteredCarsLocal([]);
    
    const loadData = async () => {
      try {
        const query = filters || `?ip=${ip}&page=1`;
        await dispatch(getFilteredCars(query));
      } catch (error) {
        console.error('Error loading cars:', error);
      } finally {
        if (isInitialLoad) setIsInitialLoad(false);
      }
    };
    
    loadData();
  }, [filters, ip, dispatch]);
  
  useEffect(() => {
    // console.log('Received filters:', filters);
  }, [filters]);
  
  // useEffect(() => {
  //   if (isInitialLoad) return;
    
  //   console.log('Filtered cars received:', filteredCars);
    
  //   if (filteredCarsPagination.current_page === 1) {
  //     setFilteredCarsLocal(filteredCars || []);
  //   } else {
  //     setFilteredCarsLocal((prev:any) => [...(prev || []), ...(filteredCars || [])]);
  //   }
  // }, [filteredCars, filteredCarsPagination.current_page]);

  useEffect(() => {
    if (isInitialLoad) return;
    
    // console.log('Received cars:', filteredCars?.length, 'Current page:', filteredCarsPagination.current_page);
  
    // Always replace data when it's the first page
    if (filteredCarsPagination.current_page === 1) {
      setFilteredCarsLocal(filteredCars || []);
    } 
    // Only append if we're loading more and have new data
    else if (filteredCars?.length > 0) {
      setFilteredCarsLocal((prev:any) => {
        // Prevent duplicates by checking IDs (assuming each car has a unique id)
        const existingIds = new Set(prev.map((car:any) => car.id));
        const newCars = filteredCars.filter((car:any) => !existingIds.has(car.id));
        return [...prev, ...newCars];
      });
    }
  }, [filteredCars, filteredCarsPagination.current_page]);


  // const loadMore = () => {
  //   if (filteredCarsPagination?.next_page) {
  //     if (filters) {
  //       dispatch(
  //         getFilteredCars(
  //           `${filters}&page=${filteredCarsPagination.next_page}`,
  //         ),
  //       );
  //     } else {
  //       dispatch(
  //         getFilteredCars(`?ip=${ip}&page=${filteredCarsPagination.next_page}`),
  //       );
  //     }
  //   }
  // };
  
  const loadMore = () => {
    if (filteredCarsPagination?.next_page) {
      const baseParams = filters || `?ip=${ip}`;
      dispatch(
        getFilteredCars(`${baseParams}&page=${filteredCarsPagination.next_page}`)
      );
    }
  };

  const formattedNumber = (number: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
  };


  const ListMemo = useMemo(() => {
    // console.log('Rendering list with:', filteredCarsLocal.length, 'items');
    return (
      <UsedCarsInJapan
        usedCars={filteredCarsLocal}
        title={`${formattedNumber(filteredCarsPagination?.total_count || 0)} Vehicles Found`}
        navigation={navigation}
        key={`list-${filters}-${filteredCarsPagination?.current_page}`} // Force re-render
      />
    );
  }, [filteredCarsLocal, filteredCarsPagination?.total_count, navigation, filters]);

  return (
    <View style={styles.container}>
      <Loader visible={loading || isLoadingFilters} />
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Header />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150}}
        style={styles.scrollView}>
        <SearchBar
          onChange={text => console.log(text)}
          onClickFilter={() => navigation.navigate('FiltersScreen')}
          onClickMic={() => {}}
        />

        {!isLoadingFilters && filteredCarsLocal.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Image
              resizeMode="contain"
              source={require('../../assets/not-found.png')}
              style={{width: 350, height: 200}}
            />
            <Text style={styles.whoopsText}>WHOOPS!</Text>
            <Text style={styles.noResultText}>
              Looks like we don't have the car you're looking for. Get notified
              when we have the car you want.
            </Text>
            <View style={{height: 150}} />
          </View>
        ) : (
          <View style={styles.listContainer}>
            {ListMemo}

            {filteredCarsPagination?.next_page > 0 && (
              <View style={styles.loadMoreContainer}>
                <PrimaryButton
                  onPress={()=>loadMore()}
                  backgroundColor={Colors.ai_gray_900}
                  width={240}
                  title={'Load More'}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={()=>scrollToTop()}>
          <Text style={styles.scrollTopText}>↑</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(Explore);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ai_gray_900,
  },
  noDataContainer: {
    backgroundColor: white,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whoopsText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.ai_gray_900,
    marginTop: 10,
  },
  noResultText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.ai_gray_900,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  listContainer: {
    backgroundColor: white,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: 'center',
  },
  loadMoreContainer: {
    marginTop: -90,
    marginBottom: 40,
    alignItems: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'rgba(17, 53, 81, .7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    zIndex: 100,
    elevation: 5,
  },
  scrollTopText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
});
