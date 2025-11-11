import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../../redux/store';
import {setIsSkipped} from '../../redux/Reducers/userReducers';
import setAuthToken from '../../app-services/axios-util/set-auth-token';
import {useAppDispatch} from '../../redux/store';
import {setIp} from '../../redux/Reducers/userReducers';
import {useFocusEffect} from '@react-navigation/native';
import {white} from '../../utilis/Colors';

const OnboardingScreen = ({navigation}: any) => {
  const [change, setChange] = useState<any>(false);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchIP();
    }, []),
  );

  const fetchIP = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      if (data.ip) {
        dispatch(setIp(data.ip));
      } else {
        dispatch(setIp('2400:adc5:17c:d400:12b:b4e3:d23e:9ff0'));
      }
      // console.log('ipAddress',ip)
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  const Toggle = () => {
    setChange(true);
    console.log('setChange', change);
    if (change) {
      store.dispatch(setIsSkipped(true));
    }
  };

  const handleSkip = () => {
    setAuthToken('_');
    store.dispatch(setIsSkipped(true));
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.renderData_List}>
        <ImageBackground
          style={styles.images}
          resizeMode={'cover'}
          source={
            change
              ? require('../../assets/onboardImg2.png')
              : require('../../assets/onboardImg1.png')
          }>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
            start={{x: 1.5, y: 0.25}}
            end={{x: 0.95, y: 1.0}}
            style={styles.linearGradient}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* {change ? (
                <TouchableOpacity
                  onPress={() => setChange(false)}
                  style={{
                    alignSelf: 'flex-end',
                    width: 40,
                    height: 30,
                    // position: 'absolute',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: white,
                    }}
                    source={require('../../assets/icons/arrowback.png')}
                  />
                </TouchableOpacity>
              ) : ( */}
                <Text
                  style={[
                    styles.titleTxt,
                    {
                      fontFamily: 'Inter-SemiBold',
                      color: '#fff',
                      fontSize: 18,
                    },
                  ]}>
                  {'  '}
                </Text>
              {/* )} */}
              <View
                style={{
                  width: 50,
                  height: 30,
                  alignSelf: 'flex-end',
                  marginTop: 60,
                  marginRight: 20,
                }}>
                {change ? (
                  <TouchableOpacity
                    onPress={() => handleSkip()}
                    style={{
                      alignSelf: 'flex-end',
                      width: 40,
                      height: 30,
                      position: 'absolute',
                    }}>
                    <Text
                      style={[
                        styles.titleTxt,
                        {
                          fontFamily: 'Inter-SemiBold',
                          color: '#fff',
                          fontSize: 18,
                        },
                      ]}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleSkip()}
                    style={{
                      alignSelf: 'flex-end',
                      width: 40,
                      height: 30,
                      position: 'absolute',
                    }}>
                    <Text
                      style={[
                        styles.titleTxt,
                        {
                          fontFamily: 'Inter-SemiBold',
                          color: '#fff',
                          fontSize: 18,
                        },
                      ]}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 10,
                width: Dimensions.get('window').width - 30,
                alignSelf: 'center',
                height: 200,
              }}>
              {change ? (
                <Text style={styles.titleTxt}>
                  Global Access to Japan's Best Cars
                </Text>
              ) : (
                <Text style={styles.titleTxt}>Connecting Japan to World</Text>
              )}
              {change ? (
                <Text style={styles.normalTxt}>
                  Otoz.Ai gives you the global access to Japan's best cars.
                  Drive excellence with our premium selection of Japanese
                  vehicles.
                </Text>
              ) : (
                <Text style={styles.normalTxt}>
                  Welcome to Otoz.Ai, join us in driving excellence and
                  connecting Japan to the world.
                </Text>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 60,
                  // right: 20,
                  width: '90%',
                }}>
                {change?<TouchableOpacity
                  onPress={() => setChange(false)}
                  style={{
                    alignSelf: 'flex-end',
                    width: 40,
                    height: 30,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/prevOnboardingIcon.png')}
                    style={{width: 60, height: 60, }}
                  />
                </TouchableOpacity>:
                 <Text style={styles.normalTxt}>
                {'   '}
               </Text>}
                <TouchableOpacity
                  onPress={() => Toggle()}
                  style={{
                    alignSelf: 'flex-end',
                    width: 40,
                    height: 30,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/nextOnboardingIcon.png')}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  renderData_List: {
    height: '100%',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
  titleTxt: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    marginBottom: 5,
    color: 'white',
  },
  normalTxt: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Raleway',
    color: 'white',
  },
});
