import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AristaBold} from '../../utilis/Fonts';
import {Colors, red, white} from '../../utilis/Colors';
import TopHeader from '../../components/TopHeader';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation, useRoute} from '@react-navigation/native';
// import CodeInput from 'react-native-confirmation-code-input';
import {useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import InputField from '../../components/InputField';
import {
  forgotPassword,
  forgotReset,
  resetPassword,
  setMessageText,
} from '../../redux/Reducers/userReducers';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import Loader from '../../components/Loaders/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResetEmail = () => {
  const dispatch = useAppDispatch();
  const [remainingTime, setRemainingTime] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const codeInputRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [ConfirmPassword, setConfirmPassword] = useState<any>('');
  const [token, setToken] = useState<string>('');
  const route = useRoute<any>();
  const {email} = route.params;
  const [message, setMessage] = useState('');
  const {messageText, resetEmail, loading} = useSelector(
    (state: any) => state.user,
  );

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    console.log(messageText);
    if (messageText) {
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };
  const startTimer = () => {
    setRemainingTime(45);
    setTimerRunning(true);
  };
  const handleResendOTP = () => {
    startTimer();
    handleSubmit();
    console.log('handleSubmit');
  };
  // send OTP Start
  const handleResendOtpSubmit = () => {
    if (!email || !email.match(validRegex)) {
      setShowError(true);
    } else {
      setShowError(false);
      submitResendOtp();
    }
  };
  const submitResendOtp = async () => {
    let body = {
      email: email,
    };
    console.log(body);

    dispatch(forgotPassword(body));

    try {
      setVisible(true);
      setMessage('Welcom to Otoz.Ai!');
    } catch (error) {
      console.log(error);
      setMessage(error as string);
    }
  };
  // send OTP Ends

  useEffect(() => {
    if (resetEmail) {
      setTimeout(() => {
        navigation.navigate('SignIn');
        dispatch(forgotReset(false));
      }, 2000);
    }
  }, [resetEmail]);

  const handleSubmit = () => {
    if (
      !token ||
      !password ||
      !ConfirmPassword ||
      password !== ConfirmPassword
    ) {
      setShowError(true);
      console.log('first');
    } else {
      setShowError(false);
      console.log('second');
      submit();
    }
  };

  const submit = async () => {
    const body = {
      token,
      new_password: password,
      new_password_confirmation: ConfirmPassword,
    };
    try {
      dispatch(resetPassword(body));
      //     if (response.success) {
      //       setMessage("Password updated successfully.");
      //       setVisible(true);

      //     } else {
      //       setMessage(response.message || "Something went wrong.");
      //       setVisible(true);
      //     }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setVisible(true);
    }
  };

  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            setTimerRunning(false);
            clearInterval(interval);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else if (remainingTime === 0) {
      setTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [timerRunning, remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const _onFinishCheckingCode2 = (isValid: boolean, code: string) => {
    console.log(`Code is ${code}, is it valid? ${isValid}`);
    setToken(code);
  };

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
        <Loader visible={loading} />
        <SimpleInfoModal
          visible={messageText ? true : false}
          message={messageText}
          showClose={false}
          onClose={() => dispatch(setMessageText(''))}
        />
        <TopHeader title=" " />

        <View style={[styles.logoView, {}]}>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogo.png')}
          />
          <View style={{marginTop: 20, marginBottom: 0}}>
            <Text style={styles.normalTxt}>
              Please enter the 6 digit OTP we just sent on your email
            </Text>
          </View>
          <View style={{height: 50, marginBottom: 0}}>
            {/* <CodeInput
              ref={codeInputRef}
              keyboardType="numeric"
              codeLength={6}
              className="border-circle"
              autoFocus={false}
              codeInputStyle={{
                fontWeight: '600',
                fontSize: 16,
                color: Colors.ai_gray_900,
                borderWidth: 1,
                borderColor: Colors.ai_gray_900,
              }}
              onFulfill={(code: any) => _onFinishCheckingCode2(true, code)}
            /> */}
          </View>
          <View style={[styles.rememberSec, {marginTop: 20}]}>
            <View style={{flexDirection: 'row'}}>
              {remainingTime === 0 ? (
                <TouchableOpacity onPress={() => handleResendOtpSubmit()}>
                  <Text style={styles.remembertxt}>Re-send OTP</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.remembertxt, {color: 'lightgray'}]}>
                  Re-send OTP
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.remembertxt, {marginRight: 5}]}>Time:</Text>
              <Text
                style={[
                  styles.remembertxt,
                  {color: red, alignSelf: 'flex-end', fontWeight: '600'},
                ]}>
                {formatTime(remainingTime)}
              </Text>
            </View>
          </View>

          <View style={{width: '90%', marginBottom: 30}}>
            <InputField
              value={password}
              title="New Password"
              onChange={value => setPassword(value)}
              secureTextEntry
            />
            {!password && showError && <Error>Password is required.</Error>}
            {password !== '' && password.length < 8 && showError && (
              <Error>
                Invalid Password. Password must be 8 characters long
              </Error>
            )}
            <InputField
              value={ConfirmPassword}
              title="Confirm New Password"
              onChange={value => setConfirmPassword(value)}
              secureTextEntry
            />
            {!ConfirmPassword && showError && (
              <Error>ConfirmPassword is required.</Error>
            )}
            {ConfirmPassword !== '' &&
              ConfirmPassword.length < 8 &&
              showError && <Error>Invalid Password</Error>}
            {ConfirmPassword !== '' &&
              password !== ConfirmPassword &&
              showError && <Error>Passwords do not match.</Error>}
          </View>

          <PrimaryButton
            title="Confirm"
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

export default ResetEmail;

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
    width: '80%',
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
    marginBottom: 70,
    tintColor: Colors.ai_gray_900,
  },
  SignInTitle: {
    fontFamily: AristaBold,
    color: 'rgba(21, 152, 149, 1.9)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueTxt: {color: Colors.ai_gray_900, fontSize: 16, fontWeight: '800'},
  rememberSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  remembertxt: {
    color: Colors.ai_gray_900,
    fontSize: 13,
    fontWeight: '500',
  },
  SignInViaPhone: {
    fontFamily: AristaBold,
    color: Colors.ai_gray_900,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 35,
    textAlign: 'center',
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
  // continueTxt: {color: white, fontSize: 16, fontWeight: '800'},
  titleTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.ai_gray_900,
    marginBottom: 10,
    textAlign: 'center',
  },
  txtSec: {
    marginVertical: 25,
  },
  normalTxt: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.ai_gray_900,
    textAlign: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: 'green',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.ai_gray_900,
  },
  underlineStyleHighLighted: {
    borderColor: 'green',
  },
});
