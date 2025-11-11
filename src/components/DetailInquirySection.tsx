import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const DetailInquirySection = ({item}: any) => {
  // const navigation = useNavigation<any>();
  const [carData, setCarData] = useState<any>();
  const [inspection, setInspection] = useState<any>();
  const [freight, setFreight] = useState<any>();
  const [insurance, setInsurance] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [salePrice, setSalePrice] = useState<any>();
  // const {selectedInquiry} = useSelector((state: any) => state.user);
  // const [visible, setVisible] = useState<any>(false);
  // const [messageTxt, setMessageTxt] = useState<string>('');

  useEffect(() => {
    if (item) setCarData(item?.car);
    setInspection(carData?.inspection);
    setFreight(carData?.freight);
    setInsurance(carData?.insurance);
    setSalePrice(carData?.sale_price);
    // console.log('firstttttttttttttttt-item', item);
    // console.log('DetailInquirySection-selectedInquiry', car?.sale_price);
  }, []);

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
    return formatted;
  };

  useEffect(() => {
    // setVisible(true)
    // setMessageTxt('Please give us your feedback till the process of sending an inquiry to Otoz.Ai')
  }, []);

  const priceData = [
    // {label: 'Car Price', value: item.car_price ? `$${formattedNumber(item?.car_price)}` : '-'},
    {
      label: 'Car Price',
      value: item?.car?.sale_price ? `$${Number(item?.car?.sale_price).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '-'
    },
    {
      label: 'Incoterm',
      value: item?.invoice_term ? `${item?.invoice_term}` : '-',
    },
    {
      label: 'Inspection Charges',
      value: item?.inspection_charges ? `$${formattedNumber(item?.inspection_charges)}` : 'Not Included',
    },
    {label: 'M3 Size', value: carData?.m3 ? `${carData?.m3}` : '-'},
    {
      label: 'Freight',
      value: item?.freight_charges ? `$${formattedNumber(item?.freight_charges)}` : '-',
    },
    {
      label: 'Insurance',
      value: item?.insurance_charges ? `$${formattedNumber(item?.insurance_charges)}` : 'Not Included',
    },
    {
      label: 'Total Price',
      value: item?.total_invoice ? `$${formattedNumber(item?.total_invoice)}` : '-',
    },
  ];

  useEffect(() => {
    const carPrice = Number(item?.sale_price) || 0;
    const carInsurance = Number(carData?.insurance) || 0;
    const fare = Number(carData?.freight) || 0;
    const shipInspection = Number(carData?.inspection) || 0;
    console.log(fare);
    let totalPrice = Number(carPrice);

    if (insurance) {
      totalPrice += Number(carInsurance);
    }

    if (inspection) {
      totalPrice += Number(shipInspection);
    }

    if (freight) {
      totalPrice += fare;
    }
    setTotalPrice(totalPrice);

    // console.log('firstststt', totalPrice);
  }, [item]);

  const priceType = (carData?.price_type || '').toLowerCase();

  const onePercentOfRegularPrice = carData?.regular_price
    ? carData?.regular_price * 0.01
    : 0;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Price Overview
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
                  fontWeight: 'bold',
                  color: '#123652',
                  flex: 1,
                  fontSize: 14,
                  paddingTop: 10,
                  paddingLeft: 10,
                }}>
                {item.label}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: '#2E2E2E',
                paddingStart: 15,
                fontSize: 14,
                paddingTop: 10,
                paddingLeft: 10,
              }}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
      {/* <View
        style={{
          backgroundColor: '#EEEEEE',
          width: '50%',
          height: 40,
          borderColor: '#C3C3C3',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 10,
          alignItems: 'center',
          borderRadius: 15,
          alignSelf: 'center',
          marginBottom: 15,
          marginTop: 5,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: orange,
            fontWeight: 'bold',
            marginRight: 10,
          }}>
          {item?.invoice_term?.toUpperCase()} Price:
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.ai_gray_150,
            fontWeight: 'bold',
          }}>
          $ {formattedNumber(totalPrice + carData?.regular_price)}
        </Text>
      </View> */}
      <View
        style={{
          width: '90%',
          // height: 30,
          backgroundColor: '#1236521A',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
          Please discuss with OTOZ.Ai via chat to purchase / bid this car.
          Thanks
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          // height: 30,
          marginTop: 15,
          backgroundColor: '#CB212726',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 5,
        }}>
        <View
          style={{
            width: '90%',flexDirection:'row',  alignItems:'center', marginBottom:10
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/next_icn.png')}
            style={{width: 15, height: 13,}}
          />
          <Text style={{color: '#CB2127', fontSize: 14, fontWeight: '700', marginLeft:8}}>
            Next
          </Text>
        </View>
        <Text style={{color: '#CB2127', fontSize: 12, fontWeight: '400'}}>
          After finalizing the deal, please transfer the advance payment to our
          bank account. Details are provided in the second tab.
        </Text>
      </View>

      {/* <ReviewModal
        visible={visible ? true : false}
        showClose={false}
        messageTxt={messageTxt}
        onClose={() => setVisible(false)}
      /> */}
      <View style={{height: 50}}></View>
    </ScrollView>
  );
};

export default DetailInquirySection;

const styles = StyleSheet.create({
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
});
