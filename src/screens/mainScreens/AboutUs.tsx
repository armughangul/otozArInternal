import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import TopHeader from '../../components/TopHeader';
import {Colors} from '../../utilis/Colors';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TopHeader title="About Us" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <Text style={styles.title}>Why Otoz.Ai?</Text>
        <Text
          style={[
            styles.normalTxt,
            {fontWeight: '600', color: '#575757', textAlign: 'left'},
          ]}>
          Our Commitments: Speed, Reliability, Quality & Affordability
        </Text>
        <Text style={styles.normalTxt}>
          Since its establishment in 2023, Otoz.Ai has been dedicated to
          supplying vehicles to clients globally, with a primary focus on the
          Caribbeans, Africa, and Russia. Our steadfast commitment to fostering
          trust with our clientele has led to the expansion of our monthly
          vehicle exports. Amidst this achievement, our paramount dedication
          remains to handle each vehicle with meticulous care, always
          considering the perspective of our valued customers.
        </Text>
        <Text style={styles.normalTxt}>
          Otoz.Ai leverages a diverse network of suppliers and channels to
          procure top-quality vehicles for our esteemed customers. Our
          procurement strategy encompasses direct purchases from Japanese used
          car auctions as well as robust partnerships with local used car sales
          and domestic Dealers.
        </Text>

        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default React.memo(AboutUs);

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
  },
  container: {flex: 1, backgroundColor:Colors.ai_gray_900},
  title: {
    fontSize: 20,
    color: Colors.ai_gray_900,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  normalTxt: {
    fontSize: 14,
    color: Colors.ai_gray_150,
    fontWeight: '400',
    textAlign: 'justify',
    marginTop: 10,
  },
});
