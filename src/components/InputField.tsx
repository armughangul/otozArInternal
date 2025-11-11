import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardType,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, white} from '../utilis/Colors';
interface Props {
  title: string;
  value?: any;
  onChange(text: string): void;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  maxLength?: any;
  showError?:boolean;
}
const InputField: React.FC<Props> = ({
  title,
  value,
  keyboardType,
  onChange,
  secureTextEntry,
  maxLength,
  showError
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.input,{borderColor:showError?'red': 'lightgray',}]}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordVisible}
          placeholder={`${title}`}
          placeholderTextColor="lightgray"
          maxLength={maxLength}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              style={styles.icon}
              source={
                isPasswordVisible
                  ? require('../assets/icons/eyeclose.png')
                  : require('../assets/icons/eyeopen.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    // width: '100%',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
    color: Colors.ai_gray_900,
  },
  staric: {
    fontSize: 14,
    color: 'red',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 8,
    // backgroundColor:'red'
  },
  icon: {width: 25, height: 25, tintColor: Colors.ai_gray_900},
  input: {
    height: 40,
    
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: Colors.ai_gray_900,
    fontSize: 16,
    width: '100%',
  },
  // errorBorder: {
  //   borderColor: 'red',
  // },
});

export default InputField;