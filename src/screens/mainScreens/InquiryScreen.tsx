import {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import MultilineTextField from '../../components/MultilineTextField';
import Select from '../../components/Select';
import TitleInput from '../../components/TitleInput';
import TopHeader from '../../components/TopHeader';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/store';
import {
  getCountries,
  getPortsByCountry,
} from '../../redux/Reducers/countriesPortsReducers';
import appServices from '../../app-services/appServices';
import Loader from '../../components/Loaders/Loader';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import {setMessageText} from '../../redux/Reducers/userReducers';
import ImageSlider from '../../components/ImageSlider';
import {Colors, orange, red, white} from '../../utilis/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import PrimaryButton from '../../components/PrimaryButton';

const InquiryScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const {countries, ports} = useSelector((state: any) => state.countriesPorts);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [portsData, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');
  const [sendingInquiry, setSendIng] = useState<boolean>(false);
  const [message, setMessage] = useState<any>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [messageTxt, setMessageTxt] = useState<any>('');
  const {user, messageText} = useSelector((state: any) => state.user);
  const [freight, setFreight] = useState<any>(false);
  const [inspection, setInspection] = useState<any>(false);
  const [insurance, setInsurance] = useState<any>(false);
  const [negotiatePrice, setNegotiatePrice] = useState<any>(false);
  const [shippingSchedule, setShippingSchedule] = useState<any>(false);
  const [carCondition, setCarCondition] = useState<any>(false);
  const [selectedCountryData, setSelectedCountryData] = useState<any>(null);
  const [dialCode, setDialCode] = useState<string>();
  const [country, setCountry] = useState<any>('');
  const [totalPrice, setTotalPrice] = useState<any>();
  const [fareNInspection, setFareNInspection] = useState<any>();

  const dispatch = useAppDispatch();
  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (user) {
      setName(user?.first_name);
      setEmail(user?.email);
      setPhone(user?.phone_no);
    }
  }, [user]);

  // useEffect(() => {
  //   console.log('item>>>>>>>>>>>>>>>>>>>>', item);
  // }, []);
  

  useEffect(() => {
    handleCountryChange();
    // console.log('handleCountryChange- call');
  }, [selectedCountry]);

  useEffect(() => {
    // console.log('messageTexttttttttttttttttttttttttttt', messageText);
    if (messageText) {
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };

  useEffect(() => {
    dispatch(getCountries());
    // console.log('countriessss123', countries);
    setCountry(countries);
    // console.log('Selected Country ID:', selectedCountry);
  }, []);

  useEffect(() => {
    if (insurance) {
      setTotalPrice(item?.sale_price + 100);
      // console.log('totalPriceeeeeeeeeeeeeeee', totalPrice);
    } else {
      console.log('error');
    }
  }, [insurance]);

  const handleCountryChange = async () => {
    if (selectedCountry) {
      const countryData = countries.find(
        (c: any) => Number(c.value) === Number(selectedCountry),
      );
      // console.log('countryData------', countryData);

      if (countryData) {
        // console.log('Selected Country Name:', countryData.label);
        // console.log('Selected Country Flag:', countryData.flag);
        // console.log('Selected Country Code:', countryData.country_code);

        setSelectedCountryData({
          flag: countryData.flag,
          dial_code: countryData.country_code,
          name: countryData.label,
        });

        setDialCode(countryData.country_code);
        // console.log('countryData.country_code', countryData.country_code);
      } else {
        console.warn('Country not found for value:', selectedCountry);
      }
      setPorts([]);
      setSelectedPort('');
      try {
        await dispatch(getPortsByCountry({selectedCountry}));
      } catch (error) {
        console.error('Error fetching ports:', error);
      }
    }
  };

  useEffect(() => {
    // console.log('portsssssssssss', ports);
    if (ports && ports.length > 0) {
      setPorts(ports);
    }
  }, [ports]);

  const findFareByPortId = (ports: any, portId: any) => {
    const port = ports.find((port: any) => port.value == portId);
    // console.log(port);
    return port ? port : null;
  };
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  // console.log('item?.insuranceeeeeee', item?.insurance);

  useEffect(() => {
    const carPrice = Number(item?.sale_price) || 0;
    const carInsurance = Number(item?.sale_price / 100) || 0;
    const fare = Number(fareNInspection?.fare) || 0;
    const shipInspection = Number(fareNInspection?.ship_inspection) || 0;
    // console.log(fare);
    let totalPrice = Number(carPrice);

    if (insurance) {
      totalPrice += Number(carInsurance);
    }

    if (inspection) {
      totalPrice += Number(shipInspection);
    }

    if (freight) {
      // console.log('here fare', fare, '__', totalPrice);

      totalPrice += fare;
      // console.log('here fare', fare, '__', totalPrice);
    }
    setTotalPrice(totalPrice);
  }, [inspection, freight, insurance]);

  const submit = async () => {
    // const port_name = findLabelByValue(selectedPort, portsData);
    // const country_name = findLabelByValue(selectedCountry, countries);
    let body = {
      name: name,
      phone: phone,
      email: email,
      car_id: item.id,
      inspection: inspection,
      insurance: insurance,
      port_id: selectedPort,
      country_id: selectedCountry,
      message: messageTxt,
    };
    // console.log(body);
    try {
      setSendIng(true);
      const res = await appServices.addInquiry(body);
      // console.log(res);
      //  setVisible(true);
      setMessage('Inquiry Sent!');
      setTimeout(() => {
        navigation?.goBack();
      }, 3000);
      setSendIng(false);
      setShowError(true);
    } catch (error: any) {
      console.log('....here error');
      setShowError(false);
      console.log(error.data.message[0]);
      setMessage(error.data.message[0]);
      setSendIng(false);
    }
  };

  const handleSubmit = () => {
    if (
      !selectedPort ||
      !selectedCountry ||
      !name?.trim() ||
      !phone?.trim() ||
      !email ||
      !email.match(validRegex)
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      submit();
    }
  };

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(number);
    return formatted;
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.ai_gray_900,
      }}>
      <SimpleInfoModal
        visible={message ? true : false}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />
      <Loader visible={sendingInquiry} />
      <TopHeader title={'Inquiry'} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 10,
            backgroundColor: white,
            marginTop: 20,
          }}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <ImageSlider images={item?.images} />
          <View
            style={{width: '100%', alignSelf: 'center', marginVertical: 20}}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {item?.make?.name} {item?.model?.name} {item?.year}
            </Text>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  color: Colors.ai_gray_900,
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {item?.year} {'|'} {item?.fuel_type?.name} {'|'}{' '}
                {formattedNumber(item?.mileage)} km {'|'}{' '}
                {formattedNumber(item?.engine_size)} cc {'|'}{' '}
                {item?.transmission}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
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
                <Text
                  style={{
                    color: '#113551',
                    fontSize: 14,
                    fontWeight: '400',
                    marginLeft: 10,
                  }}>
                  Stock ID. {item?.serial_code}
                </Text>
              </View>
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
              {/* <Text
                style={{
                  fontSize: 16,
                  color: Colors.ai_gray_900,
                  fontWeight: '500',
                  textDecorationLine: 'line-through',
                }}>
                  ${' '}
                  {formattedNumber(
                    item?.sale_price !== 0 &&
                      item?.regular_price > item?.sale_price
                      ? item?.sale_price
                      : item?.regular_price,
                  )}
              </Text> */}
            </View>
          </View>

          <TitleInput
            value={name}
            title="Name:"
            onChange={value => setName(value)}
          />
          {!name?.trim() && showError && <Error>Name is required.</Error>}
          <TitleInput
            value={email}
            title="Email:"
            keyboardType={'email-address'}
            onChange={value => setEmail(value)}
          />
          {!email && showError && <Error>Email is required.</Error>}
          {email !== '' && !email.match(validRegex) && showError && (
            <Error>invalid email.</Error>
          )}

          {countries.length > 0 && (
            <Select
              title="Country:"
              items={countries}
              // selectedValue={selectedCountry}
              // onDonePress={handleCountryChange}
              onValueChange={(value: string) => {
                setFareNInspection(null);
                setSelectedCountry(value);
              }}
            />
          )}
          {!selectedCountry && showError && <Error>Country is required.</Error>}
          {portsData.length > 0 && selectedCountry && (
            <Select
              title="Select Port:"
              items={portsData}
              // selectedValue={values.port}
              onValueChange={(value: any) => {
                setSelectedPort(value);
                // console.log(value);
                const fare = findFareByPortId(portsData, value);
                setFareNInspection(fare);
              }}
            />
          )}
          {!selectedPort && showError && <Error>Port is required.</Error>}

          {/* {!phone?.trim() && showError && <Error>Phone is required.</Error>}  */}
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
                {selectedCountryData ? (
                  <Image
                    resizeMode={'contain'}
                    source={{
                      uri: `https://otoz.ai/otozai-v2/flags/${selectedCountryData?.flag}`,
                    }}
                    style={{width: 28, height: 28}}
                  />
                ) : (
                  <Text
                    style={{
                      color: 'lightgray',
                      fontSize: 14,
                      fontFamily: 'Inter-Medium',
                    }}>
                    ---
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.input,
                  {width: '82%', flexDirection: 'row', alignItems: 'center'},
                ]}>
                {/* <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: 'gray',
                    paddingRight: 5,
                  }}>
                  <Text
                    style={{
                      color: selectedCountryData
                        ? Colors.ai_gray_900
                        : 'lightgray',
                      fontSize: 14,
                      fontFamily: 'Inter-Medium',
                    }}>
                    {selectedCountryData ? dialCode : '---'}
                  </Text>
                </View> */}
                <TextInput
                  placeholderTextColor={'lightgray'}
                  placeholder="123456789"
                  style={{color: Colors.ai_gray_900, marginLeft: 5}}
                  maxLength={15}
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
          {!validatePhoneNumber(phone) && showError && (
            <Error>Invalid phone number.</Error>
          )}

          {/* phone ends here */}

          <View
            style={{
              // backgroundColor: 'lightgray',
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontWeight: '600',
                width: 130,
              }}>
              Freight:
            </Text>
            <BouncyCheckbox
              isChecked={freight}
              disableText
              fillColor="#113551"
              size={25}
              useBuiltInState={false}
              onPress={(checked: boolean) => {
                // console.log('::Checked::', checked);
                console.log('::LocalChecked::', freight);
                setFreight(!freight);
              }}
            />
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                width: 100,
                textAlign: 'right',
              }}>
              ASK
            </Text>
            {/* } */}
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontWeight: '600',
                width: 130,
              }}>
              Inspection:
            </Text>
            <BouncyCheckbox
              isChecked={inspection}
              disableText
              fillColor="#113551"
              size={25}
              useBuiltInState={false}
              iconStyle={{borderColor: 'green'}}
              onPress={(checked: boolean) => {
                // console.log('::Checked::', checked);
                // console.log('::inspection::', inspection);
                setInspection(!inspection);
              }}
            />
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                width: 100,
                textAlign: 'right',
              }}>
              ASK
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontWeight: '600',
                width: 130,
              }}>
              Insurance:
            </Text>
            <BouncyCheckbox
              isChecked={insurance}
              disableText
              fillColor="#113551"
              size={25}
              useBuiltInState={false}
              iconStyle={{borderColor: 'green'}}
              onPress={(checked: boolean) => {
                // console.log('::Checked::', checked);
                // console.log('::LocalChecked::', insurance);
                setInsurance(!insurance);
              }}
            />
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                width: 100,
                textAlign: 'right',
              }}>
              ASK
              {/* $ {item?.regular_price/100} */}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontWeight: '600',
                width: 130,
              }}>
              Total Price:
            </Text>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              ASK
              {/* $ {formattedNumber(totalPrice)} */}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
              // backgroundColor:'red',
              width: '60%',
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontWeight: '600',
                // width: 150,
              }}>
              Vehicle Price:
            </Text>
            <Text
              style={{
                color: red,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              ${' '}
              {formattedNumber(
                item?.sale_price !== 0 && item?.regular_price > item?.sale_price
                  ? item?.sale_price
                  : item?.regular_price,
              )}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'lightgray',
              height: 2,
              marginVertical: 15,
            }}></View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <BouncyCheckbox
              isChecked={negotiatePrice}
              disableText
              fillColor="#113551"
              size={22}
              useBuiltInState={false}
              onPress={() => {
                setNegotiatePrice(!negotiatePrice);
                if (!negotiatePrice) {
                  setMessageTxt(
                    (message: any) =>
                      message + ' I want to negotiate the best price.',
                  );
                } else {
                  setMessageTxt((message: any) =>
                    message.replace(' I want to negotiate the best price.', ''),
                  );
                }
              }}
            />
            <Text
              style={{
                fontSize: 14,
                width: '90%',
                color: Colors.ai_gray_900,
              }}>
              I want to negotiate the best price.
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
              marginVertical: 15,
            }}>
            <BouncyCheckbox
              isChecked={shippingSchedule}
              disableText
              fillColor="#113551"
              size={22}
              useBuiltInState={false}
              onPress={() => {
                setShippingSchedule(!shippingSchedule);

                if (!shippingSchedule) {
                  setMessageTxt(
                    (message: any) =>
                      message + ' I want to know the shipping schedule.',
                  );
                } else {
                  setMessageTxt((message: any) =>
                    message.replace(
                      ' I want to know the shipping schedule.',
                      '',
                    ),
                  );
                }
              }}
            />
            <Text
              style={{
                fontSize: 14,
                width: '90%',
                color: Colors.ai_gray_900,
              }}>
              I want to know the shipping schedule.
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
              marginBottom: 15,
            }}>
            <BouncyCheckbox
              isChecked={carCondition}
              disableText
              fillColor="#113551"
              size={22}
              useBuiltInState={false}
              onPress={() => {
                setCarCondition(!carCondition);
                if (!carCondition) {
                  setMessageTxt(
                    (message: any) =>
                      message +
                      ' I want to know about the condition of the car.',
                  );
                } else {
                  setMessageTxt((message: any) =>
                    message.replace(
                      ' I want to know about the condition of the car.',
                      '',
                    ),
                  );
                }
              }}
            />
            <Text
              style={{
                fontSize: 14,
                width: '90%',
                color: Colors.ai_gray_900,
              }}>
              I want to know about the condition of the car.
            </Text>
          </View>

          <MultilineTextField
            title="Message:"
            value={messageTxt}
            onChangeText={message => setMessageTxt(message)}
          />
          <View style={{marginBottom: 30}}>
            <PrimaryButton
              onPress={handleSubmit}
              backgroundColor={Colors.ai_gray_900}
              width={'95%'}
              title={'Submit'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default InquiryScreen;
const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
  checkBoxWrapper: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
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
});