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
import {Colors, orange, white} from '../../utilis/Colors';
import TopHeader from '../../components/TopHeader';
import PrimaryButton from '../../components/PrimaryButton';
import {store, useAppDispatch} from '../../redux/store';
import InputField from '../../components/InputField';
import {logoutUser, setMessageText} from '../../redux/Reducers/userReducers';
import {changePassword} from '../../redux/Reducers/userReducers';
import SimpleInfoModal from '../../components/Modals/SimpleInfoModal';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loaders/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const {messageText} = useSelector((state: any) => state.user);
  const [showError, setShowError] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');
  const [message, setMessage] = useState('');
  const {loading} = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();
  const {height} = Dimensions.get('window');
  const marginTop = height * 0.055;

  const Error = ({children}: any) => {
    return (
      <View style={{paddingBottom: 10}}>
        <Text style={{color: 'red'}}>{children}</Text>
      </View>
    );
  };
  useEffect(() => {
    console.log(messageText);
    if (messageText) {
      setMessage(messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
        store.dispatch(logoutUser());
      }, 2000);
    }
  }, [messageText]);

  const handleSubmit = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      !(currentPassword.length > 7 && currentPassword.length < 17) ||
      !(newPassword.length > 7 && newPassword.length < 17) ||
      !(confirmPassword.length > 7 && confirmPassword.length < 17)
    ) {
      setShowError(true);
    } else if (newPassword !== confirmPassword) {
      setShowError(true);
    } else if (currentPassword === newPassword) {
      setShowError(true);
    } else {
      setShowError(false);
      submit();
    }
  };
  const submit = async () => {
    let body = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    console.log(body);
    try {
      await dispatch(changePassword(body));
    } catch (error) {}
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.outerContainer}>
        <TopHeader title="Change Password" />
        <View style={styles.container}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Loader visible={loading} />
          <SimpleInfoModal
            visible={message ? true : false}
            message={message}
            showClose={false}
            onClose={() => setMessage('')}
          />
          <View style={[styles.logoView, {}]}>
            <Image
              resizeMode="contain"
              style={styles.logoImg}
              source={require('../../assets/clogodark.png')}
            />

            <View style={{width: '90%', marginBottom: 30}}>
              <InputField
                value={currentPassword}
                title="Current Password"
                onChange={value => setCurrentPassword(value)}
                secureTextEntry
                maxLength={16}
              />
              {!currentPassword && showError && (
                <Error>Password is required.</Error>
              )}
              {!(currentPassword.length > 7 && currentPassword.length < 17) &&
                showError && (
                  <Error>
                    Password must be min 8 and max 16 characters long
                  </Error>
                )}
              <InputField
                value={newPassword}
                title="New Password"
                onChange={value => setNewPassword(value)}
                secureTextEntry
                maxLength={16}
              />
              {!newPassword && showError && (
                <Error>Password is required.</Error>
              )}
              {!(newPassword.length > 7 && newPassword.length < 17) &&
                showError && (
                  <Error>
                    Invalid Password. Password must be min 8 and max 16
                    characters long
                  </Error>
                )}
              <InputField
                value={confirmPassword}
                title="Confirm Password"
                onChange={value => setConfirmPassword(value)}
                secureTextEntry
                maxLength={16}
              />
              {!confirmPassword && showError && (
                <Error>password is required.</Error>
              )}
              {newPassword !== confirmPassword && showError && (
                <Error>Passwords do not match.</Error>
              )}
              {confirmPassword === currentPassword && showError && (
                <Error>
                  New password must be different from the current password.
                </Error>
              )}
              {!(confirmPassword.length > 7 && confirmPassword.length < 17) &&
                showError && (
                  <Error>
                    Invalid Password. Password must be min 8 and max 16
                    characters long
                  </Error>
                )}
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
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  outerContainer: {flex: 1, backgroundColor: Colors.ai_gray_900},
  container: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    height: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"35%"
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

  titleTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  txtSec: {
    marginVertical: 25,
  },
  backIcon: {
    width: 25,
    height: 20,
  },
  normalTxt: {
    fontSize: 13,
    fontWeight: '500',
    color: white,
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
  underlineStyleHighLighted: {
    borderColor: 'green',
  },
});
