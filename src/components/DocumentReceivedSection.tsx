import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, orange, red, white} from '../utilis/Colors';
import RNFS from 'react-native-fs';
import appServices from '../app-services/appServices';
import {setMessageText} from '../redux/Reducers/userReducers';
import { useSelector } from 'react-redux';
import {useAppDispatch} from '../redux/store';
import SimpleInfoModal from './Modals/SimpleInfoModal';
import { useNavigation } from '@react-navigation/native';

const DocumentReceivedSection = ({item}: any) => {
  const [car, setCar] = useState<any>();
  const [invoice, setInvoice] = useState<any>(false);
  const [visible, setVisible] = useState<any>(false);
  const [messageTxt, setMessageTxt] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<any>();
  const [requestInvoice, setRequestInvoice] = useState<any>();
  const [inquiryId, setInquiryId] = useState<any>();
  const [message, setMessage] = useState<any>('');
  const {messageText} = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [sendingInquiry, setSendIng] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation();


  useEffect(() => {
    if (item) setCar(item?.car);
    // console.log(
    //   'item?.shipping?.document_received = ',
    //   item?.shipping?.document_received,
    // );
    // setFobInvoice(item?.shipping?.cnf_invoice)
    // console.log('shippingggggggggggggg', item.id);
    setInquiryId(item.id)

  }, [item]);

    useEffect(() => {
      // console.log('messageTexttttttttttttttttttttttttttt', messageText);
      if (messageText) {
        setMessage(messageText);
        setTimeout(() => {
          dispatch(setMessageText(''));
        }, 3000);
      }
    }, [messageText]);


  const handleReceived = () => {
    if (
      !inquiryId
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      submit();
    }
  };
  const submit = async () => {
    let body = {
      inquiry_id: inquiryId,
    };
    console.log(body);
    setSendIng(true);
    try {
      const res = await appServices.getDocument(body);
      setMessage('Documents Received!');
      setTimeout(() => {
        setSendIng(false);
        navigation?.goBack();
      }, 2000);

    } catch (error: any) {
      console.log('....here error');
      setShowError(false);
      const errorMessage = error?.response?.data?.message || 'Something went wrong.';
      console.log(errorMessage);
      setMessage(errorMessage);
      setSendIng(false);
    }
  };

  useEffect(() => {
    if (item?.shipping?.document_received === true) {
      setInvoice(true);
    } else {
      setInvoice(false);
    }
  }, []);

  // downloadCIFInvoice
  // const downloadCFInvoice = async (id: number, uid: number) => {
  //   const url = `https://otoz.ai/partner/advancepay/print.php?id=${id}&uid=${uid}`;
  //   const fileName = `advance-invoice-${id}.pdf`;
  //   const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         Alert.alert(
  //           'Permission denied',
  //           'Cannot download invoice without storage permission',
  //         );
  //         return;
  //       }
  //     }

  //     const result = await RNFS.downloadFile({
  //       fromUrl: url,
  //       toFile: path,
  //     }).promise;

  //     if (result.statusCode === 200) {
  //       Alert.alert('Download complete', `Saved to ${path}`);
  //     } else {
  //       Alert.alert('Download failed', `Status Code: ${result.statusCode}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert(
  //       'Error',
  //       'Something went wrong while downloading the invoice.',
  //     );
  //   }
  // };

  const downloadCIFInvoice = (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/cnf/print.php?id=${id}&uid=${uId}`;
    Linking.openURL(url).catch((err: any) =>
      console.error('An error occurred', err),
    );
    console.log('>>>>>>>>>>>>>>>>>C7F Invoice')
  };
  // downloadCNFInvoice
  const downloadCNFInvoice = (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/cnf/print.php?id=${id}&uid=${uId}`;
    Linking.openURL(url).catch((err: any) =>
      console.error('An error occurred', err),
    );
  };

  // downloadFOBInvoice
  const downloadFOBInvoice = (id: number, uId: number) => {
    const url = `https://otoz.ai/partner/cnf/print.php?id=${id}&uid=${uId}`;
    Linking.openURL(url).catch((err: any) =>
      console.error('An error occurred', err),
    );
  };

  // Export Certificate
  const downloadExport = async () => {
    const url = `https://otoz.ai/otozbi-v1/uploads/${item?.shipping?.export_certificate}`;
    const fileName = `export-certificate-${Date.now()}.pdf`;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    if (!url) {
      Alert.alert('Download failed', 'Invoice URL is not available.');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Cannot download invoice without storage permission',
          );
          return;
        }
      }

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: path,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download complete', `Saved to ${path}`);
      } else {
        Alert.alert('Download failed', `Status Code: ${result.statusCode}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Something went wrong while downloading the invoice.',
      );
    }
  };

    // downloadFOBInvoice
    const downloadExportInvoice = () => {
      const url = `https://otoz.ai/otozbi-v1/uploads/${item?.shipping?.export_certificate}`;
      Linking.openURL(url).catch((err: any) =>
        console.error('An error occurred', err),
      );
    };

  // BL Certificate
  const downloadBL = async () => {
    const url = `https://otoz.ai/otozbi-v1/uploads/${item?.shipping?.bl_copy}`;
    const fileName = `bl-copy-${Date.now()}.pdf`;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    if (!url) {
      Alert.alert('Download failed', 'Invoice URL is not available.');
      return;
    }
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Cannot download invoice without storage permission',
          );
          return;
        }
      }

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: path,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download complete', `Saved to ${path}`);
      } else {
        Alert.alert('Download failed', `Status Code: ${result.statusCode}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Something went wrong while downloading the invoice.',
      );
    }
  };

  // downloadInspection
  const downloadInspection = async () => {
    const url = `https://otoz.ai/otozbi-v1/uploads/${item?.shipping?.inspection_certificate}`;
    const fileName = `inspection-certificate-${Date.now()}.pdf`;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    if (!url) {
      Alert.alert('Download failed', 'Invoice URL is not available.');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Cannot download invoice without storage permission',
          );
          return;
        }
      }

      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: path,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download complete', `Saved to ${path}`);
      } else {
        Alert.alert('Download failed', `Status Code: ${result.statusCode}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Something went wrong while downloading the invoice.',
      );
    }
  };

  const handleRequest = () => {
    console.log('Handle request For download invoice');
    setRequestInvoice(true);
    setPaymentDetails(true);
  };

  const handleDHL = () => {
    Linking.openURL('https://www.dhl.com/jp-en/home.html').catch((err: any) =>
      console.error('An error occurred', err),
    );
  };

  const handleEMS = () => {
    Linking.openURL('https://otoz.ai/en').catch((err: any) =>
      console.error('An error occurred', err),
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Documents</Text>
      </View>
      <SimpleInfoModal
        visible={message ? true : false}
        message={message}
        showClose={false}
        onClose={() => setMessage('')}
      />

      {/* C&F Invoice Start */}

      <View style={styles.item}>
        <View style={styles.txtContainer}>
          <Text style={styles.normalTxt}>{item?.invoice_term} Invoice</Text>
        </View>
        <View style={styles.valueContainer}>
          <View style={styles.centeredColumn}>
            <View style={styles.invoiceActions}>
              <TouchableOpacity
                 onPress={() => {
                  if (item?.invoice_term === 'CIF') {
                    downloadCIFInvoice(item?.car?.id, item?.user_id);
                  } else if (item?.invoice_term === 'C&F') {
                    downloadCNFInvoice(item?.car?.id, item?.user_id);
                  } else if (item?.invoice_term === 'FOB') {
                    downloadFOBInvoice(item?.car?.id, item?.user_id);
                  } else {
                    console.warn('Unknown invoice term:', item?.invoice_term);
                  }
                }}
                style={styles.pdfIconBtn}>
                <Image
                  resizeMode="contain"
                  style={styles.pdfIcon}
                  source={require('../assets/icons/pdf.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (item?.invoice_term === 'CIF') {
                    downloadCIFInvoice(item?.car?.id, item?.user_id);
                  } else if (item?.invoice_term === 'C&F') {
                    downloadCNFInvoice(item?.car?.id, item?.user_id);
                  } else if (item?.invoice_term === 'FOB') {
                    downloadFOBInvoice(item?.car?.id, item?.user_id);
                  } else {
                    console.warn('Unknown invoice term:', item?.invoice_term);
                  }
                }}
                style={styles.downloadBtn}>
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* C&F Invoice Ends */}

      {/* Export Certificate Start */}

      <View style={styles.item}>
        <View style={styles.txtContainer}>
          <Text style={styles.normalTxt}>Export Certificate</Text>
        </View>

        <View style={styles.valueContainer}>
          <View style={styles.centeredColumn}>
            <View style={styles.invoiceActions}>
              <TouchableOpacity
                onPress={()=>downloadExportInvoice()}
                disabled={item?.shipping?.export_certificate === ''}
                style={[
                  styles.pdfIconBtn,
                  item?.shipping?.export_certificate === '' && styles.disabledBtn,
                ]}
                >
                <Image
                  resizeMode="contain"
                  style={styles.pdfIcon}
                  source={require('../assets/icons/pdf.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => downloadExport()}
                style={[
                  styles.downloadBtn,
                  item?.shipping?.export_certificate === '' && styles.disabledBtn,
                ]}>
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Export Certificate Ends */}

      {/* BL Copy Start */}

      <View style={styles.item}>
        <View style={styles.txtContainer}>
          <Text style={styles.normalTxt}>BL Copy</Text>
        </View>

        <View style={styles.valueContainer}>
          <View style={styles.centeredColumn}>
            <View style={styles.invoiceActions}>
              <TouchableOpacity
                onPress={handleRequest}
                disabled={item?.shipping?.bl_copy === ''}
                style={[
                  styles.pdfIconBtn,
                  item?.shipping?.bl_copy === '' && styles.disabledBtn,
                ]}>
                <Image
                  resizeMode="contain"
                  style={styles.pdfIcon}
                  source={require('../assets/icons/pdf.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => downloadBL()}
                disabled={item?.shipping?.bl_copy === ''}
                style={[
                  styles.downloadBtn,
                  item?.shipping?.bl_copy === '' && styles.disabledBtn,
                ]}
                >
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* BL Copy Ends */}

      {/* Inspection Certificate Start */}

      <View style={styles.item}>
        <View style={styles.txtContainer}>
          <Text style={styles.normalTxt}>Inspection Certificate</Text>
        </View>

        <View style={styles.valueContainer}>
          <View style={styles.centeredColumn}>
            <View style={styles.invoiceActions}>
              <TouchableOpacity
                onPress={handleRequest}
                // style={styles.pdfIconBtn}
                disabled={item?.shipping?.inspection_certificate === ''}
                style={[
                  styles.pdfIconBtn,
                  item?.shipping?.inspection_certificate === '' && styles.disabledBtn,
                ]}
                >
                <Image
                  resizeMode="contain"
                  style={styles.pdfIcon}
                  source={require('../assets/icons/pdf.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => downloadInspection()}
                // style={styles.downloadBtn}
                disabled={item?.shipping?.inspection_certificate === ''}
                style={[
                  styles.downloadBtn,
                  item?.shipping?.inspection_certificate === '' && styles.disabledBtn,
                ]}
                >
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Inspection Certificate Ends */}

      {invoice ? null : (
        <TouchableOpacity
          onPress={() => handleReceived()}
          style={{
            backgroundColor: Colors.ai_gray_900,
            width: '90%',
            height: 40,
            alignSelf: 'center',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: '800', fontSize: 16, color: white}}>
            Documents Received
          </Text>
        </TouchableOpacity>
      )}
      {invoice ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Dear{' '}
            <Text style={[styles.infoText, {fontWeight: '600'}]}>
              {item?.user_name}
            </Text>
            , it is inform you that you have received your documents
            successfully. Please let you know when you receive your car. Thank
            you for your feedback.
          </Text>
        </View>
      ) : null}
      {invoice?null:<View
        style={{
          width: '90%',
          // height: 30,
          marginTop: 15,
          // backgroundColor: '#CB212726',
          backgroundColor: '#ffe69c',
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
            tintColor={Colors.ai_gray_900}
            source={require('../assets/icons/next_icn.png')}
            style={{width: 15, height: 13,}}
          />
          <Text
            style={{
              color: Colors.ai_gray_900,
              fontSize: 14,
              fontWeight: '700',
              marginLeft: 8,
            }}>
            Next
          </Text>
        </View>
        <Text style={{color: Colors.ai_gray_900, fontSize: 12, fontWeight: '400'}}>
          If you have received your original documents, please click the
          <Text style={{color: Colors.ai_gray_900, fontSize: 12, fontWeight: '700'}}>
            {' '}
            "Document Received"{' '}
          </Text>
          button.
        </Text>
      </View>}

      <Text
        style={{
          color: Colors.ai_gray_900,
          width: '90%',
          alignSelf: 'center',
          fontWeight: '700',
          fontSize: 14,
          marginTop: 10,
        }}>
        Courier Details
      </Text>
      <View style={styles.trackingContainer}>
        <Text style={styles.trackingText}>
          * We dispatch orignal documents by{' '}
          <Text onPress={() => handleDHL()} style={styles.linkText}>
            DHL
          </Text>{' '}
          or{' '}
          <Text onPress={() => handleEMS()} style={styles.linkText}>
            EMS.{' '}
          </Text>
          Should you have preference please contact us.
        </Text>
      </View>

      <View style={{height: 70}} />
    </ScrollView>
  );
};

export default DocumentReceivedSection;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#173B5E',
    width: '90%',
    alignSelf: 'center',
    padding: 12,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  item: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
  },
  txtContainer: {
    backgroundColor: '#F3F5F6',
    width: '50%',
    justifyContent: 'center',
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderColor: 'gray',
  },
  normalTxt: {
    fontWeight: 'bold',
    color: '#123652',
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 10,
  },
  valueContainer: {
    width: '50%',
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },
  centeredColumn: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  invoiceActions: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 40,
    width: '100%',
    marginTop: 5,
  },
  pdfIconBtn: {
    width: 25,
    height: 25,
  },
  pdfIcon: {
    width: 20,
    height: 20,
  },
  downloadBtn: {
    width: '60%',
    height: 30,
    backgroundColor: Colors.ai_gray_900,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: white,
    textAlign: 'center',
  },
  receivedBtnContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
  },
  trackingContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  trackingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#123652',
    textAlign: 'left',
    width: '99%',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: red,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  infoBox: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#27914726',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#279147',
    textAlign: 'left',
    width: '100%',
  },
  confirmationBox: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    // backgroundColor: Colors.ai_gray_02,
  },
  confirmationText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#123652',
    textAlign: 'left',
    width: '90%',
  },
  disabledBtn: {
    opacity: 0.5, // or any styling you prefer for disabled state
  }
});
