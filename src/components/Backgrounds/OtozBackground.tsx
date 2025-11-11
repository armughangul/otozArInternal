import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View} from 'react-native';
import {ReactNode} from 'react';

interface BackgroundProps {
  children: ReactNode;
}
const OtozBackground: React.FC<BackgroundProps> = ({children}) => {
  return (
    <View
      // colors={['rgba(37,153,200,255)', 'rgba(39,109,171,255)']}
      // colors={['#123652']}
      // start={{x: 0.5, y: 1.25}}
      // end={{x: 1.85, y: 1.0}}
      style={styles.container}>
      {children}
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123652',
  },
});

export default OtozBackground;
