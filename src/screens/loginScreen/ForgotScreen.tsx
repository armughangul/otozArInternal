import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AristaBold} from '../../utilis/Fonts';
import {Colors, white} from '../../utilis/Colors';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/store';
import {
  forgotPassword as fPass,
  forgotPasswordReset,
  setMessageText,
} from '../../redux/Reducers/userReducers';
import {useSelector} from 'react-redux';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import Loader from '../../components/Loaders/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<any>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);
  const [visible, setVisible] = useState<any>();
  const {messageText, forgotPassword, loading} = useSelector(
    (state: any) => state.user,
  );
  const {height} = Dimensions.get('window');
  const marginTop = height * 0.055;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdown]);

  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };

  // send OTP Start
  const handleSubmit = () => {
    if (!email || !email.match(validRegex)) {
      setShowError(true);
      console.log('wrong email');
    } else {
      setShowError(false);
      console.log('right email');
      submit();
    }
  };
  const submit = async () => {
    let body = {
      email: email,
    };
    console.log(body);
    setVisible(true);
    dispatch(fPass(body));
    setVisible(false);
  };
  // send OTP Ends

  useEffect(() => {
    if (forgotPassword) {
      navigation.navigate('ResetEmail', {email});

      dispatch(forgotPasswordReset(false));
    }
  }, [forgotPassword]);

  useEffect(() => {
    if (messageText) {
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent
        />
        <Loader visible={visible} />
        <SimpleInfoModal
          visible={messageText ? true : false}
          message={messageText}
          showClose={false}
          onClose={() => dispatch(setMessageText(''))}
        />

        {/* back arrow start */}
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: marginTop,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            // marginBottom: 10,
            // backgroundColor:Colors.ai_gray_900
          }}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#313131',
                }}
                source={require('../../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#313131',
                textAlign: 'center',
                width: '85%',
              }}>
              {}
            </Text>
          </View>
        </View>
        {/* back arrow ends */}

        <View style={[styles.logoView, {}]}>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogo.png')}
          />
          <Text
            style={{
              color: Colors.ai_gray_900,
              fontSize: 18,
              fontWeight: '500',
            }}>
            Please enter your email address
          </Text>
          <Text
            style={{
              color: Colors.ai_gray_900,
              fontSize: 12,
              fontWeight: '500',
              marginBottom: 50,
            }}>
            We'll send a OTP code to your email
          </Text>
          <View style={styles.fields}>
            <InputField
              value={email}
              title="Email"
              onChange={value => setEmail(value)}
            />
            {!email && showError && <Error>Email is required.</Error>}
            {email !== '' && !email.match(validRegex) && showError && (
              <Error>Invalid email.</Error>
            )}
          </View>
          <PrimaryButton
            title={countdown > 0 ? `Resend OTP in ${countdown}s` : 'Send OTP'}
            // title="Send OTP"
            width={'90%'}
            height={'6%'}
            backgroundColor={Colors.ai_gray_900}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTxtPassword: {
    // backgroundColor:'gray',
    width: '80%',
    // paddingLeft: 5,
    color: '#000',
  },
  errors: {
    fontSize: 12,
    color: 'red',
    marginLeft: 24,
  },
  logoImg: {
    width: 172,
    height: 50,
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginBottom: 20,
    tintColor: Colors.ai_gray_900,
  },
  SignInTitle: {
    fontFamily: AristaBold,
    color: Colors.ai_gray_900,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  fields: {
    flexDirection: 'column',
    marginBottom: 20,
    width: '90%',
  },
  InputSection: {
    width: '90%',
    // height: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'lightgray',
  },
  SignInViaPhone: {
    fontFamily: AristaBold,
    color: Colors.ai_gray_900,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 35,
    textAlign: 'center',
  },
  backIcon: {
    width: 25,
    height: 20,
  },
  countryCode: {
    width: '100%',
    height: 45,
    backgroundColor: '#F0F2F3',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: Colors.ai_gray_900,
  },
  accountTxt: {
    color: Colors.ai_gray_900,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Raleway-Medium',
    alignSelf: 'center',
  },
  countinueBtn: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(21, 152, 149, 1)',
    borderRadius: 24,
    marginBottom: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTxt: {color: Colors.ai_gray_900, fontSize: 16, fontWeight: '800'},
});
