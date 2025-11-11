import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {useSelector} from 'react-redux';

interface Props {
  user: {name: string; img: string; email: string; subs_type?: any};
}

export default function UserInfo() {
  const {user, profileImg} = useSelector((state: any) => state.user);
  return (
    <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom:5,
              color: Colors.ai_gray_900,
            }}>
            Welcome {user?.first_name}
          </Text>
          <View style={{flexDirection: 'row', paddingTop: 2, width:270}}>
            <Text style={{color: Colors.ai_gray_150, fontSize: 16}}>
              {user?.email}
            </Text>
          </View>
        </View>
      
      {profileImg ? (
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 62,
            backgroundColor: 'lightgray',
            alignSelf: 'center',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 60,
            }}
            source={{uri: profileImg}}
          />
        </View>
      ) : (
        <ImageBackground
          style={{
            width: 60,
            height: 60,
            borderRadius: 62,
            alignSelf: 'center',
          }}
          source={require('../../assets/user.png')}></ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    // backgroundColor:'lightgray',
    width:'100%',
  },
  profileCamera: {
    width: 22,
    height: 22,
    borderRadius: 17,
    backgroundColor: Colors.ai_gray_02,
    position: 'absolute',
    bottom: 5,
    right: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
