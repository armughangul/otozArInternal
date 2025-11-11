import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
}

const Loader = ({visible}: Props) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/loaders/loading.gif')}
        style={styles.loaderImage}
      /> */}
       <LottieView
          source={require('../../assets/lottie/Animation - 1724923387864.json')}
          style={{width: 300, height: 250}}
          autoPlay
          loop
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to dim the screen
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  loaderImage: {
    width: 100, // Adjust the width and height as needed
    height: 100,
    zIndex: 9,
  },
});

export default Loader;
