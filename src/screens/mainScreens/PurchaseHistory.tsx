import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import OtozBackground from '../../components/Backgrounds/OtozBackground';
import InquiryBidItem from '../../components/ListItems/InquiryBidItem';
import TopHeader from '../../components/TopHeader';
import {Colors, orange, white} from '../../utilis/Colors';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loaders/Loader';
import appServices from '../../app-services/appServices';
import {useAppDispatch} from '../../redux/store';
import {setSelectedInquiry} from '../../redux/Reducers/userReducers';

export default function PurchaseHistory() {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState<any>();
  const [purchaseData, setPurchaseData] = useState<any>();
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();

  const fetchInquiries = async () => {
    try {
      setVisible(true);
      const res = await appServices.getPurchaeHistory('');
      // const parsedResponse = JSON.parse(res);
      setPurchaseData(res);
      setData(res.purchase_histories);

      setVisible(false);
      // console.log('responseeeeeeeeeeeeeeee', res.purchase_histories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <OtozBackground>
      <TopHeader title={'Purchase History'} />
      <Loader visible={visible} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#f9f9f9',
          paddingHorizontal: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 10,
        }}>
        {!visible ? (
          purchaseData?.pagination.total_count > 0 ? (
            <FlatList
              ListHeaderComponent={
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: Colors.ai_gray_900,
                          marginBottom: 10,
                        }}>
                        Purchase History
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#949494',
                          marginBottom: 10,
                        }}>
                        Dashboard / Purchase History
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#949494',
                        marginBottom: 10,
                      }}>
                      {purchaseData?.pagination.total_count} Result
                      {purchaseData?.pagination.total_count == 1 ? null : 's'}
                    </Text>
                  </View>
                </View>
              }
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSelectedInquiry(item));
                    navigation.navigate('InquiryDetail', {inquiry: item});
                  }}>
                  <InquiryBidItem item={item} />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                backgroundColor: white,
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/no-inquiries.png')}
                style={{width: 350, height: 200}}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.ai_gray_900,
                  marginTop: 10,
                }}>
                No Purchase History Yet
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.ai_gray_900,
                  marginTop: 5,
                  textAlign: 'center',
                  paddingHorizontal: 10,
                }}>
                It looks like you haven't purchased any vehicle yet. Explore our
                collection and find your perfect ride!
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UsedCars')}
                style={{
                  height: 35,
                  backgroundColor: Colors.ai_gray_900,
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  marginTop: 15,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: white,
                    // marginTop: 10,
                  }}>
                  Browse Vehicles
                </Text>
              </TouchableOpacity>
              <View style={{height: 150}} />
            </View>
          )
        ) : null}
      </View>
    </OtozBackground>
  );
}
const styles = StyleSheet.create({});
