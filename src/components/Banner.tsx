import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Banner = () => {
  return (
    <ImageBackground
      style={styles.bannerContainer}
      resizeMode="cover"
      source={require('../assets/bannerbgimg.png')}>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>STILL EXPLORING</Text>
        <Text style={styles.bannerSubtitle}>
          Find car reviews, buying guides and good reads here.
        </Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>DISCOVER MORE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 135,
    marginVertical: 20,
  },
  bannerContent: {
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
  bannerTitle: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    width: 120,
  },
  bannerButton: {
    backgroundColor: '#fff',
    marginTop: 8,
    width: 112,
    height: 25,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerButtonText: {
    fontSize: 10,
    color: '#113551',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
