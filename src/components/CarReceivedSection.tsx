import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryButton from './PrimaryButton';
import {Colors, orange} from '../utilis/Colors';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../redux/store';
import appServices from '../app-services/appServices';
import {useNavigation} from '@react-navigation/native';
import {setMessageText} from '../redux/Reducers/userReducers';

const CarReceivedSection = ({item}: any) => {
  const [car, setCar] = useState<any>();
  const [carReceived, setCarReceived] = useState<any>(false);
  const [messageTxt, setMessageTxt] = useState<any>('');
  const [visible, setVisible] = useState<any>(false);
  const [messageTxt2, setMessageTxt2] = useState<string>('');
  const [inquiryId, setInquiryId] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const {messageText} = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [sendingInquiry, setSendIng] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [received, setReceived] = useState<boolean>(
    item?.shipping?.car_received,
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (item) setCar(item?.car);
    console.log('itemmmmmmmmmmmmmmm', item?.shipping?.car_received);
    setInquiryId(item?.id);
    setReceived(item?.shipping?.car_received);
  }, [item]);

  const handleCarReceived = () => {
    if (!inquiryId) {
      setShowError(true);
      console.log('inquiryId is missing', inquiryId);
    } else {
      setShowError(false);
      console.log('inquiryId exists:', inquiryId);
      submit();
      setCarReceived(!carReceived);
      setReceived(item?.shipping?.car_received);
    }
  };
  useEffect(() => {
    // console.log('messageTexttttttttttttttttttttttttttt', messageText);
    if (messageText) {
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);

  const submit = async () => {
    let body = {
      inquiry_id: inquiryId,
    };
    console.log(body);
    setSendIng(true);
    try {
      const res = await appServices.getCar(body);
      setMessage('Car Received!');
      setTimeout(() => {
        navigation?.goBack();
      }, 3000);
      setSendIng(false);
      setShowError(true);
      setReceived(true);
    } catch (error: any) {
      console.log('....here error');
      setShowError(false);
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong.';
      console.log(errorMessage);
      setMessage(errorMessage);
      setSendIng(false);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View
        style={{
          backgroundColor: '#EEEEEE',
          width: '100%',
          height: 50,
          borderColor: '#C3C3C3',
          borderTopWidth: 2,
          borderBottomWidth: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 12, color: '#113551', fontWeight: 'bold'}}>
            Wow
          </Text>
        </View>
      </View> */}

      {/* ////////////////////////////////////  Documents Section Start //////////////////////////////////// */}

      {/* <View> */}
      {received ? null : (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#123652',
              textAlign: 'center',
              width: '90%',
            }}>
            If you receive your car, please confirm by pressing car received
            button.
          </Text>
        </View>
      )}
      {received ? null : (
        <View style={{alignSelf: 'center', marginVertical: 10, width: '90%'}}>
          <PrimaryButton
            title={'Car Received'}
            // title="Send OTP"
            width={'75%'}
            height={'6%'}
            backgroundColor={Colors.ai_gray_900}
            onPress={() => handleCarReceived()}
          />
        </View>
      )}
      {received ? (
        <Image
          resizeMode="contain"
          style={{
            width: 140,
            height: 120,
            alignSelf: 'center',
            marginVertical: 20,
          }}
          source={require('../assets/carreceived.png')}
        />
      ) : null}

      {received ? (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#123652',
              textAlign: 'center',
              width: '90%',
            }}>
            Congratulations on your new car! Enjoy the freedom, convenience, and
            adventure it brings. May it take you on incredible journeys and
            create lasting memories. Wishing you many safe and enjoyable drives
            ahead.
          </Text>
        </View>
      ) : null}

      {/* {received ? (
        <View
          style={{
            backgroundColor: '#EEEEEE',
            width: '100%',
            height: 50,
            borderColor: '#C3C3C3',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontSize: 12, color: '#113551', fontWeight: 'bold'}}>
              Rate Us
            </Text>
          </View>
        </View>
      ) : null} */}

      {/* {received ? (
        <AirbnbRating
          count={5}
          reviews={['Fair', 'Average', 'Good', 'Very Good', 'Amazing']}
          defaultRating={4}
          selectedColor="#F8B50E"
          reviewColor="#F8B50E"
          size={20}
          reviewSize={16}
          showRating={true}
          starContainerStyle={{}}
          ratingContainerStyle={{marginVertical: 20}}
        />
      ) : null} */}

      {/* {received ? (
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            padding: 15,
          }}>
          <MultilineTextField
            title="Comment / Feedback"
            value={messageTxt}
            onChangeText={message => setMessageTxt(message)}
          />
        </View>
      ) : null} */}
      {/* 
      {received ? (
        <View style={{alignSelf: 'center', width: '90%'}}>
          <PrimaryButton
            title={'Submit your Feedback'}
            // title="Send OTP"
            width={'65%'}
            height={'6%'}
            backgroundColor={'#F8B50E'}
            onPress={() => handleFeedback()}
          />
        </View>
      ) : null} */}

      {/*  ////////////////////////////////////  Documents Section Ends //////////////////////////////////// */}

      <View style={{height: 70}} />
    </ScrollView>
  );
};

export default CarReceivedSection;

const styles = StyleSheet.create({});
