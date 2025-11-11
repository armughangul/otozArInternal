import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';

const TrustedWayToBuyCar = () => {
  const DATA = useMemo(
    () => [
      {id: '1', title: 'Family Cars', fair: 'JP¥ 22K'},
      {id: '2', title: 'Electric Hybrid', fair: 'JP¥ 24K'},
      {id: '3', title: 'Super Cars', fair: 'JP¥ 25K'},
      {id: '4', title: 'Commercial Vehicles', fair: 'JP¥ 26K'},
      {id: '5', title: 'Electric Hybrid', fair: 'JP¥ 24K'},
      {id: '6', title: 'Super Cars', fair: 'JP¥ 25K'},
      {id: '7', title: 'Commercial Vehicles', fair: 'JP¥ 26K'},
    ],
    [],
  );
  const FairsView = ({item}: any) => (
    <View style={styles.fairsContainer}>
      <Text style={styles.fairsTitle}>{item.title}</Text>
      <Text style={styles.fairsFair}>{item.fair}</Text>
    </View>
  );

  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={require('../assets/homeimg.png')}
        resizeMode="contain"
        style={styles.imageBackground}>
        <Text style={styles.imageText}>
          The <Text style={styles.imageTextBold}>Trusted</Text> Way to Buy and
          Sell Cars
        </Text>
        {/* <View style={styles.innerContainer}>
          <View style={styles.tooltipContainer}>
            <ImageBackground
              source={require('../assets/tooltip.png')}
              style={styles.tooltipImage}>
              <Text style={styles.tooltipText}>15% OFF</Text>
            </ImageBackground>
            <Text style={styles.tooltipTitle}>Luxury Premier Car</Text>
            <Text style={styles.tooltipPrice}>JP¥ 20k</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={({item}) => <FairsView item={item} />}
          />
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default TrustedWayToBuyCar;

const styles = StyleSheet.create({
  imageContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  imageBackground: {
    width: '100%',
    marginTop: 20,
    height: 338,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageText: {
    color: '#FFFFFF',
    fontSize: 24,
    width: 265,
    alignSelf: 'center',
    marginTop: 20,
  },
  imageTextBold: {
    color: '#F8B50E',
    fontWeight: 'bold',
  },
  innerContainer: {
    backgroundColor: 'rgba(10, 8, 14, 0.8)',
    width: 318,
    height: 170,
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 0.8,
    marginTop: 50,
  },
  tooltipContainer: {
    width: '90%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
    zIndex: -1,
    position: 'absolute',
    marginTop: -24,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tooltipImage: {
    width: 80,
    height: 40,
    position: 'absolute',
    zIndex: 1,
    top: -25,
    right: 20,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 7,
  },
  tooltipTitle: {
    color: '#123652',
    fontSize: 14,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  tooltipPrice: {
    color: '#123652',
    fontSize: 14,
    marginRight: 30,
    fontWeight: 'bold',
  },
  fairsContainer: {
    height: 26,
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderBottomWidth: 0.2,
    borderColor: '#fff',
  },
  fairsTitle: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    paddingLeft: 35,
  },
  fairsFair: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    paddingRight: 40,
  },
});
