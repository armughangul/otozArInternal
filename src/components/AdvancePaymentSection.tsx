import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Modal,
  PermissionsAndroid,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, orange, white} from '../utilis/Colors';
import DocumentPicker from "@react-native-documents/picker";
import ImageZoom from 'react-native-image-pan-zoom';
import RNFS from 'react-native-fs';
import appServices from '../app-services/appServices';
import SimpleInfoModal from './Modals/SimpleInfoModal';
import { useNavigation } from '@react-navigation/native';

const AdvancePaymentSection = ({item}: any) => {
  const [invoice, setInvoice] = useState<any>('');
  const [advance, setAdvance] = useState<any>();
  const [advancePayable, setAdvancePayable] = useState<any>();
  const [remainingAmount, setRemainingAmount] = useState<any>();
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [carId, setCarId] = useState<any>();
  const [advanceData, setAdvanceData] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const [hideUpload, setHideUpload] = useState<any>();
  const navigation = useNavigation();

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number);
    return formatted;
  };

  useEffect(() => {
    if (!item) return;
    setCarId(item.car?.id);

    const advancePercentage = parseFloat(item.advance_percentage) || 0;
    const carPrice = parseFloat(item.total_invoice) || 0;
    const advanceInvoice = (advancePercentage / 100) * carPrice;
    const totalAmount = Array.isArray(item.receives)
      ? item.receives.reduce((sum: any, i: any) => sum + i.amount, 0)
      : 0;

    setAdvance(totalAmount);
    setAdvancePayable(advanceInvoice);

    const remainingAdvance = carPrice - totalAmount;
    // remaining advance to pay

    // console.log('Total Advance Received:', item?.payments[0]?.status);
    // console.log('Advance Expected:', advanceInvoice);
    // console.log('Remaining Advance Payable:', remainingAdvance);
    setRemainingAmount(remainingAdvance);
  }, [item]);

  const priceData = [
    {
      label: 'Total Payable',
      value: item?.total_invoice
        ? `$${formattedNumber(item?.total_invoice)}`
        : '-',
    },
    ...(advance !== 0
      ? []
      : [
          {
            label: 'Advance Payable',
            value: `$${Number(advancePayable).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`,
          },
        ]),
    {
      label: 'Paid Amount',
      value: item
        ? `$${Number(advance).toLocaleString(undefined, {maximumFractionDigits: 0})}`
        : '$0',
    },
    {
      label: 'Remaining Payable',
      value: item
        ? `$${Number(remainingAmount).toLocaleString(undefined, {maximumFractionDigits: 0})}`
        : '-',
    },
    // {label: 'Invoice', value: '-'},
  ];

  const advanceInvoice = async (
    file: any,
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
      const response = await appServices.addAdvance(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('API success:', response.success);
      setAdvanceData(response);
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
  
      const response = await advanceInvoice(selectedFile, selectedCarId);
      setHideUpload(false)
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
      if (response?.success) {
        setHideUpload(false)
        // Alert.alert('Success', 'Document uploaded successfully!');
        setMessage('Advance Invoice uploaded successfully!')
        navigation.goBack();
      } else {
        // Alert.alert('Upload Failed', 'Something went wrong, please try again.');
        console.log('Upload Failed', 'Something went wrong, please try again.')
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Picker cancelled:', error);
      } else {
        console.log('Picker error:', error);
        Alert.alert('Error', 'Failed to upload document.');
      }
    }
  };

  // const handleUploadBankReceipt = async () => {
  //   try {
  //     const doc = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
  //     });

  //     const selectedFile = doc[0];
  //     const selectedCarId = item.car?.id;

  //     console.log(
  //       'Uploading Invoice:',
  //       selectedFile.name,
  //       'Car ID:',
  //       selectedCarId,
  //     );

  //     await advanceInvoice(selectedFile, selectedCarId);
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log('Picker cancelled:', error);
  //     } else {
  //       console.log('Picker error:', error);
  //     }
  //   }
  // };


  

  // print-Invoice
  const handlePrintRequest = (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/advancepay/print.php?id=${id}&uid=${uId}`;
    Linking.openURL(url).catch((err: any) =>
      console.error('An error occurred', err),
    );
  };


  const downloadInvoice = async (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/advancepay/print.php?id=${id}&uid=${uId}`;
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
        setMessage('Advance Invoice downloaded successfully!')

      } else {
        setMessage('Error, Failed to download invoice.')
      }
    } catch (error) {
      console.error('Download error:', error);
      setMessage('Error, An error occurred while downloading the invoice.')
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SimpleInfoModal
        visible={message ? true : false}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />

      {/* Download Advance Invoice Starts */}

      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={400}
              imageHeight={500}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                source={require('../assets/Invoice-Preview.png')}
              />
            </ImageZoom>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'gray',
              }}></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Payment Detail
        </Text>
      </View>
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
                // flexWrap: 'wrap',
                borderRightWidth: 0.2,
                borderColor: 'lightgray',
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
            <View
              // onPress={() => setModalVisible(!modalVisible)}
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
                  {/* <Image
                    style={{width: 28, height: 28, tintColor: orange}}
                    source={require('../assets/icons/view.png')}
                  /> */}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    Advance Invoice
                  </Text>
                </View>
              </ImageBackground>
            </View>
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

      {/*  Advance Invoice Start here */}
      {item?.receives[0]?.amount === undefined &&
      item?.payments[0]?.status === undefined || hideUpload ? (
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
              Advance Invoice
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
                    // marginBottom: 10,
                  }}>
                  (pdf, jpg & png)
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {/* Advance Invoice Ends here  */}
      {item?.receives[0]?.status === 1 ? (
        <View
          style={{
            width: '90%',
            // height: 30,
            backgroundColor: '#27914726',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 3,
            marginTop: 15,
          }}>
          <Text style={{color: '#279147', fontSize: 12, fontWeight: '400'}}>
            Hi{' '}
            <Text style={{color: '#279147', fontSize: 12, fontWeight: '700'}}>
              {item?.user_name}!
            </Text>
            , Thank you very much. We've received your advance payment in our
            account. We appreciate your trust in Otoz.Ai.
          </Text>
        </View>
      ) : null}

      {item?.receives[0]?.status === 1 ? null : (
        <View
          style={{
            width: '90%',
            // height: 30,
            backgroundColor: '#ffe69c',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 3,
            marginTop: 15,
          }}>
          {item?.payments[0]?.status === 'pending' ? (
            <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
              Your{' '}
              <Text style={{color: '#123652', fontSize: 12, fontWeight: '700'}}>
                Advance Payment Receipt
              </Text>
              , has been uploaded successfully. Otoz.Ai will review the uploaded
              bank receipt and verify the payment in the company’s bank account.
              You will be updated accordingly. Thank you!
            </Text>
          ) : (
            <Text style={{color: '#123652', fontSize: 12, fontWeight: '400'}}>
              Hi{' '}
              <Text style={{color: '#123652', fontSize: 12, fontWeight: '700'}}>
                {item?.user_name}
              </Text>
              , Pay advance amount in our bank account and upload bank receipt
              here.
            </Text>
          )}
        </View>
      )}

      {/* Download Advance Invoice Ends */}
      <View style={{height: 70}} />
    </ScrollView>
  );
};

export default AdvancePaymentSection;

const styles = StyleSheet.create({
  smallImage: {
    width: 100,
    height: 100,
  },
  largeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
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
