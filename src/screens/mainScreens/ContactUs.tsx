import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader';
import {Colors} from '../../utilis/Colors';

interface Props {
  call?: string;
  email?: string;
  message?: string;
}

const ContactUs = ({
  call = '+81 3 6435 2269',
  email = 'info@otoz.ai',
  message = '+81 3 6435 2269',
}: Props) => {
  const navigation = useNavigation();

  const handleCall = () => {
    Linking.openURL(`tel:${call}`)
      .then(data => {
        console.log('call ' + data); //<---Success
      })
      .catch(() => {
        console.log('call failed');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const handleSMS = () => {
    let number =
      Platform.OS === 'android'
        ? `sms:${message}?body=`
        : `sms:${message}&body=`;

    Linking.openURL(number)
      .then(data => {
        console.log('sms ' + data); //<---Success
      })
      .catch(() => {
        console.log('sms');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };
  const handleEmail = () => {
    const mail =
      Platform.OS === 'android'
        ? `mailto:${email}?cc=?subject=OTOZ AI &body=`
        : `mailto:${email}?cc=&subject=OTOZ AI t&body=`;
    Linking.openURL(mail)
      .then(data => {
        console.log('email ' + data); //<---Success
      })
      .catch(() => {
        console.log('email');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.ai_gray_900}}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
        }}> */}
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="Contact Us" />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
          paddingBottom: 100,
        }}>
        <View style={{}}>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 60,
              marginBottom: 10,
            }}>
            <Image
              resizeMode="contain"
              style={{width: 258, height: 66, marginBottom: 40}}
              source={require('../../assets/clogodark.png')}></Image>
            <Text
              style={{
                color: '#123652',
                fontWeight: 'bold',
                fontSize: 26,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Need help?
            </Text>
            <Text
              style={{
                color: '#666666',
                fontWeight: '600',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Our agents are here for you
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleCall()}
            style={[styles.btn, {backgroundColor: Colors.ai_gray_900}]}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/call2.png')}
              style={styles.btnIcn}></Image>
            <Text style={styles.btnTxt}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.navigate('ContactUsEmail')}
            onPress={() => handleEmail()}
            style={[
              styles.btn,
              {backgroundColor: Colors.ai_gray_900, marginTop: 0},
            ]}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/mail-ic.png')}
              style={styles.btnIcn}></Image>
            <Text style={styles.btnTxt}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSMS()}
            style={[
              styles.btn,
              {
                backgroundColor: Colors.ai_gray_900,
                marginTop: 0,
                marginBottom: 30,
              },
            ]}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/chat-ic.png')}
              style={styles.btnIcn}></Image>
            <Text style={styles.btnTxt}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
    // backgroundColor:'red',
    // marginLeft:70
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  btnIcn: {
    width: 23,
    height: 23,
    marginRight: 20,
    tintColor: '#fff',
  },
  btn: {
    backgroundColor: 'gray',
    width: '60%',
    height: 45,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
