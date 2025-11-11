import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { Colors, Primary } from '../utilis/Colors';
  const ScreensButton = ({title, navigation, screen, img}:any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(screen)}
        style={styles.drawerButton}>
        <Image
          source={img}
          resizeMode='contain'
          style={{height: 20, width: 20, marginLeft:10, }}
        />
        <Text style={{fontWeight: '600', color: Colors.ai_gray_900, fontSize: 12, marginLeft:10,}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  export default ScreensButton;
  
  const styles = StyleSheet.create({
    button: {
      borderRadius: 25,
      width: 200,
      height: 50,
      paddingLeft: 10,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      backgroundColor: '#EDEDED',
    },
    drawerButton:{
      width: '100%',
      height: 35,
      shadowRadius: 2,
      shadowOpacity: 2,
      elevation: 2,
      borderColor: Primary,
      alignSelf: 'center',
      padding: 5,
      marginTop: 10,
      shadowColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
  