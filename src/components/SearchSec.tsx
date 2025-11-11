import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';

interface Props {
  onClickFilter(): any;
}
const SearchSec = ({onClickFilter}: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '85%',
        height: 54,
        alignSelf: 'center',
        marginTop: 12,
        borderRadius: 10,
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity>
        <Image
          source={require('../assets/icons/search.png')}
          style={{
            width: 22,
            height: 22,
            marginLeft: 15,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 12,
          flex: 1,
          marginLeft: 5,
          color: '#123652',
        }}>
        Search for your favorite cars
      </Text>

      <TouchableOpacity onPress={onClickFilter}>
        <Image
          source={require('../assets/icons/filter.png')}
          style={{
            width: 22,
            height: 22,
            marginHorizontal: 15,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};
export default SearchSec;
