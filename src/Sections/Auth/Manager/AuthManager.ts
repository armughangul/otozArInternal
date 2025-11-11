import React, {use, useEffect, useRef, useState} from 'react';
import CommonManager from '../../../utilis/CommonManager';
import {AppStrings} from '../../../utilis/AppStrings';
import {
  changePasswordApi,
  confirmEmailApi,
  forgetPasswordApi,
  loginApi,
  resetPasswordApi,
  signUpApi,
  socialLoginApi,
  socialSignUpApi,
} from '../../../Network/Services/AuthService';
import {useDispatch} from 'react-redux';
import {setAppUser, setLoading} from '../../../redux/Reducers/AppReducer';
import {ScreenProps} from '../../../utilis/AppConstant';
import SelectionDropDownModel from '../../../Model/SelectionDropDownModel';
import {CountryModel} from '../../../Model/CountryModel';
import {Alert, Keyboard} from 'react-native';
import {Routes} from '../../../utilis/Routes';
import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const AuthManager = () => {
  //LOGIN STATES
  const [animIndex, setAnimIndex] = useState(0);
  const loginEmail = useRef<string>('');
  const loginPass = useRef<string>('');
  const [showPass, setShowPass] = useState(true);
  // REGISTERATION STATES
  const name = useRef<string>('');
  const registerMail = useRef<string>('');
  const phoneNo = useRef<string>('');
  const registerPass = useRef<string>('');
  const registerConfirmPass = useRef<string>('');
  const [country, setCountry] = useState<CountryModel>();
  const [registerShowPass, setRegisterShowPass] = useState(true);
  const [registerConfirmShowPass, setRegisterConfirmShowPass] = useState(true);
  const [agree, setAgree] = useState(false);
  const [modelObj, setModelObj] = useState<SelectionDropDownModel | null>();
  //OTP
  const otpCode = useRef<string>('');
  // FORGET
  const forgetEmail = useRef<string>('');
  // CHANGE PASSWORD
  const [currentShowPass, setCurrentShowPass] = useState(true);
  const [newShowPass, setNewShowPass] = useState(true);
  const [newConfirmShowPass, setNewConfirmShowPass] = useState(true);
  const currentPass = useRef<string>('');
  const newPass = useRef<string>('');
  const newConfirmPass = useRef<string>('');
  const [socialParam, setSocialParam] = useState();
  //OTHERS
  const dispatch = useDispatch();
  const route = useRoute();
  // INITIALIZE
  useEffect(() => {
    initialize();
  }, []);
  const initialize = () => {
    let params: any = route.params;
    if (params && params['socialParams']) {
      let socialParams = params['socialParams'];
      registerMail.current = socialParams['email'] ?? '';
      name.current = socialParams['name'] ?? '';
      console.log('current mail is ', registerMail.current);
      setSocialParam(socialParams);
    }
  };
  // LOGIN METHOD
  const validateLogin = () => {
    if (loginEmail.current == '') {
      CommonManager.shared.showPopUp(
        AppStrings.Network.errorTitle,
        AppStrings.AuthManager.loginField,
      );
      return false;
    }
    if (!CommonManager.shared.isValidEmail(loginEmail.current)) {
      CommonManager.shared.showPopUp(
        AppStrings.Network.errorTitle,
        AppStrings.AuthManager.emailValidation,
      );
      return false;
    }
    if (loginPass.current == '') {
      CommonManager.shared.showPopUp(
        AppStrings.Network.errorTitle,
        AppStrings.AuthManager.passwordField,
      );
      return false;
    } else if (
      loginPass?.current.length < 8 ||
      loginPass?.current.length > 30
    ) {
      CommonManager.shared.showPopUp(
        AppStrings.Network.errorTitle,
        AppStrings.AuthManager.passwordLength,
      );
      return false;
    }
    return true;
  };
  const onLogin = (props: ScreenProps) => {
    if (validateLogin()) {
      let params = {
        email: loginEmail.current,
        password: loginPass.current,
      };
      dispatch(setLoading(true));
      loginApi(params)
        .then(response => {
          if (response?.user) {
            dispatch(setAppUser(response?.user));
            CommonManager.shared.setUser(response?.user);
            props.navigation.goBack();
            if (props.route.params && props.route.params['onUpdate']) {
              props.route.params['onUpdate']();
            }
          }
        })
        .catch(response => {
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showPopUp('Error', msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  // SIGNUP METHOD
  const onSignupInitialize = () => {
    if (CommonManager.shared.userCountry) {
      setCountry(CommonManager.shared.userCountry);
    }
  };
  const onSelectCountry = (index: number) => {
    setCountry(CommonManager.shared.countriesList[index]);
    setModelObj(null);
  };
  const onSignupValidation = () => {
    if (
      name.current == '' ||
      registerMail.current == '' ||
      country == null ||
      phoneNo.current == ''
    ) {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.fields);
      return false;
    }
    if (!socialParam) {
      if (registerPass.current == '' || registerConfirmPass.current == '') {
        CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.fields);
        return false;
      }
    }
    if (!socialParam) {
      if (!CommonManager.shared.isValidEmail(registerMail.current)) {
        CommonManager.shared.showPopUp(
          'Error',
          AppStrings.AuthManager.emailValidation,
        );
        return false;
      }
    }

    if (country == null) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.countryError,
      );
      return false;
    }
    if (
      !CommonManager.shared.validatePhoneNumber(
        country.phone_regex,
        phoneNo.current,
      )
    ) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.phoneNo +
          ' example like ' +
          country.example_phone,
      );
      return false;
    }
    if (!socialParam) {
      if (registerPass.current.length < 7) {
        CommonManager.shared.showPopUp(
          'Error',
          AppStrings.AuthManager.passwordLength,
        );
        return false;
      }
      if (registerPass.current != registerConfirmPass.current) {
        CommonManager.shared.showPopUp(
          'Error',
          AppStrings.AuthManager.samePassword,
        );
        return false;
      }
    }
    if (!agree) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.termsError,
      );
      return false;
    }
    return true;
  };
  const onSignup = (props: ScreenProps) => {
    if (onSignupValidation()) {
      if (socialParam) {
        return;
      }
      let params = {
        first_name: name.current,
        email: registerMail.current,
        phone_no: phoneNo.current,
        country: country?.id,
        image: '',
        password: registerPass.current,
        password_confirmation: registerConfirmPass.current,
        role_id: 34,
      };
      dispatch(setLoading(true));
      signUpApi(params)
        .then(response => {
          console.log('response is ', response);
          if (response?.success) {
            props.navigation.push(Routes.OtpVerificationScreen, {
              email: registerMail.current,
              isReset: false,
            });
          }
        })
        .catch(response => {
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showPopUp('Error', msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  // OTP Methods
  const confirmEmail = (token: string, props: ScreenProps) => {
    if (token.length < 6) {
      CommonManager.shared.showPopUp('Error', 'Please enter 6 digit code');
      return;
    }
    let params = {
      token,
    };
    dispatch(setLoading(true));
    confirmEmailApi(params)
      .then(response => {
        if (response.success && response.message) {
          CommonManager.shared.showMessage(response.message[0] ?? '', 1);
          props.navigation.navigate(Routes.LoginScreen);
        }
      })
      .catch(response => {
        let msg = '';
        if (response.message && response.message.length > 0) {
          response.message.map((item: string) => {
            msg += item;
          });
        }
        CommonManager.shared.showPopUp('Error', msg);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  //FORGET PASS
  const forgetPassword = (email: string, props: ScreenProps) => {
    if (email == '') {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.email);
      return;
    }
    if (!CommonManager.shared.isValidEmail(email)) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.emailValidation,
      );
      return;
    }
    let params = {
      email,
    };
    dispatch(setLoading(true));
    forgetPasswordApi(params)
      .then(response => {
        if (response.success && response.message) {
          CommonManager.shared.showMessage(response.message[0] ?? '', 1);
          props.navigation.push(Routes.ResetPasswordScreen, {
            email: email,
            isReset: true,
          });
        }
      })
      .catch(response => {
        let msg = '';
        if (response.message && response.message.length > 0) {
          response.message.map((item: string) => {
            msg += item;
          });
        }
        CommonManager.shared.showPopUp('Error', msg);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  //RESET PASS
  const resetPassword = (props: ScreenProps) => {
    let token = otpCode.current;
    if (token.length < 6) {
      CommonManager.shared.showPopUp('Error', 'Please enter 6 digit code');
      return;
    }
    if (registerPass.current == '' || registerConfirmPass.current == '') {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.fields);
      return;
    }
    if (registerPass.current.length < 7) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.passwordLength,
      );
      return;
    }
    if (registerPass.current != registerConfirmPass.current) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.samePassword,
      );
      return;
    }
    let params = {
      token,
      new_password: registerPass.current,
      new_password_confirmation: registerConfirmPass.current,
    };
    dispatch(setLoading(true));
    resetPasswordApi(params)
      .then(response => {
        if (response.success && response.message) {
          CommonManager.shared.showMessage(response.message[0] ?? '', 1);
          props.navigation.navigate(Routes.LoginScreen);
        }
      })
      .catch(response => {
        let msg = '';
        if (response.message && response.message.length > 0) {
          response.message.map((item: string) => {
            msg += item;
          });
        }
        CommonManager.shared.showPopUp('Error', msg);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  //CHANGE PASS
  const changePassword = (props: ScreenProps) => {
    if (
      currentPass.current == '' ||
      newPass.current == '' ||
      newConfirmPass.current == ''
    ) {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.fields);
      return;
    }
    if (newPass.current.length < 7) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.passwordLength,
      );
      return;
    }
    if (newPass.current != newConfirmPass.current) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.samePassword,
      );
      return;
    }
    let params = {
      current_password: currentPass.current,
      new_password: newPass.current,
    };
    dispatch(setLoading(true));
    changePasswordApi(params)
      .then(response => {
        if (response.success && response.message) {
          CommonManager.shared.showMessage(response.message[0] ?? '', 1);
          props.navigation.popToTop();
        }
      })
      .catch(response => {
        let msg = '';
        if (response.message && response.message.length > 0) {
          response.message.map((item: string) => {
            msg += item;
          });
        }
        CommonManager.shared.showPopUp('Error', msg);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const authApple = async (props: ScreenProps) => {
    console.log("apple login")
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (appleAuthRequestResponse.identityToken) {
      console.log('success');
      let findedUser = await CommonManager.shared.getAppleUser(appleAuthRequestResponse.user)
      let user = appleAuthRequestResponse
      if (findedUser){
        user = findedUser
      }
      else {
        CommonManager.shared.saveAppleUser(appleAuthRequestResponse.user,appleAuthRequestResponse)
      }
          console.log('sending data ', JSON.stringify(user));

                      let params = {
                  social_type: 'apple',
                  email: user.email,
                  token: user.identityToken,
                  name: user.fullName?.givenName + " " + user.fullName?.familyName,
                };
                socialLogin(params, props);
    } else {
    }
  };

  const getFbUserFullData = async (
    token: string,
    completionHanlder: (data: any) => void,
  ) => {
    console.log('new data call');
    let url =
      'https://graph.facebook.com/v2.5/me?fields=name,email,first_name,last_name,picture,friends&access_token=' +
      token;
    let fullData = await axios.get(
      'https://graph.facebook.com/v2.5/me?fields=name,email,first_name,last_name,picture,friends&access_token=' +
        token,
    );
    completionHanlder(fullData);
  };
  const authFacebook = async (props: ScreenProps) => {
    try {
      let response = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (response && response.isCancelled) {
      } else {
        dispatch(setLoading(true));
        AccessToken.getCurrentAccessToken().then(data => {
          if (!data) Alert.alert('error');
          else {
            const facebookToken = data.accessToken;
            getFbUserFullData(facebookToken, data => {
              if (data.data) {
                let params = {
                  social_type: 'gmail',
                  email: data.data?.email,
                  token: facebookToken,
                  name: data.data?.name,
                };
                socialLogin(params, props);
              } else {
                dispatch(setLoading(false));
              }
              console.log('received fb data is ', data);
            });
          }
        });
      }
    } catch (err) {
      Alert.alert('error', `${err}`);
    }
  };
  const authGoogle = async (props: ScreenProps) => {
    try {
      await GoogleSignin.hasPlayServices();

      const user = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      console.log('Connected as', tokens);
      const accessToken = tokens.accessToken;
      let params = {
        social_type: 'gmail',
        email: user.data?.user.email,
        token: accessToken,
        name: user.data?.user.name,
      };
      socialLogin(params, props);
    } catch (err) {
      console.log('WRONG SIGNIN', err);
    }
  };
  const socialLogin = (socialParams: any, props: ScreenProps) => {
    dispatch(setLoading(true));
    console.log('param is ', socialParams);
    socialLoginApi(socialParams)
      .then(response => {
        if (response && response['pending_registration']) {
          props.navigation.push(Routes.RegisterScreen, {
            socialParams: {
              ...socialParams,
              apiToken: response['token'],
            },
          });
        }
        if (response && response['user']) {
          dispatch(setAppUser(response?.user));
          CommonManager.shared.setUser(response?.user);
          navigateToMain(props);
        }
      })
      .catch(response => {
        let msg = '';
        if (response.message && response.message.length > 0) {
          response.message.map((item: string) => {
            msg += item;
          });
        }
        CommonManager.shared.showPopUp('Error', msg);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const socialSignUp = (props: ScreenProps) => {
    if (onSignupValidation() && socialParam) {
      let userParams = {
        first_name: name.current,
        email: registerMail.current,
        phone_no: phoneNo.current,
        country: country?.id,
        image: '',
        role_id: 34,
      };
      let params = {
        token: socialParam['apiToken'],
        user: userParams,
      };
      dispatch(setLoading(true));
      socialSignUpApi(params)
        .then(response => {
          if (response?.user) {
            dispatch(setAppUser(response?.user));
            CommonManager.shared.setUser(response?.user);
            navigateToMain(props);
          }
        })
        .catch(response => {
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showPopUp('Error', msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  const navigateToMain = (props: ScreenProps) => {
    let routeIndex = 0;
    const state = props.navigation.getState();

    let routeNames = state.routes;
    console.log(routeNames);
    for (let i = 0; i < routeNames.length; i++) {
      const element = routeNames[i];
      if (element.name == Routes.CarDetailScreen) {
        routeIndex = i;
        console.log('car detail route ', i);
        break;
      }
      if (element.name == Routes.Container) {
        routeIndex = i;
        console.log('container route ', i);
      }
    }
    console.log('route is ', routeIndex);
    let finalIndex = routeNames.length - 1 - routeIndex;
    console.log('final index is ', finalIndex);
    props.navigation.pop(finalIndex);
  };
  return {
    animIndex,
    setAnimIndex,
    loginEmail,
    loginPass,
    showPass,
    setShowPass,
    onLogin,
    name,
    registerMail,
    country,
    setCountry,
    phoneNo,
    registerPass,
    registerShowPass,
    setRegisterShowPass,
    registerConfirmPass,
    registerConfirmShowPass,
    setRegisterConfirmShowPass,
    agree,
    setAgree,
    modelObj,
    setModelObj,
    onSelectCountry,
    onSignup,
    onSignupInitialize,
    confirmEmail,
    otpCode,
    forgetEmail,
    forgetPassword,
    resetPassword,
    currentShowPass,
    setCurrentShowPass,
    newShowPass,
    setNewShowPass,
    newConfirmShowPass,
    setNewConfirmShowPass,
    currentPass,
    newPass,
    newConfirmPass,
    changePassword,
    authGoogle,
    authFacebook,
    authApple,
    socialParam,
    setSocialParam,
    socialSignUp,
    navigateToMain,
  };
};

export default AuthManager;
export type AuthManagerType = ReturnType<typeof AuthManager>;
