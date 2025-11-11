import {View, Image, TouchableOpacity, Linking, Platform} from 'react-native';
interface Props {
  call?: string;
  whatsApp?: string;
  email?: string;
  message?: string;
}
export default function ContactGroup({
  call = '',
  whatsApp = '',
  email = '',
  message = '',
}: Props) {
  const contact = (type: string, contact: string) => {};

  const handleCall = async() => {
    Linking.openURL(`tel:${'+81 3 6435 2269'}`)
      .then(data => {
        console.log('call ' + data); //<---Success
      })
      .catch(() => {
        console.log('call failed');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const handleSMS = async() => {
    let number =
      Platform.OS === 'android'
        ? `sms:${'+81 3 6435 2269'}?body=`
        : `sms:${'+81 3 6435 2269'}&body=`;

    Linking.openURL(number)
      .then(data => {
        console.log('sms ' + data); //<---Success
      })
      .catch(() => {
        console.log('sms');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const handleWhatsApp = () => {
    let url = 'whatsapp://send?text=' + '' + '&phone=+92 370 3634253' + whatsApp;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        console.log('Make sure WhatsApp installed on your device');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
    // const whatsappNumber = whatsApp.replace(/\D/g, '');
    // Communications.textWithoutEncoding(`whatsapp:${whatsappNumber}`);
  };

  const handleEmail = async() => {
    const mail =
      Platform.OS === 'android'
        ? `mailto:${'info@otoz.ai'}?cc=?subject=OTOZ AI &body=`
        : `mailto:${'info@otoz.ai'}?cc=&subject=OTOZ AI t&body=`;
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
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => handleCall()}>
        <Image
          source={require('../assets/icons/callicn.png')}
          resizeMode="contain"
          style={{width: 41, height: 31, marginLeft: 6}}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSMS()}>
        <Image
          source={require('../assets/icons/chaticn.png')}
          resizeMode="contain"
          style={{width: 41, height: 31, marginLeft: 6}}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleWhatsApp()}>
        <Image
          source={require('../assets/icons/whatsappicn.png')}
          resizeMode="contain"
          style={{width: 41, height: 31, marginLeft: 6}}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEmail()}>
        <Image
          source={require('../assets/icons/mailicn.png')}
          resizeMode="contain"
          style={{width: 41, height: 31, marginLeft: 6}}></Image>
      </TouchableOpacity>
    </View>
  );
}