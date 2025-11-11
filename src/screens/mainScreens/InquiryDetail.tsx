import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import OtozBackground from '../../components/Backgrounds/OtozBackground';
import TopHeader from '../../components/TopHeader';
import {Colors, white} from '../../utilis/Colors';
import PurchaseJourneyTabs from '../../components/PurchaseJourneyTabs';
import DetailInquirySection from '../../components/DetailInquirySection';
import Loader from '../../components/Loaders/Loader';
import AdvancePaymentSection from '../../components/AdvancePaymentSection';
import BalancePaymentSection from '../../components/BalancePaymentSection';
import DocumentReceivedSection from '../../components/DocumentReceivedSection';
import CarReceivedSection from '../../components/CarReceivedSection';
import ReviewModal from '../../components/Modals/ReviewModal';
import ConsigneeSection from '../../components/ConsigneeSection';

interface Props {
  item: any;
}
export default function InquiryDetail({route}: any) {
  const {inquiry} = route.params;
  const [car, setCar] = useState<any>();
  const [visible, setVisible] = useState<any>(false);
  const [messageTxt, setMessageTxt] = useState<string>('');
  
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1985; year <= currentYear; year++) {
    years.push({value: year.toString(), label: year.toString()});
  }

  const [activeTab, setActiveTab] = useState<string>('Advance');
  const {loading} = useSelector((state: any) => state.user);

  useEffect(() => {
    if (inquiry) {
      setCar(inquiry);
  
      const isAdvancePaid = !!inquiry?.receives?.[0]?.amount;
      const hasConsigneeDetails = !!inquiry?.consignee_details;
      const isSecondPaymentDone = !!inquiry?.receives?.[1]?.amount;
      const isDocumentReceived = !!inquiry?.shipping?.document_received;
      const isCarReceived = !!inquiry?.shipping?.car_received;
  
      if (!isAdvancePaid) {
        setActiveTab('Advance');
      } else if (!hasConsigneeDetails) {
        setActiveTab('Consignee');
      } else if (isCarReceived || isDocumentReceived) {
        setActiveTab('Recived');
      } else if (isSecondPaymentDone) {
        setActiveTab('Document');
      } else {
        setActiveTab('Balance');
      }
    }
  }, [inquiry]);
  
  

  const formattedNumber = (number: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
    return formatted;
  };

  const handleFeedbackSubmit = () => {
    console.log('feedback submited');
  };

  const isAdvancePaid = () => {
    return inquiry?.receives?.[0]?.amount !== 0;
  };
  const isConsigneeDetail = () => {
    return inquiry?.consignee_details !== null;
  };

  const isTabDisabled = (tabName: string) => {
    if (tabName === 'Consignee' || tabName === 'Balance' || 
        tabName === 'Document' || tabName === 'Recived') {
      return !isAdvancePaid();
    }
    return false;
  };
  const isConsigneeNull = (tabName: string) => {
    if ( tabName === 'Balance' || 
        tabName === 'Document' || tabName === 'Recived') {
      return !isConsigneeDetail();
    }
    return false;
  };

  return (
    <OtozBackground>
      <TopHeader title={'Purchase Journey'} />
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#E9E9E9',
            marginBottom: 20,
            backgroundColor: white,
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '100%',
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}>
            <View
              style={{
                width: '100%',
                marginBottom: 20,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  resizeMode="cover"
                  source={{
                    uri: car?.car?.images[0]?.thumbnail,
                  }}
                  style={{
                    width: '100%',
                    height: 252,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: 158,
                      height: 30,
                      backgroundColor: '#F6BB3B',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderTopLeftRadius: 5,
                      justifyContent: 'center',
                      alignSelf: 'flex-start',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/otoz-dark-logo.png')}
                      style={{width: 60, height: 14}}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#123652',
                        marginLeft: 5,
                      }}>
                      Certified
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#2E2E2E',
                fontWeight: '500',
                marginVertical: 10,
              }}>
              {car?.car?.make_name} {car?.car?.model_name} {'\n'}
              {car?.car?.year}
              {car?.car?.month_id ? '/' : ' '}
              {car?.car?.month_id}
            </Text>
            {/* <ImageBackground
              resizeMode="contain"
              source={require('../../assets/icons/msg-count-icn.png')}
              style={{
                width: 22,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: white,
                  fontWeight: '600',
                  marginBottom: 3,
                }}>
                {car?.unread_chat_count}
              </Text>
            </ImageBackground> */}
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              marginBottom: 15,
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {/* Year & Month */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/calendar.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '400'}}>
                {car?.car?.year}
                {car?.car?.month_id ? '/' : ' '}
                {car?.car?.month_id}
              </Text>
            </View>

            {/* Mileage */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/Mileage.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '400'}}>
                {formattedNumber(car?.car?.mileage)} km
              </Text>
            </View>

            {/* Fuel Type */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/fuelicon.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '400'}}>
                {car?.car?.fuel_type?.name}
              </Text>
            </View>

            {/* Engine Size */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/engine-drawer-ic.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '400'}}>
                {formattedNumber(car?.car?.engine_size)} cc
              </Text>
            </View>

            {/* Transmission */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={require('../../assets/icons/transmissionicon.png')}
                style={{width: 12, height: 12, marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '400'}}>
                {car?.car?.transmission}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 10,
              paddingStart: 15,
            }}>
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: '#F6BB3B40',
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
              }}>
              <Text style={{color: '#2E2E2E', fontSize: 12, fontWeight: '600'}}>
                {car?.car?.type?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: '#12365226',
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                marginLeft: 10,
              }}>
              <Text style={{color: '#2E2E2E', fontSize: 12, fontWeight: '600'}}>
                Stock No. {car?.car?.id}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#CB2127',
                fontWeight: '600',
              }}>
              ${formattedNumber(car?.car?.sale_price)}
            </Text>
            {/* {car?.car?.regular_price - car?.car?.sale_price > 2 && (
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.ai_gray_900,
                    fontWeight: '500',
                    textDecorationLine: 'line-through',
                  }}>
                  $ {formattedNumber(car?.car?.regular_price)}
                </Text>
              )} */}
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'lightgray',
            width: '100%',
            height: 80,
            justifyContent: 'center',
            // paddingBottom: 30,
            // marginBottom: 20,
          }}>
          <PurchaseJourneyTabs setActiveTab={setActiveTab} 
           disabledTabs={{
            Consignee: inquiry?.receives[0]?.amount === 0 || inquiry?.receives[0]?.amount === undefined,
            Balance: inquiry?.consignee_details === 0 || inquiry?.consignee_details === null,
            Document: inquiry?.receives[1]?.amount === 0 || inquiry?.receives[1]?.amount === undefined,
            Recived: inquiry?.shipping?.document_received === false || inquiry?.shipping?.document_received === undefined,
          }}/>
        </View>
        <ReviewModal
          visible={visible ? true : false}
          showClose={false}
          messageTxt={messageTxt}
          onClose={() => setVisible(false)}
          onSubmit={() => handleFeedbackSubmit()}
        />

        {/*/////////////////////// Purchase Journey Section start ///////////////////////*/}

        {activeTab == 'Inquiry' ? (<DetailInquirySection item={inquiry} />) : null}
        {activeTab == 'Advance' ? (<AdvancePaymentSection item={inquiry} />) : null}
        {activeTab == 'Consignee' ? (<ConsigneeSection item={inquiry} />) : null}
        {activeTab == 'Balance' ? (<BalancePaymentSection item={inquiry} />) : null}
        {activeTab == 'Document' ? (<DocumentReceivedSection item={inquiry} />) : null}
        {activeTab == 'Recived' ? (<CarReceivedSection item={inquiry} />) : null}

        {/*/////////////////////// Purchase Journey Section ends ///////////////////////*/}
      </ScrollView>
    </OtozBackground>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: Colors.ai_gray_900,
    marginHorizontal: 5,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 10,
    height: 10,
  },
});
