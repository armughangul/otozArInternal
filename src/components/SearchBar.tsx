import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import { orange } from '../utilis/Colors';

interface Props {
  // searchValue: string;
  onChange(value: string): void;
  onClickMic(): void;
  onClickFilter(): any;
  showMic?: boolean;
  showFilter?: boolean;
}

const SearchBar = ({
  // searchValue,
  onChange,
  onClickMic,
  onClickFilter,
  showMic = false,
  showFilter = true,
}: Props) => {
  return (
    <TouchableOpacity onPress={onClickFilter}
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
            tintColor:orange
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>

      {/* <TextInput
        placeholder="Search for your Favorite cars"
        placeholderTextColor="#123652"
        value={searchValue}
        style={{
          fontSize: 12,
          flex: 1,
          marginLeft: 5,
          color: '#123652',
        }}
      /> */}
      <Text style={{
          fontSize: 12,
          flex: 1,
          marginLeft: 10,
          color: '#123652',
        }}>Search for your favorite cars</Text>

      {showMic && (
        <TouchableOpacity 
        // onPress={onClickMic}
        onPress={onClickFilter}>
          <Image
            source={require('../assets/icons/microphone.png')}
            style={{
              width: 22,
              height: 22,
              marginHorizontal: 15,
              tintColor:orange
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      {showFilter && (
        <TouchableOpacity onPress={onClickFilter}>
          <Image
            source={require('../assets/icons/filter.png')}
            style={{
              width: 22,
              height: 22,
              marginHorizontal: 15,
              tintColor:orange
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default SearchBar;
