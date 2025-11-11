import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React  from 'react';
import TopHeader from '../../components/TopHeader';
import Loader from '../../components/Loaders/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const Save = () => {
  const {loading} = useSelector((state: any) => state.user);

  return (
    <LinearGradient
      colors={['rgba(37,153,200,255)', 'rgba(39,109,171,255)']}
      start={{x: 0.5, y: 1.25}}
      end={{x: 0.95, y: 1.0}}
      style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="Favorite" />
      <Loader visible={loading} />
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{width: '80%', height: '70%'}}
          source={require('../../assets/comingsoon.jpg')}
        />
      </View>
    </LinearGradient>
  );
};

export default Save;

const styles = StyleSheet.create({});
