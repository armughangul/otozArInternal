import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { Colors } from '../utilis/Colors';

interface Props {
  horizontalList?: boolean;
  numCols?: number;
  onSelectBrand?(item: any): void | undefined;
  selected?: any;
}

const TabsMyAccount = ({horizontalList = true, selected}: Props) => {
  const navigation = useNavigation<any>();
  const {user} = useSelector((state: any) => state.user);
  
  const Data = [
    {
      id: '1',
      title: 'How does it work',
      Image: require('../assets/icons/howworks-ic.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '2',
      title: 'Available Stock',
      Image: require('../assets/icons/available_stock.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '3',
      title: 'Pre Auction Stock',
      Image: require('../assets/icons/hovered_preauction_bid.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '4',
      title: 'Smart Matching',
      Image: require('../assets/icons/smartmatching.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '5',
      title: "FAQ",
      Image: require('../assets/icons/faq.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '6',
      title: 'Contact Us',
      Image: require('../assets/icons/contact-ic.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '7',
      title: 'About Us',
      Image: require('../assets/icons/aboutus-ic.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '8',
      title: 'Privacy Policy',
      Image: require('../assets/icons/privacypolicy.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
    {
      id: '9',
      title: "Terms & Conditions",
      Image: require('../assets/icons/termsncondition.png'),
      Nextic: require('../assets/icons/arrownext.png'),
    },
  ];
  const filteredData = useMemo(() => {
    return Data.filter(item => {
      // !(item.id === '4' && user === null));
      if (user === null) {
        return item.id !== '4' && item.id !== '3'; // Hide Smart Matching and PreAuctionStock
      }
      return true;
    });
  }, [user]);

  const CatogoriesView = ({item}: any) =>  (
    <TouchableOpacity
    onPress={() => {
      if (item.id === '2') {
        navigation.navigate('UsedCars');
      } else if (item.id === '1') {
        navigation.navigate('Howitworks');
      } else if (item.id === '4') {
        navigation.navigate('SmartMatchingScreen');
      } else if (item.id === '5') {
        navigation.navigate('Faq');
      } else if (item.id === '6') {
        navigation.navigate('ContactUs');
      } else if (item.id === '7') {
        navigation.navigate('AboutUs');
      } else if (item.id === '8') {
        navigation.navigate('PrivacyPolicy');
      } else if (item.id === '9') {
        navigation.navigate('TermsnCondition');
      } else if (item.id === '3') {
        navigation.navigate('PreAuctionStock');
      }
    }}
    style={{
      width: '98%',
      height: 45,
      alignSelf: 'center',
      backgroundColor: '#FBFBFB',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 5,
    }}>
    <Image
      style={{width: 28, height: 28, tintColor:Colors.ai_gray_900}}
      resizeMode="contain"
      source={item.Image}
    />
    <Text
      style={{
        fontSize: 14,
        fontWeight: '600',
        color: '#113551',
        width: '75%',
      }}>
      {item.title}
    </Text>
    <Image style={{width: 10, height: 14}} source={item.Nextic} />
  </TouchableOpacity>
  );

  const MemoizedTabsListing = useMemo(
    () => React.memo(CatogoriesView),
    [selected],
  );
  return (
    <View style={{width: '100%'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <MemoizedTabsListing item={item} />}
      />
    </View>
  );
};

export default TabsMyAccount;

const styles = StyleSheet.create({});
