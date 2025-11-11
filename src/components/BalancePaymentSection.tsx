import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DocumentPicker from "@react-native-documents/picker";
// import DocumentPicker from 'react-native-document-picker';
import {Colors, orange, white} from '../utilis/Colors';
import RNFS from 'react-native-fs';
import appServices from '../app-services/appServices';
import {useNavigation} from '@react-navigation/native';
import SimpleInfoModal from './Modals/SimpleInfoModal';

const BalancePaymentSection = ({item}: any) => {
  const [car, setCar] = useState<any>();
  const [carData, setCarData] = useState<any>();
  const [remainingAmount, setRemainingAmount] = useState<any>();
  const [advance, setAdvance] = useState<any>();
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [requestInvoice, setRequestInvoice] = useState<any>();
  const [advanceData, setAdvanceData] = useState<any>();
  const navigation = useNavigation();
  const [message, setMessage] = useState<any>('');

  useEffect(() => {
    if (item) setCar(item?.car);
    const carPrice = parseFloat(item?.total_invoice);
    const totalAmount = item.receives.reduce(
      (sum: any, item: any) => sum + item.amount,
      0,
    );
    setAdvance(totalAmount);
    const remainingPayable = carPrice - totalAmount;
    setRemainingAmount(remainingPayable);
    // console.log('firstttttttttttttttt-item', remainingPayable);
  }, [item]);

  useEffect(() => {
    if (item) setCarData(item?.car);
    // console.log('firstttttttttttttttt-item', item);
  }, []);

  const handleRequest = () => {
    console.log('Handle request For download invoice');
    setRequestInvoice(true);
    setPaymentDetails(true);
  };

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
    return formatted;
  };

  const handlePrintRequest = (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/cnf/print.php?id=${id}&uid=${uId}`;
    Linking.openURL(url).catch((err: any) =>
      console.error('An error occurred', err),
    );
  };

  const downloadInvoice = async (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/cnf/print.php?id=${id}&uid=${uId}`;
    const fileName = `invoice_${id}_${uId}.pdf`;
    const downloadDest =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      const options = {
        fromUrl: url,
        toFile: downloadDest,
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        console.log('File saved to:', downloadDest);

        // Alert.alert('Advance Invoice', 'Invoice downloaded successfully!');
        setMessage('Balance invoice downloaded successfully!');
      } else {
        // Alert.alert('Error', 'Failed to download invoice.');
        setMessage('Error, Failed to download invoice.');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'An error occurred while downloading the invoice.');
    }
  };

  const balanceInvoice = async (
    file: DocumentPickerResponse,
    carId: number,
  ) => {
    const formData = new FormData();
    formData.append('receipt_file_path', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });
    formData.append('car_id', carId.toString());

    try {
      const response = await appServices.addBalance(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('API success:', response);
      setMessage('Balance invoice uploaded successfully!');
      setAdvanceData(response);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        console.log('API Error:', error.response);
        throw error.response;
      } else {
        console.log('Unknown Error:', error);
        throw error;
      }
    }
  };

  const handleUploadBankReceipt = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const selectedFile = doc[0];
      const selectedCarId = item.car?.id;

      console.log(
        'Uploading Invoice:',
        selectedFile.name,
        'Car ID:',
        selectedCarId,
      );

      await balanceInvoice(selectedFile, selectedCarId);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Picker cancelled:', error);
      } else {
        console.log('Picker error:', error);
      }
    }
  };

  const priceData = [
    {
      label: 'Total Payable',
      value: item?.total_invoice
        ? `$${formattedNumber(item?.total_invoice)}`
        : '-',
    },
    {
      label: 'Paid Amount',
      value: advance
        ? `$${Number(advance).toLocaleString(undefined, {maximumFractionDigits: 0})}`
        : '0',
    },
    {
      label: 'Remaining Payable',
      value: item
        ? `$${Number(remainingAmount).toLocaleString(undefined, {maximumFractionDigits: 0})}`
        : '-',
    },
  ];

  return (
    <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Payment Detail
        </Text>
      </View>
      <SimpleInfoModal
        visible={message ? true : false}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />
      <View
        style={{
          backgroundColor: '#fff',
          width: '90%',
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderColor: '#E9E9E9',
          // marginBottom: 15,
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
                borderWidth: 0.2,
                borderLeftColor: '#E9E9E9',
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
                color:
                  item.label === 'Paid Amount'
                    ? 'green'
                    : item.label === 'Remaining Payable'
                      ? 'red'
                      : '#2E2E2E',
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
      {/* Invoice Start here  */}
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          flexDirection: 'row',
          // backgroundColor:'lightgreen',
        }}>
        <View
          style={{
            backgroundColor: '#F3F5F6',
            width: '50%',
            // height: 40,
            justifyContent: 'center',
            // flexWrap: 'wrap',
            borderRightWidth: 0.2,
            borderBottomWidth: 0.2,
            borderLeftWidth: 0.2,
            borderColor: 'gray',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#123652',
              fontSize: 14,
              paddingTop: 10,
              paddingLeft: 10,
              // width: 130,
              // backgroundColor: 'red',
            }}>
            Invoice
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            width: '50%',
            borderRightWidth: 0.2,
            borderBottomWidth: 0.2,
            borderColor: 'gray',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              // width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                width: 80,
                height: 100,
              }}>
              <ImageBackground
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                // {enlarged ? styles.largeImage : styles.smallImage}
                source={require('../assets/Invoice-Preview.png')}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    Balance Invoice
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                // marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => handlePrintRequest(item?.car?.id, item?.user_id)}
                style={{
                  width: '44%',
                  height: 30,
                  backgroundColor: Colors.ai_gray_900,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: white,
                    textAlign: 'center',
                  }}>
                  Print
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadInvoice(item?.car?.id, item?.user_id)}
                style={{
                  width: '44%',
                  height: 30,
                  backgroundColor: Colors.ai_gray_900,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: white,
                    textAlign: 'center',
                  }}>
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Invoice Ends here */}

      {/*  Balance Invoice Start here */}

      {/* {(item?.receives[1]?.amount === 0 || item?.receives[1]?.amount === undefined) &&
item?.shipping?.shipping_emails[2]?.type === 'customer' ? (
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            flexDirection: 'row',
            // backgroundColor:'lightgreen',
          }}>
          <View
            style={{
              backgroundColor: '#F3F5F6',
              width: '50%',
              // height: 40,
              justifyContent: 'center',
              // flexWrap: 'wrap',
              borderRightWidth: 0.2,
              borderBottomWidth: 0.2,
              borderLeftWidth: 0.2,
              borderColor: 'gray',
              borderTopWidth: 0.2,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#123652',
                fontSize: 14,
                paddingTop: 10,
                paddingLeft: 10,
              }}>
              Balance Invoice
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: '50%',
              borderRightWidth: 0.2,
              borderBottomWidth: 0.2,
              borderColor: 'gray',
            }}>
            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'column',
                justifyContent: 'center',
                // width: '100%',
              }}>
              <View
                style={{
                  marginVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleUploadBankReceipt()}
                  style={{
                    // width: '10%',
                    height: 30,
                    backgroundColor: orange,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#000',
                      textAlign: 'center',
                      paddingHorizontal: 10,
                    }}>
                    Upload Bank Receipt
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    width: '70%',
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'center',
                    // marginBottom: 10,
                  }}>
                  (pdf, jpg & png)
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null} */}
      {(item?.receives[1]?.amount === 0 ||
        item?.receives[1]?.amount === undefined) &&
      item?.shipping?.shipping_emails[2]?.type === 'customer' &&
      item?.payments[1]?.status !== 'pending' &&
      item?.payments[1]?.status !== 'verified' ? (
        <View style={{alignSelf: 'center', width: '90%', flexDirection: 'row'}}>
          {/* Balance Invoice Left */}
          <View
            style={{
              backgroundColor: '#F3F5F6',
              width: '50%',
              justifyContent: 'center',
              borderRightWidth: 0.2,
              borderBottomWidth: 0.2,
              borderLeftWidth: 0.2,
              borderTopWidth: 0.2,
              borderColor: 'gray',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#123652',
                fontSize: 14,
                paddingTop: 10,
                paddingLeft: 10,
              }}>
              Balance Invoice
            </Text>
          </View>

          {/* Balance Invoice Right */}
          <View
            style={{
              width: '50%',
              borderRightWidth: 0.2,
              borderBottomWidth: 0.2,
              borderColor: 'gray',
            }}>
            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  marginVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleUploadBankReceipt()}
                  style={{
                    height: 30,
                    backgroundColor: Colors.ai_gray_900,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: white,
                      textAlign: 'center',
                      paddingHorizontal: 10,
                    }}>
                    Upload Bank Receipt
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    width: '70%',
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'center',
                  }}>
                  (pdf, jpg & png)
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {/* Balance Invoice Ends here  */}

      <View
        style={{
          width: '90%',
          // height: 30,
          backgroundColor:
            item?.receives[1]?.amount === 0 ||
            item?.receives[1]?.amount === undefined
              ? '#ffe69c'
              : '#27914726',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 3,
          marginTop: 15,
        }}>
        {item?.receives[1]?.amount === 0 ||
        item?.receives[1]?.amount === undefined ? (
          <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
            Hi{' '}
            <Text style={{color: '#123652', fontSize: 12, fontWeight: '700'}}>
              {item?.user_name}
            </Text>
            , Please pay your balance amount as per invoice to receive original
            documents.
          </Text>
        ) : (
          <Text style={{color: '#279147', fontSize: 12, fontWeight: '400'}}>
            Hi{' '}
            <Text style={{color: '#279147', fontSize: 12, fontWeight: '700'}}>
              {item?.user_name}
            </Text>
            , You have paid the complete balance amount for this car.
          </Text>
        )}
      </View>

      {/* Download Advance Invoice Ends */}
      {/* <View
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
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/next_icn.png')}
            style={{width: 15, height: 13}}
          />
          <Text
            style={{
              color: '#CB2127',
              fontSize: 14,
              fontWeight: '700',
              marginLeft: 8,
            }}>
            Next
          </Text>
        </View>
        <Text style={{color: '#CB2127', fontSize: 12, fontWeight: '400'}}>
          After finalizing the deal, please transfer the balance payment to our
          bank account. Details are provided in the current tab.
        </Text>
      </View> */}
      {/* <ReviewModal
          visible={visible2 ? true : false}
          showClose={false}
          messageTxt={messageTxt}
          onClose={() => setVisible2(false)}
        /> */}
      <View style={{height: 70}} />
    </ScrollView>
  );
};

export default BalancePaymentSection;

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
});
