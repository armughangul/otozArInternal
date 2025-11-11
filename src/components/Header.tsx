import {StyleSheet, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation<any>();
  const {height} = Dimensions.get('window');
  const MarginTop = height * 0.059; 

  // const [like, setLike] = useState(false);
  // const handleLike = () => {
  //   setLike(!like);
  // };
  const handleOpenDrawer = async () => {
    navigation.openDrawer()
  };
  return (
    <View
      style={{
        marginTop: MarginTop,
        width: '85%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
        <TouchableOpacity 
        onPress={() => handleOpenDrawer()}
        >
          <Image
            source={require('../assets/icons/menu.png')}
            style={{width: 22, height: 20, tintColor: 'white'}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/clogo.png')}
          style={{width: 78, height: 20, marginLeft: 15}}
          resizeMode={'contain'}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          //   backgroundColor: "lightgray",
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity onPress={() => handleLike()}>
          {like ? (
            <Image
              source={require('../assets/icons/heart2.png')}
              style={{
                width: 18,
                height: 16,
                marginLeft: 15,
                tintColor: '#F8B50E',
              }}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={require('../assets/icons/heart.png')}
              style={{width: 18, height: 16, marginLeft: 15}}
              resizeMode={'contain'}
            />
          )}
        </TouchableOpacity>*/}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
