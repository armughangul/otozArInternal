import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AristaBold} from '../../utilis/Fonts';
import {Colors, white} from '../../utilis/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
// import CodeInput from 'react-native-confirmation-code-input';
import {useAppDispatch} from '../../redux/store';
import {
  confirmEmail as verifyEmail,
  setConfirmation,
  setMessageText,
} from '../../redux/Reducers/userReducers';
import {useSelector} from 'react-redux';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import Loader from '../../components/Loaders/Loader';

const ConfirmEmail = () => {
  const dispatch = useAppDispatch();
  const {confirmEmail, messageText, loading} = useSelector(
    (state: any) => state.user,
  );
  const [remainingTime, setRemainingTime] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<any>();
  const codeInputRef = useRef<any>(null);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setRemainingTime(45);
    setTimerRunning(true);
  };

  // const handleResendOTP = () => {
  //   startTimer();
  // };

  // const handleConfirmPress = () => {
  //   startTimer();
  // };

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

  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${seconds
  //     .toString()
  //     .padStart(2, '0')}`;
  // };

  const _onFinishCheckingCode2 = (isValid: boolean, code: string) => {
    console.log(`Code is ${code}, is it valid? ${isValid}`);
    setOtp(code);
    dispatch(verifyEmail(code));
    // Add further actions based on the code validation result
  };

  const handleConfirm = () => {
    console.log('here comfrim button', otp);
    if (otp.length === 6) {
      dispatch(verifyEmail(otp));
    }
  };

  useEffect(() => {
    if (confirmEmail) {
      setTimeout(() => {
        navigation.navigate('SignIn');
        dispatch(setConfirmation(false));
      }, 2000);
    }
  }, [confirmEmail]);

  useEffect(() => {
    if (messageText) {
      console.log(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 1000);
    }
    console.log(messageText, 'messageText');
  }, [messageText]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Loader visible={loading} />
        <SimpleInfoModal
          visible={messageText ? true : false}
          message={messageText}
          showClose={false}
          onClose={() => dispatch(setMessageText(''))}
        />
        {/* <TopHeader title=" " /> */}

        <View style={styles.logoView}>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogodark.png')}
          />
          <View style={styles.txtSec}>
            <Text style={styles.normalTxt}>
              Please enter the 6 digit OTP we just sent on your email
            </Text>
          </View>
          <View style={{height: 50, marginBottom: 20}}>
            {/* <CodeInput
              ref={codeInputRef}
              keyboardType="numeric"
              codeLength={6}
              className="border-circle"
              autoFocus={true}
              activeColor={Colors.ai_gray_900}
              inactiveColor="rgba(49, 180, 4, 1.3)"
              codeInputStyle={{
                fontWeight: '600',
                fontSize: 16,
                color: Colors.ai_gray_900,
              }}
              onFulfill={(code: any) => _onFinishCheckingCode2(true, code)}
              // containerStyle={{backgroundColor:'red'}}
            /> */}
          </View>
          <View style={styles.rememberSec}>
            {/* <View style={{flexDirection: 'row'}}>
            {remainingTime === 0 ? (
              <TouchableOpacity onPress={() => handleResendOTP()}>
                <Text style={styles.remembertxt}>Re-send OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={[styles.remembertxt, {color: 'lightgray'}]}>
                Re-send OTP
              </Text>
            )}
          </View> */}
            {/* <View style={{flexDirection: 'row'}}>
            <Text style={[styles.remembertxt, {marginRight: 5}]}>Time:</Text>
            <Text
              style={[
                styles.remembertxt,
                {color: '#DEB01D', alignSelf: 'flex-end', fontWeight: '600'},
              ]}>
              {formatTime(remainingTime)}
            </Text>
          </View> */}
          </View>
          <PrimaryButton
            title="Confirm"
            width={'85%'}
            height={'6%'}
            backgroundColor={Colors.ai_gray_900}
            onPress={handleConfirm}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
    // backgroundColor:'gray',
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
    marginBottom: 30,
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
  continueTxt: {color: white, fontSize: 16, fontWeight: '800'},
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
    color: white,
    fontSize: 13,
    fontWeight: '500',
  },
  SignInViaPhone: {
    fontFamily: AristaBold,
    color: white,
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
    color: '#313131',
  },
  underlineStyleHighLighted: {
    borderColor: 'green', // Change to red
  },
  codeInputStyle: {
    // borderColor: 'red',
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
    borderColor: '#F8B50E',
  },
});
