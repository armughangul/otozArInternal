import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Loader from '../../components/Loaders/Loader';
import {store, useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {Colors, orange, white} from '../../utilis/Colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import appServices from '../../app-services/appServices';
import {
  logoutUser,
  setExploreOnly,
  setSelectedInquiry,
} from '../../redux/Reducers/userReducers';
import InquiryBidItem from '../../components/ListItems/InquiryBidItem';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import {setMessageText} from '../../redux/Reducers/userReducers';

const MyCar = () => {
  const {loading, messageText, user} = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState<any>();
  const [inquiriesData, setInquiriesData] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const [purchaseData, setPurchaseData] = useState<any>();
  const [data, setData] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

  // const fetchInquiries = async () => {
  //   try {
  //     setVisible(true);
  //     const res = await appServices.getInquiries('');
  //     setInquiriesData(res);
  //     setVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const showModel = () => {
    store.dispatch(setExploreOnly(false));
    store.dispatch(logoutUser(''));
  
    setTimeout(() => {
      navigation.navigate('SignUp');
    }, 100); // Delay allows Redux to update state first
  };
  
  const handleProcedure = () => {
    navigation.navigate('Howitworks');
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (messageText) {
      console.log(messageText);
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);
  useFocusEffect(
    useCallback(() => {
      fetchInquiries();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.ai_gray_900,paddingBottom:100,}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="My Car" />
      {/* <Loader visible={visible} /> */}
      <SimpleInfoModal
        visible={messageText ? true : false}
        message={messageText}
        showClose={false}
        onClose={() => setVisible(false)}
      />
      {/* <View style={{flex: 1, backgroundColor: Colors.ai_gray_900,paddingBottom:180,}}> */}
      
      <View
        style={{
          backgroundColor: white,
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 10,
          marginBottom:100,
          alignItems: 'center',
          // justifyContent:'center'
        }}>
        {user ? (
          <View>
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
                        </View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            color: '#949494',
                            marginBottom: 10,
                          }}>
                          {purchaseData?.pagination.total_count} Result
                          {purchaseData?.pagination.total_count == 1
                            ? null
                            : 's'}
                        </Text>
                      </View>
                    </View>
                  }
                  showsVerticalScrollIndicator={false}
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                    style={{}}
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
                    It looks like you haven't purchased any vehicle yet. Explore
                    our collection and find your perfect ride!
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
        ) : null}
        {user ? null : (
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#EBEBEB',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 20,
                alignItems: 'center',
              }}
              onPress={() => showModel()}>
              <Text
                style={[styles.modalButtonText, {color: '#000', fontSize: 14}]}>
                Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                borderColor: orange,
                borderWidth: 1,
                alignItems: 'center',
              }}
              onPress={() => {
                setIsModalVisible(false);
                store.dispatch(setExploreOnly(false));
                store.dispatch(logoutUser(''));
                // navigation.navigate('SignUp')
              }}>
              <Text
                style={[
                  styles.modalButtonText,
                  {color: '#000', fontSize: 14, fontWeight: '400'},
                ]}>
                Already have an account?{' '}
                <Text
                  style={[
                    styles.modalButtonText,
                    {color: '#000', fontSize: 14, fontWeight: '700'},
                  ]}>
                  Log In
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                borderColor: '#DCDCDC',
                borderWidth: 1,
                alignItems: 'center',
              }}
              onPress={() => handleProcedure()}>
              <Text
                style={[
                  styles.modalButtonText,
                  {color: '#000', fontSize: 14, fontWeight: '400'},
                ]}>
                Buying Procedure
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* </View> */}
    </View>
  );
};

export default MyCar;

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    // backgroundColor:"gray",
    marginTop: '55%',
  },
  modalTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 15,
    color: '#173559',
  },
  modalButton: {
    backgroundColor: orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
