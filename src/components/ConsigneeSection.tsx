import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryButton from './PrimaryButton';
import ConsigneeForm from './User/ConsigneeForm';
import {Colors, orange, red, white} from '../utilis/Colors';
import appServices from '../app-services/appServices';
import SimpleInfoModal from './Modals/SimpleInfoModal';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ConsigneeSection = ({item}: any) => {
  const [car, setCar] = useState<any>();
  const [name, setName] = useState<any>('');
  const [email, setEmal] = useState<any>('');
  const [contactNo, setContactNo] = useState<any>('');
  const [passport, setPassport] = useState<any>('');
  const [poBox, setPoBox] = useState<any>('');
  const [address, setAddress] = useState<any>('');
  const [inquiryId, setInquiryId] = useState<any>();
  const [consigneeData, setConsigneeData] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [show, setShow] = useState<any>(false);
  const [message, setMessage] = useState<any>('');
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.user);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (item) {
      setCar(item?.car);
      setInquiryId(item?.id);
    }
    if (!item?.consignee_details && user) {
      const fullName =
        `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
      setName(fullName);
      // setName(user?.first_name || '');
      setEmal(user?.email || '');
      setContactNo(user?.phone_no || '');
      setAddress(user?.address || '');
    }

    console.log('Consignee-Section-item', item?.consignee_details);
    console.log('Consignee-user-user', user);
  }, [item, user]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Error = ({children}: any) => {
    return (
      <View style={{marginLeft: 20}}>
        <Text style={{color: 'red', fontSize: 12}}>{children}</Text>
      </View>
    );
  };

  const priceData = [
    // {label: 'Car Price', value: item.car_price ? `$${formattedNumber(item?.car_price)}` : '-'},
    {
      label: 'Name',
      value: item?.consignee_details?.name
        ? `${item?.consignee_details?.name}`
        : '-',
    },
    {
      label: 'Email',
      value: item?.consignee_details?.email
        ? `${item?.consignee_details?.email}`
        : '-',
    },
    {
      label: 'Contact No.',
      value: item?.consignee_details?.contact_no
        ? `${item?.consignee_details?.contact_no}`
        : '-',
    },
    {
      label: 'Address',
      value: item?.consignee_details?.address
        ? `${item?.consignee_details?.address}`
        : '-',
    },
    {
      label: 'Passport No/ID Number',
      value: item?.consignee_details?.passport
        ? `${item?.consignee_details?.passport}`
        : '-',
    },
    {
      label: 'P.O.Box',
      value: item?.consignee_details?.pobox
        ? `${item?.consignee_details?.pobox}`
        : '-',
    },
  ];

  const handleSubmit = async () => {
    if (
      !name ||
      name.trim().length <= 2 ||
      !email.match(validRegex) ||
      !contactNo ||
      !address ||
      !passport
    ) {
      setShowError(true);
      console.log(name, 'is required.');
    } else {
      setShowError(false);
      console.log('Modal closed');
      await confirmationConsignee();
    }
  };
  const confirmationConsignee = () => {
    setVisible(true);
  };

  const consignee = async () => {
    setVisible(false);
    const body = {
      name: name,
      email: email,
      contact_no: contactNo,
      passport: passport,
      pobox: poBox,
      address: address,
      inquiry_id: inquiryId,
    };
    try {
      const response = await appServices.addConsignee(body);
      // console.log('API success:', response);
      setConsigneeData(response);
      // console.log('consigneeDataaaaaaaaa', consigneeData);
      setMessage('We have received your consignee details.');
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (error: any) {
      // console.log('addConsignee API error', error);
      if (error.response) {
        console.log('API Error:', error.response);
        throw error.response;
      } else {
        console.log('Unknown Error:', error);
        throw error;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SimpleInfoModal
          visible={message ? true : false}
          message={message}
          showClose={false}
          onClose={() => setMessage('')}
        />
        {/* confirmation modal starts */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <View
                style={{
                  width: '100%',
                  height: 80,
                  backgroundColor: Colors.ai_gray_900,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  alignItems: 'center',
                }}>
                <LottieView
                  source={require('../assets/lottie/Animation.json')}
                  style={{width: 100, height: 100, marginTop: 5}}
                  autoPlay
                  loop
                />
              </View>
              <Text style={styles.headerText}>Otoz.Ai</Text>
              <Text
                style={[
                  styles.messageText,
                  {fontSize: 14, textAlign: 'justify'},
                ]}>
                If your consignee details are correct, click the Submit button.
                To make changes, click the Cancel button, update the details,
                and then click Submit.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: 200,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={[
                    styles.button2,
                    {
                      borderColor: Colors.ai_gray_900,
                      borderWidth: 1,
                      backgroundColor: white,
                    },
                  ]}
                  onPress={() => setVisible(false)}>
                  <Text
                    style={[styles.buttonText, {color: Colors.ai_gray_900}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => consignee()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* confirmation modal ends */}
        {item?.consignee_details ? (
          <View>
            <View style={styles.header}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Consignee Details
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                width: '90%',
                alignSelf: 'center',
                borderBottomWidth: 1,
                borderColor: '#E9E9E9',
                marginBottom: 15,
              }}>
              {priceData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 0.2,
                    borderBottomColor: '#E9E9E9',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#F3F5F6',
                      width: '50%',
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#123652',
                        flex: 1,
                        fontSize: 12,
                        paddingTop: 10,
                        paddingLeft: 10,
                      }}>
                      {item.label}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: '#2E2E2E',
                      paddingStart: 15,
                      fontSize: 12,
                      //  paddingTop: 10,
                      paddingVertical: 10,
                      paddingLeft: 10,
                      //  backgroundColor:'red',
                      flexWrap: 'wrap',
                      width: '50%',
                    }}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.modalViewlatest}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#123652',
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                paddingVertical: 10,
                paddingLeft: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Add Consignee
              </Text>
            </View>
            <ConsigneeForm
              maxLength={20}
              value={name}
              title={'Name*'}
              icon={require('../assets/icons/user-1.png')}
              onChange={(value: any) => setName(value)}
            />
            {!(name.trim().length > 2) && showError && (
              <Error>Name is required.</Error>
            )}
            <ConsigneeForm
              maxLength={30}
              value={email}
              keyboardType="email-address"
              title="Email*"
              icon={require('../assets/icons/envelope-1.png')}
              onChange={(value: any) => setEmal(value)}
            />
            {!email && showError && <Error>Email is required.</Error>}
            {email !== '' && !email.match(validRegex) && showError && (
              <Error>Invalid email.</Error>
            )}
            <ConsigneeForm
              maxLength={16}
              value={contactNo}
              keyboardType="number-pad"
              title="Phone No*"
              icon={require('../assets/icons/phone-call.png')}
              onChange={(value: any) => setContactNo(value)}
            />
            {!contactNo && showError && <Error>Contact No. is required.</Error>}
            <ConsigneeForm
              maxLength={45}
              value={address}
              // keyboardType={number}
              title="Address*"
              icon={require('../assets/icons/marker.png')}
              onChange={(value: any) => setAddress(value)}
            />
            {!address && showError && <Error>Address is required.</Error>}
            <ConsigneeForm
              maxLength={30}
              value={passport}
              // keyboardType={number}
              title="Passport No. / ID Number*"
              icon={require('../assets/icons/passport.png')}
              onChange={(value: any) => setPassport(value)}
            />
            {!passport && showError && (
              <Error>Passport No. / ID Number is required.</Error>
            )}
            <ConsigneeForm
              maxLength={40}
              value={poBox}
              // keyboardType={number}
              title="P.O. Box"
              icon={require('../assets/icons/Vector.png')}
              onChange={(value: any) => setPoBox(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  height: 45,
                  borderColor: Colors.ai_gray_900,
                  borderRadius: 10,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: Colors.ai_gray_900,
                    textAlign: 'center',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <PrimaryButton
                title={'Submit'}
                // title="Send OTP"
                width={'55%'}
                height={'6%'}
                backgroundColor={Colors.ai_gray_900}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}

        <View
          style={{
            width: '90%',
            // height: 30,
            // backgroundColor: '#ffe69c',
            backgroundColor: item?.consignee_details ? '#27914726' : '#ffe69c',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 3,
            marginTop: 15,
          }}>
          {item?.consignee_details ? (
            <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
              Hi{' '}
              <Text style={{color: '#279147', fontSize: 12, fontWeight: '700'}}>
                {item?.user_name}
              </Text>
              , We have received your consignee details.
            </Text>
          ) : (
            <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
              Hi{' '}
              <Text style={{color: '#123652', fontSize: 12, fontWeight: '700'}}>
                {item?.user_name}
              </Text>
              , For shipping purposes, please add your consignee details. We
              will then arrange the booking with a shipping company for your
              car.
            </Text>
          )}
        </View>
        <View style={{height: isKeyboardVisible ? 200 : 70}} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ConsigneeSection;

const styles = StyleSheet.create({
  modalViewlatest: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 30,
    // paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    borderColor: '#E1E4E8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextlatest: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#3F51B5',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,.65)',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  // consignee after informatiuon styles
  header: {
    backgroundColor: '#173B5E',
    width: '90%',
    alignSelf: 'center',
    padding: 12,
    textAlign: 'left',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  table: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderBottomColor: '#E9E9E9',
    // backgroundColor: "red",
  },
  label: {
    fontWeight: 'bold',
    color: '#173B5E',
    flex: 1,
    fontSize: 14,
    // backgroundColor: "red",
  },
  value: {
    textAlign: 'center',
    color: '#333',
    paddingStart: 15,
    fontSize: 14,
    // backgroundColor: "red",
  },

  // confirmation modal
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#123652',
    marginTop: 20,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.ai_gray_900,
    width: '85%',
  },
  button2: {
    backgroundColor: Colors.ai_gray_900,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: white,
    fontSize: 16,
    fontWeight: '500',
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView2: {
    backgroundColor: white,
    borderRadius: 20,
    // padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: 280,
  },
});
