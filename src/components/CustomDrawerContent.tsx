import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import ScreensButton from './ScreensButton';
import {Colors, orange, Primary} from '../utilis/Colors';
import {store, useAppDispatch} from '../redux/store';
import {
  logoutUser,
  setExploreOnly,
  setProfileImg,
  setMessageText,
} from '../redux/Reducers/userReducers';
import {useSelector} from 'react-redux';
import DeleteModal from './Modals/DeleteModal';

const CustomDrawerContent = ({navigation}: any) => {
  const {user, messageText} = useSelector((state: any) => state.user);
  const [visible, setVisible] = useState<any>(false);
  const dispatch = useAppDispatch();

  const handleCall = async () => {
    Linking.openURL(`tel:${'+81364352269'}`)
      .then(data => {
        console.log('call ' + data); //<---Success
      })
      .catch(() => {
        console.log('call failed');
        // alert("Make sure WhatsApp installed on your device");  //<---Error
      });
  };

  const handleChangePassword = async () => {
    navigation.navigate('ChangePassword');
  };

  const handleLogout = async () => {
    store.dispatch(logoutUser(''));
    store.dispatch(setExploreOnly(false));
    store.dispatch(setProfileImg(''));
  };

  // const handleFaceBook = async ()=> {
  //   Linking.openURL('https://www.facebook.com/saffranauto')
  // }

  const handleFaceBook = async () => {
    const fbAppUrl = 'https://www.facebook.com/OtozAIofficial'; // Facebook Page ID
    const fbWebUrl = 'https://www.facebook.com/OtozAIofficial';

    try {
      const supported = await Linking.canOpenURL(fbAppUrl);
      if (supported) {
        await Linking.openURL(fbAppUrl);
      } else {
        await Linking.openURL(fbWebUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open Facebook.');
    }
  };

  const handleDelete = () => {
    console.log('Delete Modal True');
    setVisible(true);
  };

  useEffect(() => {
    if (messageText) {
      console.log('messageTexttttttttttttttt', messageText);
      setTimeout(() => {
        dispatch(setMessageText(''));
      }, 1000);
    }
    // console.log(messageText,' api here')
  }, [visible]);

  return (
    <View style={{flex: 1, backgroundColor: '#F6F9FF', paddingTop: 30}}>
      <DeleteModal
        visible={visible ? true : false}
        message={messageText}
        showClose={false}
        onClose={() => setVisible(false)}
      />
      <View style={{marginTop: '5%', marginLeft: 15, marginBottom: 10}}>
        {/*<View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginRight: 30,
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#313131',
              fontSize: 12,
              textTransform: 'uppercase',
            }}>
            Notification
          </Text>

          <TouchableOpacity
            style={[
              styles.outer,
              isOn
                ? {justifyContent: 'flex-end', backgroundColor: '#fff'}
                : {justifyContent: 'flex-start', backgroundColor: '#fff'},
            ]}
            activeOpacity={1}
            onPress={() => toggleSwitch()}>
            <View style={styles.inner} />
          </TouchableOpacity>
        </View>*/}
        <ScreensButton
          title="Home"
          navigation={navigation}
          screen={'Home'}
          img={require('../assets/icons/home-drawer-ic.png')}
        />
        <ScreensButton
          title="Available Stock"
          navigation={navigation}
          screen={'UsedCars'}
          img={require('../assets/icons/used-drawer-ic.png')}
        />
        <ScreensButton
          title="By Make"
          navigation={navigation}
          screen={'ByCarBrand'}
          img={require('../assets/icons/brand-drawer-ic.png')}
        />
        <ScreensButton
          title="By Body"
          navigation={navigation}
          screen={'ByCarBody'}
          img={require('../assets/icons/body-drawer-ic.png')}
        />
        <ScreensButton
          title="Favorite"
          navigation={navigation}
          screen={'FavoriteScreen'}
          img={require('../assets/icons/saved-drawer-ic.png')}
        />
      </View>
      <View
        style={{
          width: '100%',
          marginLeft: 25,
          paddingTop: 15,
          marginBottom:10,
          borderTopWidth: 0.5,
          borderColor: 'lightgray',
        }}>
        {user ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}
            style={{
              width: '100%',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: 25,
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/changepassword.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: '#113551',
                // marginLeft: 15,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                color: '#113551',
                fontSize: 12,
                marginLeft: 10,
              }}>
              Change Password
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={{
          borderBottomWidth: 0.5,
          borderColor: 'lightgray',
          width: '100%',
          paddingBottom: 15,
          marginLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={
            user
              ? require('../assets/icons/exitgroup.png')
              : require('../assets/icons/login.png')
          }
          style={{
            height: 20,
            width: 20,
            tintColor: Colors.ai_gray_900,
            marginLeft: 15,
          }}
        />
        <Text
          style={{
            fontWeight: '600',
            color: Colors.ai_gray_900,
            fontSize: 12,
            marginLeft: 10,
          }}>
          {user ? 'Logout' : 'Login In'}
        </Text>
      </TouchableOpacity>
  
      <TouchableOpacity
        onPress={() => handleCall()}
        style={{
          width: '100%',
          // backgroundColor: 'lightgray',
          marginTop: '10%',
          flexDirection: 'column',
          paddingHorizontal: 30,
          // paddingTop: 15,
        }}>
        {/* <Text
          style={{
            fontFamily: 'Inter-Bold',
            color: '#113551',
            fontSize: 14,
            marginVertical: 10,
            fontWeight: 'bold',
          }}>
          Connect Us
        </Text> */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/call-drawer-ic.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: Colors.ai_gray_900,
            }}
          />
          <Text
            style={{
              // fontFamily: 'Inter-Bold',
              color: Colors.ai_gray_900,
              fontSize: 16,
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            Contact Us
          </Text>
        </View>
        {/* <Text
          style={{
            fontFamily: 'Inter-Bold',
            color: '#113551',
            fontSize: 12,
            marginVertical: 10,
          }}>
          Ask the Experts
        </Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFaceBook()}
        style={{
          width: '100%',
          // marginTop: 15,
          flexDirection: 'row',
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 20,
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/facebook-drawer-ic.png')}
            style={{
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            // fontFamily: 'Inter-Bold',
            color: '#113551',
            fontSize: 16,
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          Join Us on Facebook
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
            // paddingLeft:50
          }}>
          {/* <TouchableOpacity
            
            style={{
              height: 30,
              width: 30,
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/google-drawer-ic.png')}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            
            style={{
              height: 30,
              width: 30,
              marginLeft: 10,
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/twitter-drawer-ic.png')}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
                tintColor:'#183454'
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            
            style={{
              height: 30,
              width: 30,
              marginLeft: 10,
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/youtube-drawer-ic.png')}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>

      <View
        style={[
          styles.drawerButton,
          {
            // backgroundColor:'lightgray',
            flexDirection: 'column',
            marginLeft: 15,
            height: '45%',
            justifyContent: 'space-between',
          },
        ]}>
        {user ? (
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
            style={{
              borderTopWidth: 0.5,
              borderColor: 'lightgray',
              width: '100%',
              paddingTop: 15,
              marginLeft: 8,
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              bottom: 90,
            }}>
            <Image
              resizeMode="contain"
              tintColor={'red'}
              source={user ? require('../assets/icons/delete.png') : null}
              style={{
                height: 20,
                width: 20,
                tintColor: 'red',
                marginLeft: 15,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                color: 'red',
                fontSize: 12,
                marginLeft: 10,
              }}>
              {user ? 'Delete Account' : null}
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* ) : null} */}
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    width: 200,
    height: 50,
    paddingLeft: 10,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    backgroundColor: '#EDEDED',
  },
  logo: {
    height: 80,
    width: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  drawerButton: {
    width: '100%',
    height: 35,
    shadowRadius: 2,
    shadowOpacity: 2,
    elevation: 2,
    borderColor: Primary,
    alignSelf: 'center',
    padding: 5,
    marginTop: 10,
    shadowColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  outer: {
    width: 40,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    borderColor: '#E9E9E9',
    borderWidth: 1,
  },
  inner: {
    width: 16,
    height: 16,
    backgroundColor: '#AAAAAA',
    borderRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    marginHorizontal: 1,
  },
});
