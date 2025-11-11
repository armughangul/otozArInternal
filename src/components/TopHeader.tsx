import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../utilis/Colors';

interface Props {
  title: string;
}

const TopHeader = ({title}: Props) => {
  const navigation = useNavigation();
  const {height} = Dimensions.get('window');
  const marginTop = height * 0.055;

  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: marginTop,
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          // marginBottom: 10,
          // backgroundColor:Colors.ai_gray_900
        }}>
        <View style={{flexDirection: 'row', marginBottom:10}}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: title ? '#fff' : '#313131',
              }}
              source={require('../assets/icons/arrowback.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: title ? '#fff' : '#313131',
              textAlign: 'center',
              width: '85%',
            }}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 20,
  },
});
