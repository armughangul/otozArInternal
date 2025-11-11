import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AristaBold} from '../../utilis/Fonts';
import {Colors, orange, white} from '../../utilis/Colors';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {useAppDispatch} from '../../redux/store';
import {setMessageText, signUp} from '../../redux/Reducers/userReducers';
import {useSelector} from 'react-redux';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import Loader from '../../components/Loaders/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getCountries,
  getPortsByCountry,
} from '../../redux/Reducers/countriesPortsReducers';
import RNPickerSelect from 'react-native-picker-select';

const SignUp = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<string>('');
  const [ConfirmPassword, setConfirmPassword] = useState<any>('');
  const [toggleCheckBox, setToggleCheckBox] = useState<any>(false);
  const [message, setMessage] = useState<any>('');
  const [sendingInquiry, setSendIng] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [country, setCountry] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [showError, setShowError] = useState<boolean>(false);
  const {countries} = useSelector((state: any) => state.countriesPorts);
  const [showCheckBoxError, setShowCheckBoxError] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const {isSignUp, messageText, loading} = useSelector(
    (state: any) => state.user,
  );
  const [responseMessage, setResponseMessage] = useState('');
  const {profileImg} = useSelector((state: any) => state.user);
  const [selectedCountryData, setSelectedCountryData] = useState<any>(null);
  const [roleID, setRoleID] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [isModalVisible1, setIsModalVisible1] = useState<boolean>(false);
  const [roleError, setRoleError] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');

  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };

  const showModel = () => {
    if (!roleID) {
      setRoleError('Please select one of the options.');
      return;
    }
    setRoleError('');
    setIsModalVisible1(true);
    console.log('setIsModalVisible1(true)');
    setIsModalVisible(false);
  };
  const closeHandle = () => {
    setIsModalVisible(false);
    navigation.navigate('SignIn');
    // if (!roleID) {
    //   setRoleError('Please select one of the options.');
    //   return;
    // }
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

  useEffect(() => {
    
    dispatch(getCountries());
    console.log('countriessss123', countries)
    // setCountry(countries);
    console.log('Selected Country ID:', selectedCountry);
    // console.log('Fetched countries:', countries);
  }, []);

  const roleSelect = (id: number) => {
    setRoleID(id);
    // dispatch(setRole(id));
  };

  useEffect(() => {
    if (roleID !== null) {
      console.log('Updated roleID:', roleID);
    }
  }, [roleID]);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    console.log('Updated selectedCountryData:', selectedCountryData);
  }, [selectedCountryData]);

  useEffect(() => {
    console.log('Updated dialCode111111222222:', dialCode);
  }, [dialCode]);

  useEffect(() => {
  console.log('Current country states:', {
    selectedCountry, // Should be ID
    country, // Should be name
    selectedCountryData // Should contain all country data
  });
}, [selectedCountry, country, selectedCountryData]);

  const handleCountryChange = async (selectedValue: string) => {
    if (!selectedValue) {
      console.warn('No country selected');
      return;
    }
  
    const selectedCountryObj = countries.find(
      (item: any) => item.value === parseInt(selectedValue)
    );
    
    if (selectedCountryObj) {
      setSelectedCountryData({
        flag: selectedCountryObj.flag,
        dial_code: selectedCountryObj.country_code,
        name: selectedCountryObj.label,
      });
      
      // Set both the ID and the display name
      setSelectedCountry(selectedValue); // This is the ID
      setCountry(selectedCountryObj.label); // This is the display name
      
      setDialCode(selectedCountryObj.country_code);
  
      try {
        await dispatch(getPortsByCountry(selectedValue));
      } catch (error) {
        console.error('Error fetching ports:', error);
      }
    }
  };


  useEffect(() => {
    if (isSignUp) {
      navigation.navigate('ConfirmEmail');
    }
  }, [isSignUp]);

  const fullPhoneNumber = `${dialCode}${phone}`;
  console.log('fullPhoneNumber', fullPhoneNumber);

  const handleSubmit = () => {
    if (
      !toggleCheckBox ||
      !name ||
      name.trim().length < 3 ||
      !email ||
      !selectedCountry ||
      !fullPhoneNumber ||
      !roleID ||
      !(password.length > 7 && password.length < 17) ||
      password !== ConfirmPassword ||
      !email.match(validRegex)
    ) {
      setShowError(true);
      setShowCheckBoxError(true);
      console.log('heree error');
      // password !== ConfirmPassword;
      // if (!toggleCheckBox) {

      // }
    } else {
      setShowError(false);
      setShowCheckBoxError(false);
      submit();
    }
    if (!validatePhoneNumber(phone)) {
      setShowError(true);
      return;
    }
  };

  const submit = async () => {
    let body = {
      first_name: name,
      email: email,
      phone_no: fullPhoneNumber,
      country: selectedCountry,
      image: profileImg,
      password: password,
      password_confirmation: password,
      role_id: roleID,
    };
    dispatch(signUp({body}));
    console.log(body);

    try {
      setSendIng(true);
      setVisible(true);
      setSendIng(false);
    } catch (error) {
      setResponseMessage(error as string);
      setVisible(true);
      setSendIng(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      <Loader visible={loading} />
      <SimpleInfoModal
        visible={messageText ? true : false}
        message={messageText}
        showClose={false}
        onClose={() => setVisible(false)}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoView}>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogo.png')}
          />
          <View style={styles.fields}>
            <InputField
              value={name}
              title="Name"
              onChange={value => setName(value)}
              maxLength={30}
              keyboardType="default"
            />
            {!(name.trim().length > 2) && showError && (
              <Error>Name is required.</Error>
            )}
            <InputField
              value={email}
              title="Email"
              onChange={value => setEmail(value)}
              keyboardType="email-address"
            />
            {!email && showError && <Error>Email is required.</Error>}
            {email !== '' && !email.match(validRegex) && showError && (
              <Error>Invalid email.</Error>
            )}
            {/* country start */}
            <View style={{}}>
              <Text style={styles.title}>Country</Text>
              <View
                style={{
                  borderColor: '#C3C3C3',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginBottom: 10,
                }}>
                <RNPickerSelect
                  onValueChange={value => {
                    // console.log('Fetched countries:', countries);
                    console.log('Selected Country:', selectedCountry);
                    handleCountryChange(value);
                  }}
                  items={countries}
                  
                  placeholder={{label: 'Select a country...', value: null}}
                  style={pickerSelectStyles}
                />
              </View>
              {!country && showError && (
                <Error>Country is required.</Error>
              )}
            </View>
            {/* country ends here  */}

            {/* phone start here  */}
            <View style={{flex: 1, marginBottom: 10}}>
              <Text style={styles.title}>Phone Number:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 0,
                  width: '100%',
                }}>
                <View
                  style={{
                    height: 40,
                    borderColor: '#C3C3C3',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    width: 55,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'contain'}
                    source={{
                      uri: `https://otoz.ai/otozai-v2/flags/${selectedCountryData?.flag}`,
                    }}
                    style={{width: 28, height: 28}}
                  />
                  {/* <Text
                    style={{
                      color: 'lightgray',
                      fontSize: 14,
                      fontFamily: 'Inter-Medium',
                    }}>---</Text> */}
                </View>

                <View
                  style={[
                    styles.input,
                    {width: '82%', flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <View
                    // onPress={() => setShow(true)}
                    style={{
                      borderRightWidth: 1,
                      borderColor: 'gray',
                      // width: 32,
                      paddingRight: 5,
                      // backgroundColor:'red',
                      // width: 30,
                    }}>
                    <Text
                      style={{
                        color: selectedCountry
                          ? Colors.ai_gray_900
                          : 'lightgray',
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                      }}>
                      {/* {selectedCountryData ? selectedCountryData?.value : '---'} */}
                      {dialCode ? dialCode : '---'}
                    </Text>
                  </View>
                  <TextInput
                    placeholderTextColor={'lightgray'}
                    placeholder="123456789"
                    style={{color: Colors.ai_gray_900, marginLeft: 5}}
                    maxLength={15}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    keyboardType="phone-pad"
                  />
                  {/* <TextInput
                    placeholderTextColor={'lightgray'}
                    placeholder="123456789"
                    style={{ color: white, marginLeft: 5 }}
                    maxLength={15}
                  /> */}
                </View>
              </View>
            </View>
            {!validatePhoneNumber(phone) && showError && (
              <Error>Invalid phone number.</Error>
            )}

            {/* pone ends here */}
            <InputField
              value={password}
              title="Password"
              onChange={value => setPassword(value)}
              secureTextEntry
              maxLength={16}
            />
            {!password && showError && <Error>Password is required.</Error>}
            {!(password.length > 7 && password.length < 17) && showError && (
              <Error>Password must be min 8 and max 16 characters long</Error>
            )}
            <InputField
              value={ConfirmPassword}
              title="Confirm Password"
              onChange={value => setConfirmPassword(value)}
              secureTextEntry
              maxLength={16}
            />
            {!ConfirmPassword && showError && (
              <Error>ConfirmPassword is required.</Error>
            )}
            {!(password.length > 7 && password.length < 17) && showError && (
              <Error>
                Invalid Password. Password must be min 8 and max 16 characters
                long
              </Error>
            )}
            {ConfirmPassword !== '' &&
              password !== ConfirmPassword &&
              showError && <Error>Passwords do not match.</Error>}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // backgroundColor:'lightgray',
                marginTop: 10,
              }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                style={{transform: [{scaleX: 0.895}, {scaleY: 0.895}]}} // Increase size visually
                // tintColors={{ true: 'green', false: 'orange' }}
                onCheckColor={Colors.ai_gray_900}
                onFillColor={Colors.ai_gray_900}
                onTintColor={Colors.ai_gray_900}
              />

              <View
                style={{
                  width: '90%',
                  alignSelf: 'flex-end',
                  // backgroundColor:'red'
                }}>
                <Text
                  style={{
                    color: Colors.ai_gray_900,
                    fontWeight: '400',
                    fontSize: 14,
                    textAlign: 'justify',
                  }}>
                  Please note that by creating account you accept our{'  '}
                  <Text
                    onPress={() => navigation.navigate('TermsnCondition')}
                    style={{
                      color: Colors.ai_gray_900,
                      fontWeight: 'bold',
                      fontSize: 14,
                      textDecorationLine: 'underline',
                    }}>
                    Terms & Conditions
                  </Text>
                  {'  '}and{'  '}
                  <Text
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    style={{
                      color: Colors.ai_gray_900,
                      fontWeight: 'bold',
                      fontSize: 14,
                      textDecorationLine: 'underline',
                    }}>
                    Privacy Policy.
                  </Text>
                </Text>
              </View>
            </View>

            {showCheckBoxError && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                  marginBottom: 20,
                  marginTop: 10,
                }}>
                Please agree to terms and conditions
              </Text>
            )}
            <View style={{height: 10}}></View>
          </View>

          <PrimaryButton
            title="Sign Up"
            width={'90%'}
            height={'6%'}
            backgroundColor={Colors.ai_gray_900}
            onPress={() => {
              handleSubmit();
            }}
          />
          <View style={{marginVertical: 20}}>
            <Text style={{color: Colors.ai_gray_900, fontWeight: '500', fontSize: 16}}>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('SignIn')}
                style={{color: Colors.ai_gray_900, fontWeight: 'bold', fontSize: 16,textDecorationLine: 'underline',}}>
                Sign In
              </Text>{' '}here
            </Text>
          </View>
        </View>
        {/* Welcome Modal */}
        {/* /////////// Starts Join as a Customer or Dealer  Modal/////////// */}
        <Modal transparent={true} visible={isModalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  onPress={() => closeHandle()}
                  style={{width: 20, height: 30, alignSelf: 'flex-end'}}>
                  <Image
                    resizeMode="contain"
                    style={{width: 16, height: 16, tintColor: '#173559'}}
                    source={require('../../assets/icons/close2.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>
                Join as a Customer or Dealer
              </Text>
              {/* Customer BTN starts */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* Customer Button */}
                <TouchableOpacity
                  onPress={() => roleSelect(34)}
                  style={{
                    width: '48%',
                    height: 100,
                    borderColor: roleID === 34 ? Colors.ai_gray_900 : '#B3BAC3',
                    borderRadius: 5,
                    borderWidth: 1,
                    paddingVertical: 8,
                  }}>
                  <View
                    style={{
                      width: '85%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: '#173559',
                        marginBottom: 8,
                      }}
                      source={require('../../assets/customer.png')}
                    />
                    <TouchableOpacity
                      onPress={() => roleSelect(34)}
                      style={{
                        borderColor: roleID === 34 ? Colors.ai_gray_900 : '#B3BAC3',
                        borderWidth: roleID === 34 ? 5 : 1,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.ai_gray_900,
                      fontWeight: roleID === 34 ? '700' : '400',
                      paddingHorizontal: 5,
                      alignSelf: 'center',
                      marginTop: 5,
                    }}>
                    I am a customer looking to search for and purchase a new
                    car.
                  </Text>
                </TouchableOpacity>

                {/* Dealer Button */}
                <TouchableOpacity
                  onPress={() => roleSelect(37)}
                  style={{
                    width: '48%',
                    height: 100,
                    borderColor: roleID === 37 ? Colors.ai_gray_900 : '#B3BAC3',
                    borderRadius: 5,
                    borderWidth: 1,
                    paddingVertical: 8,
                  }}>
                  <View
                    style={{
                      width: '85%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: Colors.ai_gray_900,
                        marginBottom: 8,
                      }}
                      source={require('../../assets/dealer.png')}
                    />
                    <TouchableOpacity
                      onPress={() => roleSelect(37)}
                      style={{
                        borderColor: roleID === 37 ? Colors.ai_gray_900 : '#B3BAC3',
                        borderWidth: roleID === 37 ? 5 : 1,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.ai_gray_900,
                      paddingHorizontal: 5,
                      alignSelf: 'center',
                      fontWeight: roleID === 37 ? '700' : '400',
                      marginTop: 5,
                    }}>
                    I am a dealer looking to purchase and bid on cars.
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                {roleError && <Error>{roleError}</Error>}
              </View>
              {/* Customer BTN ends */}
              <TouchableOpacity
                onPressIn={() => navigation.navigate('SignUp')}
                style={{
                  width: '100%',
                  backgroundColor: Colors.ai_gray_900,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 20,
                  alignItems: 'center',
                }}
                onPress={() => showModel()}>
                <Text
                  style={[
                    styles.modalButtonText,
                    {color: white, fontSize: 14},
                  ]}>
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
                  borderColor: Colors.ai_gray_900,
                  borderWidth: 1,
                  alignItems: 'center',
                }}
                onPress={() => {
                  // if (!roleID) {
                  //   setRoleError('Please select one of the options.');
                  //   return;
                  // }
                  // setRoleError('');
                  setIsModalVisible(false);
                  navigation.navigate('SignIn');
                }}>
                <Text
                  style={[
                    styles.modalButtonText,
                    {color: Colors.ai_gray_900, fontSize: 14, fontWeight: '400'},
                  ]}>
                  Already have an account?{' '}
                  <Text
                    style={[
                      styles.modalButtonText,
                      {color: Colors.ai_gray_900, fontSize: 14, fontWeight: '700'},
                    ]}>
                    Sign In
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',

  },
  profileCamera: {
    width: 22,
    height: 22,
    borderRadius: 17,
    backgroundColor: Colors.ai_gray_02,
    position: 'absolute',
    bottom: 5,
    right: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTxtPassword: {
    width: '80%',
    color: '#000',
  },
  errors: {
    fontSize: 12,
    color: 'red',
    marginLeft: 24,
  },
  logoImg: {
    width: 172,
    height: 80,
    tintColor: Colors.ai_gray_900,
    alignSelf: 'center',
  },
  SignInTitle: {
    fontFamily: AristaBold,
    color: 'rgba(21, 152, 149, 1.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  fields: {
    flexDirection: 'column',
    width: '90%',
  },
  InputSection: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SignInViaPhone: {
    fontFamily: AristaBold,
    color: white,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 35,
    textAlign: 'center',
  },
  countryCode: {
    width: '100%',
    height: 45,
    backgroundColor: '#F0F2F3',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: '#313131',
  },
  accountTxt: {
    color: '#313131',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Raleway-Medium',
    alignSelf: 'center',
  },
  countinueBtn: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(21, 152, 149, 1)',
    borderRadius: 24,
    marginBottom: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTxt: {color: white, fontSize: 16, fontWeight: '800'},
  checkbox: {
    alignSelf: 'center',
  },
  // country or phone start

  normalTxt: {
    color: '#313131',
    fontFamily: 'Inter-Regular',
    width: '88%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
    color: Colors.ai_gray_900,
  },
  staric: {
    fontSize: 12,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#113551',
    fontSize: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.ai_gray_900,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    position: 'absolute',
    bottom:0,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom:45,
    borderRadius: 10,
    alignItems: 'center',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 2,
    paddingHorizontal: 10,
    color: Colors.ai_gray_900,
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 40,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: Colors.ai_gray_900,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});