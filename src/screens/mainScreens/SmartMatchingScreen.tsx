import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Select from '../../components/Select';
import TopHeader from '../../components/TopHeader';
import {useSelector} from 'react-redux';
import {store, useAppDispatch} from '../../redux/store';
import {
  getCountries,
  getPortsByCountry,
} from '../../redux/Reducers/countriesPortsReducers';
import Loader from '../../components/Loaders/Loader';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import OtozBackground from '../../components/Backgrounds/OtozBackground';
import {Colors} from '../../utilis/Colors';
import OtozButton from '../../components/OtozButton';
import {getColors} from '../../redux/Reducers/filtersReducers';
import appServices from '../../app-services/appServices';
import {useNavigation} from '@react-navigation/native';
import {
  logoutUser,
  setExploreOnly,
  setProfileImg,
} from '../../redux/Reducers/userReducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SmartMatchingScreen = ({route}: any) => {
  const {lastCar} = route?.params || '';
  const navigation = useNavigation<any>();
  const {countries, ports} = useSelector((state: any) => state.countriesPorts);
  const [selectedCountry, setSelectedCountry] = useState<any>(
    lastCar?.exterior_color?.name || '',
  );
  const [selectedColor, setSelectedColor] = useState<any>(
    lastCar?.exterior_color?.name || '',
  );
  const [portsData, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState<any>('');
  const [sendingInquiry, setSendIng] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<any>('');
  const [showError, setShowError] = useState<boolean>(false);
  const {makers} = useSelector((state: any) => state.bodiesMakers);
  const {colors} = useSelector((state: any) => state.filters);
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [messageText, setMessageText] = useState<string>('');
  const [expireDate, setExpireDate] = useState<any>('10');
  const [selectedYear, setSelectedYear] = useState<any>();
  const [selectedYearMax, setSelectedYearMax] = useState<any>();
  const [selectedBrand, setSelectedBrand] = useState<any>();
  const [selectedMileage, setSelectedMileage] = useState<any>();
  const [selectedMileageMax, setSelectedMileageMax] = useState<any>();
  const [selectedPriceMin, setSelectedPriceMin] = useState<any>();
  const [selectedPriceMax, setSelectedPriceMax] = useState<any>();
  // const [isExpanded, setIsExpanded] = useState<any>(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1985; year <= currentYear; year++) {
    years.push({value: year.toString(), label: year.toString()});
  }

  const [modelsByBrand, setModels] = useState<any>([]);
  const [selectedModel, setSelectedModel] = useState<any>();
  const {user} = useSelector((state: any) => state.user);

  const mileageData: any = [];
  for (let mil = 0; mil <= 90000; ) {
    mil = mil + 3000;
    const km = new Intl.NumberFormat('en-US').format(mil) + ' km';
    mileageData.push({value: mil.toString(), label: km.toString()});
  }
  const priceData: any = [];
  for (let yen = 1000; yen <= 90000; ) {
    yen = yen + 1000;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(yen);
    priceData.push({value: yen.toString(), label: formatted.toString()});
  }

  const findClosestValues = (data: any, value: any) => {
    let closestSmaller = -Infinity;
    let secondClosestSmaller = -Infinity;
    let closestLarger = Infinity;
    let secondClosestLarger = Infinity;

    for (let i = 0; i < data.length; i++) {
      const dataValue = parseInt(data[i].value);
      if (dataValue <= value && dataValue > closestSmaller) {
        secondClosestSmaller = closestSmaller;
        closestSmaller = dataValue;
      }
      if (dataValue >= value && dataValue < closestLarger) {
        secondClosestLarger = closestLarger;
        closestLarger = dataValue;
      }
    }
    if (closestSmaller === -Infinity) closestSmaller = data[0].value;
    if (closestLarger === Infinity) closestLarger = data[data.length - 1].value;

    if (secondClosestSmaller === -Infinity)
      secondClosestSmaller = closestSmaller;
    if (secondClosestLarger === Infinity) secondClosestLarger = closestLarger;

    return {
      closestSmaller,
      secondClosestSmaller,
      closestLarger,
      secondClosestLarger,
    };
  };

  useEffect(() => {
    // console.log('lastCarrrrrrrrrrrrrrrrrrrrrrr')
    if (lastCar) {
      setModels([
        {
          value: lastCar?.model?.id,
          label: lastCar?.model?.name,
        },
      ]);

      setSelectedBrand({value: lastCar?.make?.id, label: lastCar?.make?.name});
      setSelectedModel({
        value: lastCar?.model?.id,
        label: lastCar?.model?.name,
      });
      const minYear = Math.max(1985, lastCar?.year - 2);
      const maxYear = Math.min(currentYear, lastCar?.year + 2);

      setSelectedYear({
        value: minYear.toString(),
        label: minYear.toString(),
      });
      setSelectedYearMax({
        value: maxYear.toString(),
        label: maxYear.toString(),
      });

      const {closestSmaller, closestLarger} = findClosestValues(
        mileageData,
        lastCar.mileage,
      );

      setSelectedMileage({
        value: closestSmaller.toString(),
        label: new Intl.NumberFormat('en-US').format(closestSmaller) + ' km',
      });

      setSelectedMileageMax({
        value: closestLarger.toString(),
        label: new Intl.NumberFormat('en-US').format(closestLarger) + ' km',
      });

      const {
        closestSmaller: closestPriceMin,
        secondClosestLarger: closestPriceMax,
      } = findClosestValues(priceData, lastCar?.price);

      if (closestPriceMin !== -Infinity && closestPriceMin !== Infinity) {
        setSelectedPriceMin({
          value: closestPriceMin.toString(),
          label: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(closestPriceMin),
        });
      }

      if (closestPriceMax !== -Infinity && closestPriceMax !== Infinity) {
        setSelectedPriceMax({
          value: closestPriceMax.toString(),
          label: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(closestPriceMax),
        });
      }
    }
  }, [lastCar]);

  useEffect(() => {
    if (user?.first_name) {
      setName(user.first_name);
    }
    setEmail(user?.email);
    if (lastCar?.exterior_color?.id) {
      setSelectedColor({value: lastCar?.exterior_color?.id});
    } else {
      setSelectedColor({value: colors[0]?.value});
    }
  }, [user?.first_name, user?.email, lastCar?.exterior_color?.name]);

  useEffect(() => {
    setPhone(user?.phone_no);
    console.log('user>>>>>>>>>>>>>', phone);
  }, [user]);

  const dispatch = useAppDispatch();
  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  // console.log('countries', countries);

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };

  const handleCountryChange = async () => {
    if (selectedCountry) {
      setPorts([]);
      setSelectedPort('');
      await dispatch(getPortsByCountry({selectedCountry}));
    }
  };

  useEffect(() => {
    // console.log('portssssssssssssss')
    if (ports?.length > 0) setPorts(ports);
  }, [ports]);

  useEffect(() => {
    handleCountryChange();
  }, [selectedCountry]);

  const handleBrandChange = async () => {
    // console.log('<<<>>>', modelsByBrand);
    if (selectedBrand) {
      // if (lastCar) return;
      setModels([]);
      // console.log('>>>>', selectedModel);
      // console.log(selectedBrand, '-------', selectedBrand);
      let maker_id = selectedBrand?.value
        ? selectedBrand?.value
        : selectedBrand;

      // await dispatch(getModelsByMakers({maker_id}));
      const mod = await appServices.getModelsByMakers(maker_id);
      // console.log('models', mod.models);
      // if (!lastCar) setSelectedModel('');
      setModels(mod.models);
    } else {
      console.log('here', selectedBrand);
    }
  };

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    console.log('selectedBrand', selectedBrand);
    // if (!lastCar) {
    handleBrandChange();
    // }
  }, [selectedBrand]);

  const findLabelByValue = (value: string, data: any[]) => {
    const item = data?.find(item => item.value == value);
    return item ? item?.label : '';
  };

  const daysData = [];
  const dayValues = [1, 2, 3, 5, 10];

  for (let i = 0; i < dayValues.length; i++) {
    daysData.push({
      value: `${dayValues[i]} Days`,
      label: `${dayValues[i]} Days`,
    });
  }

  // Requirement by QA Ends
  const submit = async () => {
    try {
      if (
        parseInt(selectedYearMax.value) < parseInt(selectedYear.value) ||
        parseInt(selectedMileageMax.value) < parseInt(selectedMileage.value) ||
        parseInt(selectedPriceMax.value) < parseInt(selectedPriceMin.value)
      ) {
        setVisible(true);
        setMessage('Maximum value cannot be less than minimum value.');
        return;
      }

      let body2 = {
        smart_matching: {
          demand_by: 'Customer',
          customer_name: name,
          color_id: selectedColor?.value ? selectedColor?.value : selectedColor,
          millage_from: selectedMileage?.value,
          millage_to: selectedMileageMax?.value,
          year_from: selectedYear?.value,
          year_to: selectedYearMax?.value,
          phone: phone,
          email: email,
          start_price: selectedPriceMin?.value,
          end_price: selectedPriceMax?.value,
          country_id: selectedCountry,
          port_id: selectedPort,
          status: 'Active',
          expires_in: expireDate,
          user_id: user?.id,
          make_id: selectedBrand?.value ? selectedBrand?.value : selectedBrand,
          model_id: selectedModel?.value ? selectedModel?.value : selectedModel,
        },
      };

      console.log(body2);
      setSendIng(true);

      const res = await appServices.addSmartInquiry(body2);

      setVisible(true);
      setMessage(
        `Otoz Ai is matching you with the ideal car. Stay tuned, we'll reach out soon!`,
      );
      setSendIng(false);
      console.log('Inquiry sent successfully');

      setTimeout(() => {
        navigation.navigate('Home');
      }, 3100);
    } catch (error: any) {
      console.log('Error:', error);

      if (error.response && error.response.status === 401) {
        console.log('here in unuth');
        setVisible(true);
        setMessage('Unauthorized. Please login to app again.');
        setTimeout(() => {}, 2000);
        store.dispatch(logoutUser(''));
        store.dispatch(setExploreOnly(false));
        store.dispatch(setProfileImg(''));
      } else {
        setVisible(true);
        const errorMessage = error.message || 'Inquiry not sent';
        console.log('else');
        setMessage(errorMessage);
      }
      setSendIng(false);
    }
  };

  const handleSubmit = () => {
    const emptyFields = [];

    const fields = {
      selectedPort,
      selectedCountry,
      // name: name?.trim(),
      // phone: phone?.trim(),
      // email: email && email.match(validRegex),
      selectedYearMax,
      selectedColor,
      selectedBrand: selectedBrand?.value
        ? selectedBrand?.value
        : selectedBrand,
      selectedModel: selectedModel?.value
        ? selectedModel?.value
        : selectedModel,
      selectedMileage,
      selectedMileageMax,
      selectedYear,
      selectedPriceMin,
      selectedPriceMax,
      expireDate,
    };

    // Check for empty fields
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        emptyFields.push(key); // Push field name if it is empty
      }
    }

    const isMaxValueLessThanMinValue =
      selectedPriceMin > selectedPriceMax ||
      selectedYear > selectedYearMax ||
      selectedMileage > selectedMileageMax;

    if (emptyFields.length > 0) {
      setShowError(true);
      console.log('Fields missing:', emptyFields.join(', '));
      setVisible(true);
      setMessage(`Please fill missing fields.`);
    } else if (isMaxValueLessThanMinValue) {
      setShowError(true);
      console.log('error', selectedModel);
      setVisible(true);
      setMessage('Maximum value cannot be less than minimum value.');
    } else {
      console.log('handleSubmit successfully', selectedModel);
      setShowError(false);
      submit();
    }
  };

  // const handleToggle = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <OtozBackground>
        <Loader visible={sendingInquiry} />
        <SimpleInfoModal
          visible={visible}
          message={message}
          onClose={() => setVisible(false)}
        />
        <TopHeader title={'Smart Matching'} />
        <ScrollView
          style={{
            paddingHorizontal: 10,
            backgroundColor: 'white',
            marginTop: 20,
            paddingVertical: 20,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}>
          <View style={{height: 10}}></View>
          <Text
            style={{
              fontSize: 18,
              color: Colors.ai_gray_900,
              fontWeight: '700',
            }}>
            Your Shortcut to the Perfect Car
          </Text>
          <Text style={{fontSize: 14, color: Colors.ai_gray_150}}>
            Skip the search - our AI finds the right car for you, fast and easy.
          </Text>
          {/* <View style={{}}>
          <View
            style={{
              height: 30,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.ai_gray_900,
                fontWeight: '700',
              }}>
              Customer Details
            </Text>
            <TouchableOpacity onPress={() => handleToggle}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/arrowdown.png')}
                style={{width: 18, height: 18, tintColor: Colors.ai_gray_900}}
              />
            </TouchableOpacity>
          </View>
          <TitleInput
            value={name}
            title="Customer Name:"
            onChange={value => setName(value)}
            placeholder={user?.first_name}
          />
          {!name.trim() && showError && <Error>name is required.</Error>}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              // backgroundColor: 'green',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '49%'}}>
              <TitleInput
                value={email}
                title="Email"
                keyboardType={'email-address'}
                onChange={value => setEmail(value)}
                placeholder={user?.email}
              />
              {!email && showError && <Error>email is required.</Error>}
              {email !== '' && !email.match(validRegex) && showError && (
                <Error>invalid email.</Error>
              )}
            </View>
            <View style={{width: '49%'}}>
              <TitleInput
                value={phone}
                title="Phone"
                keyboardType={'phone-pad'}
                onChange={phone => setPhone(phone)}
                placeholder={'Enter phone number'}
              />
              {phone.length > 10 && (
                <Error>Phone number cannot exceed 10 digits.</Error>
              )}
            </View>
          </View>
        </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 2,
              width: '100%',
            }}>
            <View style={{width: '49%'}}>
              <Select
                title="Make:"
                items={makers}
                selectedValue={selectedBrand?.value}
                onValueChange={value => {
                  console.log(value);
                  setSelectedBrand(value);
                }}
              />
              {!selectedBrand && showError && <Error>Make is required.</Error>}
            </View>
            <View style={{width: '49%', flexDirection: 'column'}}>
              {modelsByBrand.length > 0 && (
                <Select
                  title="Model:"
                  items={modelsByBrand}
                  selectedValue={selectedModel?.value}
                  onValueChange={(value: any) => {
                    console.log(value);
                    if (value === null) return;
                    setSelectedModel(value);
                  }}
                />
              )}
              {!selectedModel && showError && <Error>Model is required.</Error>}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 12,
              maxWidth: '100%',
            }}>
            <View style={{width: '49%', flexDirection: 'column'}}>
              <Select
                title="Mileage from:"
                items={mileageData}
                selectedValue={selectedMileage?.value}
                onValueChange={value => {
                  if (value) {
                    // console.log('.....milage', value);
                    setSelectedMileage({value: value, label: value});
                  }
                }}
              />
              {!selectedMileage && showError && (
                <Error>Min mileage is required.</Error>
              )}
            </View>
            <View style={{width: '49%', flexDirection: 'column'}}>
              {/* <Select
              title="To:"
              items={mileageData}
              selectedValue={selectedMileageMax?.value}
              onValueChange={(value: any) => {
                if (value) {
                  console.log('.....milageX', value);
                  setSelectedMileageMax({value: value, label: value});
                }
              }}
            /> */}
              <Select
                title="To:"
                items={
                  selectedMileage?.value
                    ? mileageData.filter(
                        (item: any) =>
                          parseInt(item.value) >=
                          parseInt(selectedMileage.value),
                      )
                    : mileageData
                }
                selectedValue={selectedMileageMax?.value}
                onValueChange={(value: any) => {
                  if (value) {
                    setSelectedMileageMax({value: value, label: value});
                  }
                }}
              />
              {!selectedMileageMax && showError && (
                <Error>Max mileage is required.</Error>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 12,
              maxWidth: '100%',
            }}>
            <View style={{width: '49%', flexDirection: 'column'}}>
              <Select
                title="Manufacture Year from:"
                items={years}
                selectedValue={selectedYear?.value}
                onValueChange={(value: string) => {
                  if (value) {
                    // console.log('yr===>', value);
                    setSelectedYear({value: value, label: value});
                  }
                }}
              />
              {!selectedYear && showError && (
                <Error>Min year is required.</Error>
              )}
            </View>
            <View style={{width: '49%', flexDirection: 'column'}}>
              {/* <Select
              title="To:"
              items={years}
              selectedValue={selectedYearMax?.value}
              onValueChange={(value: string) => {
                if (value) {
                  // console.log('yr===>', value);
                  setSelectedYearMax({value: value, label: value});
                }
              }}
            /> */}
              <Select
                title="To:"
                items={
                  selectedYear?.value
                    ? years.filter(
                        (item: any) =>
                          parseInt(item.value) >= parseInt(selectedYear.value),
                      )
                    : years
                }
                selectedValue={selectedYearMax?.value}
                onValueChange={(value: string) => {
                  if (value) {
                    setSelectedYearMax({value: value, label: value});
                  }
                }}
              />
              {!selectedYearMax && showError && (
                <Error>Max year is required.</Error>
              )}
            </View>
          </View>
          <Select
            title="Color:"
            items={colors}
            selectedValue={selectedColor?.value}
            onValueChange={(value: any) => {
              console.log(value);
              if (value === null) return;
              setSelectedColor(value);
            }}
          />
          {!selectedColor && showError && <Error>Color is required.</Error>}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 12,
              maxWidth: '100%',
            }}>
            <View style={{width: '49%', flexDirection: 'column'}}>
              <Select
                title="Price from:"
                items={priceData}
                selectedValue={selectedPriceMin?.value}
                onValueChange={value =>
                  setSelectedPriceMin({value: value, label: value})
                }
              />
              {!selectedPriceMin && showError && (
                <Error>Min price is required.</Error>
              )}
            </View>
            <View style={{width: '49%', flexDirection: 'column'}}>
              {/* <Select
              title="To:"
              items={priceData}
              selectedValue={selectedPriceMax?.value}
              onValueChange={value =>
                setSelectedPriceMax({value: value, label: value})
              }
            /> */}
              <Select
                title="To:"
                items={
                  selectedPriceMin?.value
                    ? priceData.filter(
                        (item: any) =>
                          parseInt(item.value) >=
                          parseInt(selectedPriceMin.value),
                      )
                    : priceData
                }
                selectedValue={selectedPriceMax?.value}
                onValueChange={value =>
                  setSelectedPriceMax({value: value, label: value})
                }
              />
              {!selectedPriceMax && showError && (
                <Error>Max price is required.</Error>
              )}
            </View>
          </View>

          {countries.length > 0 && (
            <Select
              title="Country:"
              items={countries}
              // selectedValue={selectedCountry}
              // onDonePress={handleCountryChange}
              onValueChange={(value: string) => {
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
              onValueChange={(value: string) => {
                setSelectedPort(value);
              }}
            />
          )}
          {!selectedPort && showError && <Error>Port is required.</Error>}
          <Select
            title="Expires In:"
            items={daysData}
            selectedValue={expireDate}
            onValueChange={value => setExpireDate(value)}
          />
          {!expireDate && showError && <Error>Expire date is required.</Error>}
          {/* <MultilineTextField
          title="Message:"
          value={messageText}
          onChangeText={message => setMessageText(message)}
        /> */}
          <View style={{alignSelf: 'center'}}>
            <OtozButton
              title={'Shoot'}
              icon={true}
              onClick={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </OtozBackground>
    </KeyboardAwareScrollView>
  );
};
export default SmartMatchingScreen;
const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
});
