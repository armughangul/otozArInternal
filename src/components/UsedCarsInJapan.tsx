
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {red} from '../utilis/Colors';
import {useSelector} from 'react-redux';
import SimpleInfoModal from './Modals/SimpleInfoModal';
import appServices from '../app-services/appServices';
import ContactGroup from './ContactGroup';
import { useFocusEffect } from '@react-navigation/native';
import { store } from '../redux/store';
import { logoutUser, setExploreOnly } from '../redux/Reducers/userReducers';

interface Props {
  usedCars: any[];
  navigation: any;
  title: any;
}

const UsedCarsInJapan = ({usedCars, navigation, title}: Props) => {
  const {ip} = useSelector((state: any) => state.user);
  const [message, setMessage] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [carData, setCarData] = useState<any>(usedCars);
  const {user} = useSelector((state: any) => state.user);

  useFocusEffect(
    useCallback(() => {
      setCarData(usedCars);
    }, [usedCars])
  );

    const handleLogout = async () => {
      store.dispatch(logoutUser(''));
      store.dispatch(setExploreOnly(false));
    };

  const formattedNumber = (number: any) =>
    new Intl.NumberFormat('en-US', {style: 'decimal'}).format(number);

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

  const handleToggleFavorite = async (item: any) => {
    setLoading(true);
    const result = await toggleFavorite(item.id, item.is_favorite);
    setLoading(false);

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

  const renderItem = ({item}: any) => (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetaildScreen', {
              car: item,
            })
          }>
          <ImageBackground
            resizeMode="cover"
            source={{uri: item?.images[0]?.thumbnail}}
            style={styles.imageBackground}>
            <View style={styles.topRow}>
              <TouchableOpacity
              // navigation.navigate('Login');
                disabled={loading}
                // onPress={e => {
                //   e.stopPropagation?.();
                //   handleToggleFavorite(item);
                // }}
                onPress={e => {
                  e.stopPropagation?.();
                  if (user) {
                    handleToggleFavorite(item);
                  } else {
                    // navigation.navigate('SignIn');
                    handleLogout()
                  }
                }}
                style={[
                  styles.favoriteButton,
                  {
                    backgroundColor: item.is_favorite
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.9)',
                  },
                ]}>
                <Image
                  resizeMode="contain"
                  source={
                    item.is_favorite
                      ? require('../assets/icons/liked2.png')
                      : require('../assets/icons/like2.png')
                  }
                  style={styles.favoriteIcon}
                />
                {/* Certified Badge */}
                {item?.certification_status === 'Certified' && (
                  <View
                    style={{
                      width: 158,
                      height: 30,
                      borderWidth: 1,
                      borderColor: '#707070',
                      backgroundColor: '#123652',
                      borderRadius: 30,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                      bottom: -14,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/icons/logo1.png')}
                      style={{width: 54, height: 14}}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#fff',
                        textTransform: 'uppercase',
                        marginLeft: 5,
                      }}>
                      Certified
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {item?.certification_status === 'Certified' && (
                <View style={styles.certifiedBadge}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/icons/logo1.png')}
                    style={styles.certifiedLogo}
                  />
                  <Text style={styles.certifiedText}>Certified</Text>
                </View>
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                width: 140,
                height: 34,
                backgroundColor: '#44BC8A',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                // marginRight: 15,
                flexDirection: 'row',
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
          <Text style={styles.carTitle}>
            {item?.make?.name} {item?.model?.name} {item?.year}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 14,
              color: '#666666',
              fontWeight: '400',
              marginBottom: 10,
            }}>
            {item?.year} {'|'} {item?.fuel_type?.name} {'|'}{' '}
            {formattedNumber(item?.mileage)} km {'|'}{' '}
            {formattedNumber(item?.engine_size)} cc {'|'} {item?.transmission}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '95%',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: red,
                fontWeight: 'bold',
              }}>
              ${' '}
              {item.sale_price !== 0 && item.regular_price > item.sale_price
                ? formattedNumber(item?.sale_price)
                : formattedNumber(item.regular_price)}
            </Text>
            {item.sale_price !== 0 && item.regular_price > item.sale_price && (
              <Text
                style={{
                  fontSize: 16,
                  color: '#113551',
                  fontWeight: '500',
                  textDecorationLine: 'line-through',
                }}>
                $ {formattedNumber(item?.regular_price)}
              </Text>
            )}
          </View>
          <Text
            style={{
              fontSize: 14,
              color: '#113551',
              fontWeight: '400',
              marginLeft: 5,
            }}>
            Stock ID. {item?.serial_code}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{marginTop: 20}}>
      <SimpleInfoModal
        visible={!!message}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={carData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UsedCarsInJapan;

const styles = StyleSheet.create({
  title: {
    color: '#113551',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  cardWrapper: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#C3C3C3',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    // marginBottom: 0,
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
  },
  imageBackground: {
    width: '100%',
    height: 252,
    alignSelf: 'center',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  topRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 8,
  },
  favoriteButton: {
    width: 24,
    height: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 18,
    height: 18,
  },
  certifiedBadge: {
    width: 96,
    height: 19,
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#123652',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  certifiedLogo: {
    width: 33,
    height: 8,
    marginStart: 5,
  },
  certifiedText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    marginLeft: 2,
  },
  cardContent: {
    marginHorizontal: 10,
    marginTop:10,
  },
  carTitle: {
    color: '#123652',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salePrice: {
    color: red,
    fontSize: 14,
    fontWeight: 'bold',
  },
  regularPrice: {
    fontSize: 16,
    color: '#113551',
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
});
