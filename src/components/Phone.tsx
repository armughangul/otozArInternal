import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardType
} from 'react-native';
import React, {useState} from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';
import {Colors} from '../utilis/Colors';
// import TitleInput from './TitleInput';

interface Props {
  title: string;
  value?: string;
  onChange(text: string): void;
  keyboardType?: KeyboardType;
}

const Phone = ({title, value, keyboardType, onChange}: any) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>('');
  return (
    <View style={{flex:1, marginBottom:10}}>
      <Text style={styles.title}>
        Phone Number:<Text style={styles.staric}> *</Text>
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          marginBottom: 0,
          width: '100%',
          //   backgroundColor: 'lightgray',
        }}>
        <TouchableOpacity
          onPress={() => setShow(true)}
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
          {data ? (
            <Text style={{marginLeft: 5,}}> {data?.flag}</Text>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Image
                resizeMode="contain"
                source={require('../assets/pakistanflag.png')}s
                style={{marginLeft: 0,  width: 28, height: 28}}
              /> */}
            </View>
          )}
          <Image
            resizeMode="contain"
            tintColor={Colors.ai_gray_900}
            source={require('../assets/icons/up.png')}
            style={{marginLeft: 7, width: 12, height: 12}}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.input,
            {width: '82%', flexDirection: 'row', alignItems: 'center'},
          ]}>
          <CountryPicker
            style={{
              color: Colors.ai_gray_900,
              countryName: {
                color: Colors.ai_gray_900,
              },
              dialCode: {
                color: Colors.ai_gray_900,
              },
            }}
            show={show}
            pickerButtonOnPress={(item: any) => {
              //   setCountryCode(item.dial_code);
              //   setCountryName(item.name);
              setShow(false);
              setData(item);
            }}
          />
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              borderRightWidth: 1,
              borderColor: 'gray',
              width: 32,
              // backgroundColor:'lightgray'
            }}>
            <Text
              style={{
                color: Colors.ai_gray_900,
                fontSize: 14,
                fontFamily: 'Inter-Medium',

              }}>{data ? data?.dial_code : '+92'}
            </Text>
          </TouchableOpacity>
         {/* <View></View> */}
          <TextInput
            placeholderTextColor={Colors.ai_gray_150}
            placeholder="123456789"
            style={{color: Colors.ai_gray_900, marginLeft:5}}
            onChangeText={onChange}
            keyboardType={keyboardType}
            maxLength={15}
          />
          {/* <TitleInput
            value={phone}
            title="Phone"
            keyboardType={'phone-pad'}
            onChange={phone => setPhone(phone)}

          /> */}
        </View>
      </View>
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({
  countryCode: {
    width: '90%',
    height: 45,
    backgroundColor: '#F0F2F3',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
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
});
