import {StatusBar, StyleSheet, View, Image, Text, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AristaBold} from '../../utilis/Fonts';
import {Colors, orange, white} from '../../utilis/Colors';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {store, useAppDispatch} from '../../redux/store';
import {
  login,
  setConfirmation,
  setExploreOnly,
  setIsSkipped,
  setMessageText,
  setSignUp,
} from '../../redux/Reducers/userReducers';
import {useSelector} from 'react-redux';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import setAuthToken from '../../app-services/axios-util/set-auth-token';
import Loader from '../../components/Loaders/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {messageText, loading} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [message, setMessage] = useState<any>('');
  const navigation: any = useNavigation();
  let validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const Error = ({children}: any) => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 10}}>
          <Text style={{color: 'red'}}>{children}</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  useEffect(() => {
    if (messageText) {
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 2000);
    }
  }, [messageText]);

  useEffect(() => {
    dispatch(setConfirmation(false));
    dispatch(setSignUp(false));
  }, []);

  const handleSkip = () => {
    setAuthToken('-');
    store.dispatch(setExploreOnly(true));
    store.dispatch(setIsSkipped(true));
  };
  // logout functionality starts

    // Add this useEffect hook for auto-logout
    useEffect(() => {
      const checkSession = () => {
        const loginTime = AsyncStorage.getItem('loginTime');
        if (!loginTime) return;
        
        const twelveHoursInMs = 24 * 60 * 60 * 1000;
        if (Date.now() - Number(loginTime) > twelveHoursInMs) {
          handleAutoLogout();
        }
      };
  
      // Check session when app starts
      checkSession();
  
      // Check session every hour
      const interval = setInterval(checkSession, 60 * 60 * 1000);

          // Check session when app comes back from background
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkSession();
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const handleAutoLogout = () => {
    // Clear auth token and login time
    setAuthToken('-');
    AsyncStorage.removeItem('loginTime');
    
    // Show message
    setMessage('Your session has expired after 12 hours. Please login again.');
    
    // You might want to dispatch additional logout actions here if needed
    // dispatch(logout()); // Uncomment if you have a logout action
  };

  // logout functionality ends

  const handleSubmit = () => {
    if (!email || !password || !email.match(validRegex)) {
      console.log('err');
      setShowError(true);
    } else {
      setShowError(false);
      console.log('here');
      setAuthToken('-');
      submit();
    }
  };
  const submit = async () => {
    const body = {
      email,
      password,
    };
    console.log(body);

    const timeout = (ms: number) =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Internet connection problem')), ms),
      );

    try {
      await Promise.race([dispatch(login({body})), timeout(8000)]);

      // Store login time when login is successful
      AsyncStorage.setItem('loginTime', Date.now().toString());


      setMessage('Welcome to Otoz.Ai!');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('-----<<<', error);
      setMessage((error as Error).message);
    }
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
        <SimpleInfoModal
          visible={message ? true : false}
          message={message}
          showClose={false}
          onClose={() => setMessage('')}
        />
        <Loader visible={loading} />
        <View style={styles.logoView}>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogo.png')}
          />
          <Text
            style={{
              color: Colors.ai_gray_900,
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Welcome Back to Otoz Ai
          </Text>
          <Text
            style={{
              color: Colors.ai_gray_900,
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 50,
              textAlign: 'center',
              width: '80%',
            }}>
            Sign In to your Otoz AI account to continue your vehicle search,
            manage inquiries, and stay updated with the latest stock.
          </Text>

          <View style={styles.fields}>
            <InputField
              value={email}
              title="Email"
              onChange={value => setEmail(value)}
              // showError={showError}
            />
            {!email && showError && <Error>Email is required.</Error>}
            {email !== '' && !email.match(validRegex) && showError && (
              <Error>Invalid email.</Error>
            )}
            <InputField
              maxLength={16}
              value={password}
              title="Password"
              onChange={value => setPassword(value)}
              secureTextEntry
              // showError={showError}
            />
            {!password && showError && <Error>Password is required.</Error>}
            {/* {!(password.length > 7 && password.length < 17) && showError && (
            <Error>Minium length 8 characters required.</Error>
          )} */}
            <Text
              onPress={() => navigation.navigate('ForgotScreen')}
              style={{
                color: Colors.ai_gray_900,
                fontWeight: '500',
                fontSize: 16,
                marginVertical: 15,
                alignSelf: 'flex-end',
              }}>
              Forgot Password
            </Text>
          </View>
          <PrimaryButton
            title="Sign In"
            width={'90%'}
            height={'6%'}
            backgroundColor={Colors.ai_gray_900}
            onPress={() => handleSubmit()}
          />
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                color: Colors.ai_gray_150,
                fontWeight: '500',
                fontSize: 16,
              }}>
              Don't have an account?{' '}
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={{
                  color: Colors.ai_gray_900,
                  fontWeight: 'bold',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                Sign Up
              </Text>{' '}
              now
            </Text>
          </View>
          <Text
            onPress={() => handleSkip()}
            style={{
              color: Colors.ai_gray_900,
              fontWeight: 'bold',
              fontSize: 18,
              textDecorationLine: 'underline',
            }}>
            Explore Otoz.Ai
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
  },
  backIcon: {
    width: 25,
    height: 20,
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTxtPassword: {
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
    tintColor: Colors.ai_gray_900,
    // backgroundColor: 'red',
    marginBottom: 10,
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
    marginBottom: 30,
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
  accountTxt: {
    color: '#313131',
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
  continueTxt: {color: white, fontSize: 16, fontWeight: '800'},
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 15,
    color: '#173559',
  },
  modalButton: {
    backgroundColor: orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
