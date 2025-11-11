import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Slider from '@react-native-community/slider';
import TrendingCarInJapan from '../../components/TrendingCarInJapan';
import BottomActions from '../../components/BottomActions';
import PriceCalculator from '../../components/PriceCalculator';
import ImageSlider from '../../components/ImageSlider';
import {useSelector} from 'react-redux';
import ContactGroup from '../../components/ContactGroup';
import TopHeader from '../../components/TopHeader';
import Loader from '../../components/Loaders/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmartMatchingModal from '../../components/Modals/SmartMatchingModal';
import appServices from '../../app-services/appServices';
import {store} from '../../redux/store';
import {logoutUser, setExploreOnly} from '../../redux/Reducers/userReducers';
import {Colors, orange, red, white} from '../../utilis/Colors';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';

const DetaildScreen = ({navigation, route}: any) => {
  const {car} = route?.params;
  const [item, setItem] = useState<any>(car);
  const [overview, setOverView] = useState<any>(true);
  const [features, setFeatures] = useState<any>(false);
  const [specification, setSpecification] = useState<any>(false);
  const [inspection, setInspection] = useState<any>(false);
  const [calculator, setCalculator] = useState<any>(false);
  const {loading, user} = useSelector((state: any) => state.user);
  const [show, setShow] = useState<any>(false);
  const [carData, setCarData] = useState<any>([]);
  const [lastCar, setLastCar] = useState<any>(null);
  const [similarCar, setSimilarCar] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const [loading2, setLoading2] = useState<boolean>(false);
  const {ip} = useSelector((state: any) => state.user);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const similarCars = async () => {
    try {
      // console.log('>>>>>>>>>', item?.id);
      console.log('>>>>>>>>>', ip);
      const response = await appServices.getSimilarCars(item?.id, ip);

      if (response) {
        setSimilarCar(response.cars);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error fetching similar cars:', error);
    }
  };

  useEffect(() => {
    similarCars();
    console.log('item.is_favorite', item.is_favorite);
  }, [item]);

  useEffect(() => {
    if (user) {
      storeCarData();
    }
    console.log('itemmmmmmmmmmm', item?.is_favorite);
  }, [item]);
  useEffect(() => {
    // Scroll to top when item changes
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  }, [item]);

  const storeCarData = async () => {
    try {
      const storedCars = await AsyncStorage.getItem('cars');
      const cars = storedCars ? JSON.parse(storedCars) : [];

      cars.push(item);

      if (cars.length > 6) {
        cars.length = [];
      }
      await AsyncStorage.setItem('cars', JSON.stringify(cars));
      if (lastCar == 4) {
        // console.log(lastCar, 'lastCarrrrrrrrrrrrrrrr');
      }
      if (cars.length >= 5) {
        setLastCar(cars[4]);
        setShow(true);
      }
    } catch (error) {
      console.error('Error storing car data', error);
    }
  };

  const handleClearCarData = async () => {
    try {
      setShow(false);
      await AsyncStorage.removeItem('cars');
      setCarData([]);

      console.log('Car data cleared successfully');
    } catch (error) {
      console.error('Error clearing car data', error);
    }
  };

  const handleOverview = async () => {
    setOverView(true);
    setFeatures(false);
    setSpecification(false);
    setInspection(false);
    setCalculator(false);
  };
  const handleFeatures = async () => {
    setOverView(false);
    setFeatures(true);
    setSpecification(false);
    setCalculator(false);
    setInspection(false);
  };
  const handleSpecification = async () => {
    setOverView(false);
    setFeatures(false);
    setSpecification(true);
    setCalculator(false);
    setInspection(false);
  };
  // {
  //   /* const handleInspection = () => {
  //   setOverView(false);
  //   setFeatures(false);
  //   setSpecification(false);
  //   setCalculator(false);
  //   setInspection(true);
  // };*/
  // }
  const handleCalculator = () => {
    setOverView(false);
    setFeatures(false);
    setSpecification(false);
    setInspection(false);
    setCalculator(true);
  };

  const handleToggleFavorite = async (item: any) => {
    setLoading2(true);
    const result = await toggleFavorite(item.id, item.is_favorite);
    setLoading2(false);

    setMessage(result.message);

    if (result.success) {
      const updatedData = carData.map((car: any) =>
        car.id === item.id
          ? {...car, is_favorite: result.newFavoriteStatus}
          : car,
      );
      setCarData(updatedData);
    }
  };

  const toggleFavorite = async (carId: number, isFavorite: boolean) => {
    try {
      let res;
      if (isFavorite) {
        res = await appServices.unFavoriteCars(carId);
      } else {
        res = await appServices.favoriteCars(carId);
      }
      return {
        success: true,
        newFavoriteStatus: !isFavorite,
        message: res?.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Failed to update status',
      };
    }
  };

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(number);
    return formatted;
  };

  const OverviewData = [
    // {
    //   id: '1',
    //   title: 'History ',
    //   detail: 'N/A',
    //   Image: require('../../assets/icons/historyicon.png'),
    // },
    {
      id: '2',
      title: 'Stock ID ',
      detail: item?.serial_code ? item?.serial_code : '-',
      Image: require('../../assets/icons/registrationicon.png'),
    },

    // {
    //   id: '3',
    //   title: 'Last Service ',
    //   detail: 'N/A',
    //   Image: require('../../assets/icons/serviceicon.png'),
    // },
    {
      id: '4',
      title: 'Mileage',
      detail: item?.mileage ? formattedNumber(item?.mileage) + ' km' : '-',
      Image: require('../../assets/icons/kilometericon.png'),
    },

    {
      id: '5',
      title: 'Manufacture Year',
      detail: item?.year ? item?.year : '-',
      Image: require('../../assets/icons/registeredInicon.png'),
    },
    {
      id: '7',
      title: 'Fuel Type ',
      detail: item?.fuel_type?.name ? item?.fuel_type?.name : '-',
      Image: require('../../assets/icons/fuelicon.png'),
    },
    item?.transmission
      ? {
          id: '8',
          title: 'Transmission ',
          detail: item?.transmission ? item?.transmission : '-',
          Image: require('../../assets/icons/transmissionicon.png'),
        }
      : null,
    {
      id: '9',
      title: 'Color ',
      detail: item?.exterior_color?.name ? item?.exterior_color?.name : '-',
      Image: require('../../assets/icons/historyicon.png'),
    },
  ];
  const OverviewView = ({item}: any) => (
    <View>
      {item ? (
        <View
          style={{
            height: 40,
            width: '90%',
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: 'lightgray',
            paddingBottom: 5,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={item?.Image}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
              <Text
                style={{
                  color: '#113551',
                  fontSize: 12,
                  fontWeight: '400',
                  marginLeft: 20,
                }}>
                {item?.title}
              </Text>
            </View>
            <Text
              style={{
                color: '#113551',
                fontSize: 12,
                fontWeight: '500',
                marginRight: 5,
              }}>
              {item?.detail}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
  const FeaturessData = [
    {
      id: '1',
      title: 'Airbags ',
      detail: 'Yes',
    },
    {
      id: '2',
      title: 'Air Conditioning',
      detail: 'Yes',
    },
    {
      id: '3',
      title: 'Power Steering ',
      detail: 'Yes',
    },
    {
      id: '4',
      title: 'Power Windows ',
      detail: 'Yes',
    },
    {
      id: '6',
      title: 'Central Locking ',
      detail: item?.central_locking ? item?.central_locking : 'Yes',
    },
  ];
  const FeaturessView = ({item}: any) => (
    <View>
      <View
        style={{
          height: 40,
          width: '90%',
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          paddingBottom: 5,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#113551',
              fontSize: 12,
              fontWeight: '400',
            }}>
            {item?.title}
          </Text>

          <Text
            style={{
              color: '#113551',
              fontSize: 12,
              fontWeight: '500',
              marginRight: 5,
            }}>
            {item?.detail === 0
              ? 'No'
              : item?.detail === 1 || item?.detail === 'Yes'
                ? 'Yes'
                : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
  const SpecificationData = [
    {
      id: '3',
      title: 'Drive Wheel',
      detail: item?.drive ? item?.drive : '-',
    },

    {
      id: '5',
      title: 'Steering Type',
      detail: item?.power_steering ? 'Power Steering' : '-',
    },

    {
      id: '7',
      title: 'Engine Size ',
      detail: item?.engine_size
        ? formattedNumber(item?.engine_size) + ' ' + 'cc'
        : '-',
    },
    {
      id: '8',
      title: 'Transmission ',
      detail: item?.transmission ? item?.transmission : '-',
      Image: require('../../assets/icons/transmissionicon.png'),
    },
    {
      id: '9',
      title: 'Doors ',
      detail: item?.doors ? item?.doors : '-',
      Image: require('../../assets/icons/transmissionicon.png'),
    },
    {
      id: '10',
      title: 'Seat Capacity',
      detail: item?.seats ? item?.seats : '-',
      Image: require('../../assets/icons/transmissionicon.png'),
    },
  ];

  const SpecificationView = ({item}: any) => (
    <View
      style={{
        height: 40,
        width: '90%',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingBottom: 5,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: '#113551',
            fontSize: 12,
            fontWeight: '400',
          }}>
          {item?.title}
        </Text>

        <Text
          style={{
            color: '#113551',
            fontSize: 12,
            fontWeight: '500',
            marginRight: 5,
          }}>
          {item?.detail}
        </Text>
      </View>
    </View>
  );
  const InspectionData = [
    {
      id: '1',
      title: 'Overall Rating',
      detail: 'N/A',
    },
    {
      id: '2',
      title: 'Exterior & Body',
      detail: 'N/A',
    },
    {
      id: '3',
      title: 'Engine/Transmission/Clutch',
      detail: 'N/A',
    },
    {
      id: '4',
      title: 'Suspension/Steering',
      detail: 'N/A',
    },
    {
      id: '5',
      title: 'Interior',
      detail: 'N/A',
    },
    {
      id: '6',
      title: 'AC/Heater',
      detail: 'N/A',
    },
  ];
  const InspectionView = ({item, index}: any) => (
    <View
      style={{
        height: 60,
        width: '90%',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        alignSelf: 'center',
      }}>
      <View style={{width: '100%'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#113551',
              fontSize: index === 0 ? 18 : 12,
              fontWeight: index === 0 ? 'bold' : '400',
            }}>
            {item?.title}
          </Text>

          <Text
            style={{
              color: '#113551',
              fontSize: index === 0 ? 18 : 12,
              fontWeight: index === 0 ? 'bold' : '500',
              marginRight: 5,
            }}>
            {item?.detail}
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 5}}>
          {/* <Slider
            style={{width: '100%', height: 20, alignSelf: 'center'}}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="transparent"
            value={Number(item?.detail)}
            minimumTrackTintColor="#F8B50E"
            maximumTrackTintColor="gray"
          /> */}
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView
      ref={scrollViewRef}
      style={{flex: 1, paddingBottom: 30, backgroundColor: Colors.ai_gray_900}}>
      <SimpleInfoModal
        visible={!!message}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />
      {item && (
        <View style={{backgroundColor: white}}>
          <View style={{flex: 1, backgroundColor: white, paddingBottom: 20}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <Loader visible={loading} />
            <View
              style={{
                width: '100%',
                height: 334,
                backgroundColor: Colors.ai_gray_900,
              }}>
              <TopHeader title="Vehicle Details" />
              <ImageSlider images={item?.images} />
              <SmartMatchingModal
                visible={show}
                onClose={() => setShow(false)}
                onCancel={() => handleClearCarData()}
                onPress={() => {
                  setShow(false);
                  navigation.navigate('SmartMatchingScreen', {
                    lastCar: lastCar,
                  });
                  handleClearCarData();
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 25,
                flexDirection: 'row',
                alignSelf: 'center',
                // backgroundColor:'gray',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: 140,
                  height: 34,
                  backgroundColor: '#44BC8A',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginRight: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Image
                  source={{
                    uri: `https://otoz.ai/otozai-v2/uploads/${item?.type?.logo}`,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
                <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                  {item?.type?.name}
                </Text>
              </TouchableOpacity>
              <ContactGroup />
            </View>
            <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
              <Text
                style={{color: '#113551', fontSize: 24, fontWeight: 'bold'}}>
                {item?.make?.name} {item?.model?.name} {item?.year}
              </Text>
              <View style={{marginTop: 5}}>
                <Text
                  style={{color: '#666666', fontSize: 14, fontWeight: '400'}}>
                  {item?.year} {'|'} {item?.fuel_type?.name} {'|'}{' '}
                  {formattedNumber(item?.mileage)} km {'|'}{' '}
                  {formattedNumber(item?.engine_size)} cc {'|'}{' '}
                  {item?.transmission}
                </Text>
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: red,
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        ${' '}
                        {formattedNumber(
                          item?.sale_price !== 0 &&
                            item?.regular_price > item?.sale_price
                            ? item?.sale_price
                            : item?.regular_price,
                        )}
                      </Text>
                      {item?.regular_price - item?.sale_price > 2 && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: Colors.ai_gray_900,
                            fontWeight: '500',
                            textDecorationLine: 'line-through',
                          }}>
                          $ {formattedNumber(item?.regular_price)}
                        </Text>
                      )}
                    </View>

                    <View style={{width: '40%', alignItems: 'flex-end'}}>
                      {/* <TouchableOpacity
                        disabled={loading}
                        onPress={e => {
                          e.stopPropagation?.();
                          handleToggleFavorite(item);
                        }}
                        style={styles.favoriteButton}>
                        <Image
                          resizeMode="contain"
                          source={
                            item.is_favorite
                              ? require('../../assets/icons/liked2.png')
                              : require('../../assets/icons/like2.png')
                          }
                          style={styles.favoriteIcon}
                        />
                      </TouchableOpacity> */}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.status === 4 ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.ai_gray_900,
                            paddingHorizontal: 10,
                            height: 30,
                            justifyContent: 'center',
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: white,
                              fontSize: 14,
                              fontWeight: '500',
                            }}>
                            In process
                          </Text>
                        </TouchableOpacity>
                      ) : item.status === 7 ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 10,
                            height: 30,
                            justifyContent: 'center',
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: white,
                              fontSize: 14,
                              fontWeight: '500',
                            }}>
                            Sold
                          </Text>
                        </TouchableOpacity>
                      ) : user ? (
                        <BottomActions
                          onClickInquiry={() => {
                            navigation.navigate('InquiryScreen', {item: item});
                          }}
                        />
                      ) : (
                        <BottomActions
                          onClickInquiry={() => {
                            store.dispatch(setExploreOnly(false));
                            store.dispatch(logoutUser(''));
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#F6F6F6',
              width: '100%',
              height: 47,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleOverview()}
              style={{
                paddingHorizontal: 10,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: overview ? Colors.ai_gray_900 : '#C3C3C3',
                backgroundColor: overview ? Colors.ai_gray_900 : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: overview ? white : Colors.ai_gray_900,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFeatures()}
              style={{
                paddingHorizontal: 10,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: features ? Colors.ai_gray_900 : '#C3C3C3',
                backgroundColor: features ? Colors.ai_gray_900 : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: features ? white : Colors.ai_gray_900,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Features
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSpecification()}
              style={{
                paddingHorizontal: 10,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: specification ? Colors.ai_gray_900 : '#C3C3C3',
                backgroundColor: specification ? Colors.ai_gray_900 : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: specification ? white : Colors.ai_gray_900,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Specifications
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
          onPress={() => handleInspection()}
          style={{
            paddingHorizontal: 10,
            height: 32,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: inspection ? '#F8B50E' : '#C3C3C3',
            backgroundColor: inspection ? '#F8B50E' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text
            style={{
              color: inspection ? 'white' : '#113551',
              fontSize: 12,
              fontWeight: '600',
            }}>
            Inspection Report
          </Text>
        </TouchableOpacity>*/}
            {/* <TouchableOpacity
              onPress={() => handleCalculator()}
              style={{
                paddingHorizontal: 10,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: calculator ? '#F8B50E' : '#C3C3C3',
                backgroundColor: calculator ? '#F8B50E' : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: calculator ? 'white' : '#113551',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Price Calculator
              </Text>
            </TouchableOpacity> */}
          </View>

          {overview ? (
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: Colors.ai_gray_900,
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginVertical: 15,
                }}>
                Overview
              </Text>
              <FlatList
                // showsVerticalScrollIndicator={false}
                data={OverviewData}
                renderItem={({item}) => <OverviewView item={item} />}
              />
              {/* <SellerCommit /> */}
            </View>
          ) : null}
          {features ? (
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: Colors.ai_gray_900,
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginVertical: 15,
                }}>
                Features
              </Text>
              <FlatList
                // showsVerticalScrollIndicator={false}
                data={FeaturessData}
                renderItem={({item}) => <FeaturessView item={item} />}
              />
              {/* <TouchableOpacity
                style={{
                  width: '90%',
                  height: 45,
                  backgroundColor: '#E8F1FF',
                  borderColor: '#113551',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#113551',
                    fontSize: 16,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  View All Features
                </Text>
              </TouchableOpacity> */}
            </View>
          ) : null}
          {specification ? (
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: Colors.ai_gray_900,
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginVertical: 15,
                }}>
                Specifications
              </Text>
              <FlatList
                // showsVerticalScrollIndicator={false}
                data={SpecificationData}
                renderItem={({item}) => <SpecificationView item={item} />}
              />
              {/* <TouchableOpacity
                style={{
                  width: '90%',
                  height: 45,
                  backgroundColor: '#E8F1FF',
                  borderColor: '#113551',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#113551',
                    fontSize: 16,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  View All Specifications
                </Text>
              </TouchableOpacity> */}
            </View>
          ) : null}
          {inspection ? (
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#E8F1FF',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#113551',
                    fontSize: 18,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginVertical: 15,
                  }}>
                  Otoz.Ai Inspection Report
                </Text>
                {/* <TouchableOpacity>
              <Text
                style={{
                  color: '#F8B50E',
                  fontSize: 12,
                  fontWeight: '500',
                  alignSelf: 'center',
                  // marginVertical: 15,
                }}>
                Learn more
              </Text>
            </TouchableOpacity> */}
              </View>
              <FlatList
                // showsVerticalScrollIndicator={false}
                data={InspectionData}
                renderItem={({item, index}) => (
                  <InspectionView item={item} index={index} />
                )}
              />
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 45,
                  backgroundColor: '#E8F1FF',
                  borderColor: '#113551',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#113551',
                    fontSize: 16,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  View Report
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {calculator ? <PriceCalculator /> : null}

          {/* <Finanncing /> */}
          {/* <CarBuyingProcess /> */}
          {similarCar?.length > 0 && (
            <View style={{width: '90%', alignSelf: 'center', marginBottom: 20}}>
              <TrendingCarInJapan
                data={similarCar}
                onClick={item => setItem(item)}
                title="Similar cars you may like"
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default DetaildScreen;

const styles = StyleSheet.create({
  favoriteButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
  },
  favoriteIcon: {
    width: 25,
    height: 25,
  },
});
