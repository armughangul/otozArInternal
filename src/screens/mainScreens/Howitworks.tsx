import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopHeader from '../../components/TopHeader';
import CarBuyingProcess from '../../components/CarBuyingProcess';
import Loader from '../../components/Loaders/Loader';
import { useSelector } from 'react-redux';
import { Colors } from '../../utilis/Colors';

const Howitworks = () => {
  const {loading} = useSelector((state: any) => state.user);

  return (
    <View
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="How does it work" />
      <Loader visible={loading} />
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}>
          <CarBuyingProcess />
        </View>
      </View>
    </View>
  );
};

export default React.memo(Howitworks);

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
  },
  container: {flex: 1, backgroundColor:Colors.ai_gray_900},
});
