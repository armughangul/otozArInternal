import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, red} from '../utilis/Colors';
import appServices from '../app-services/appServices';
import SimpleInfoModal from './Modals/SimpleInfoModal';
import { store } from '../redux/store';
import { logoutUser, setExploreOnly } from '../redux/Reducers/userReducers';
import { useSelector } from 'react-redux';

interface Props {
  data: any[];
  title: string;
  onClick(item: any): void;
}

const TrendingCarInJapan = ({data, title, onClick}: Props) => {
  const [visible, setVisible] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [carData, setCarData] = useState<any>(data);
  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    setCarData(data); // sync if parent updates data
  }, [data]);

const formattedNumber = (number: number) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(number);
  return formatted;
};

  const handleLogout = async () => {
    store.dispatch(logoutUser(''));
    store.dispatch(setExploreOnly(false));
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

  const Item = ({item}: any) => {
    const handleToggleFavorite = async (item: any) => {
      setLoading(true);
      const result = await toggleFavorite(item.id, item.is_favorite);
      setLoading(false);

      setMessage(result.message);
      setVisible(true);

      if (result.success) {
        const updatedData = carData.map((car: any) =>
          car.id === item.id
            ? {...car, is_favorite: result.newFavoriteStatus}
            : car,
        );
        setCarData(updatedData);
      }
    };

    return (
      <TouchableOpacity
        onPress={() => onClick(item)}
        style={{
          width: 172,
          height: 200,
          borderWidth: 0.7,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: 'hidden',
          borderColor: '#C3C3C3',
          marginRight: 8,
        }}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: item?.images[0]?.thumbnail}}
          style={{
            width: '100%',
            height: 130,
            alignSelf: 'center',
            marginTop: -2,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 8,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              disabled={loading}
              onPress={e => {
                e.stopPropagation?.();
                if (user) {
                  handleToggleFavorite(item);
                } else {
                  // navigation.navigate('SignIn');
                  handleLogout();
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
        <View style={{marginHorizontal: 10}}>
          <Text style={styles.carTitle}>
            {item?.make?.name} {item?.model?.name} {item?.year}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>
              $ {formattedNumber(item?.sale_price)}
            </Text>
            {item?.sale_price !== 0 &&
              item?.regular_price > item?.sale_price && (
                <Text style={styles.regularPrice}>
                  $ {formattedNumber(item?.regular_price)}
                </Text>
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{width: '100%', marginTop: 20}}>
      <SimpleInfoModal
        visible={message ? true : false}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={carData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Item
            item={item}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        )}
      />
    </View>
  );
};

export default TrendingCarInJapan;

const styles = StyleSheet.create({
  title: {
    color: Colors.ai_gray_900,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
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
