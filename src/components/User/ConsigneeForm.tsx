import {Image, StyleSheet, TextInput, View, KeyboardType} from 'react-native';
import React from 'react';
interface Props {
  title: string;
  value?: any;
  onChange(text: string): void;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  maxLength?: any;
  showError?: boolean;
  icon?: any;
}
const ConsigneeForm: React.FC<Props> = ({
  title,
  value,
  icon,
  keyboardType,
  onChange,
  secureTextEntry,
  maxLength,
  showError,
}) => {
  return (
    <View
      style={{
        width: '90%',
        height: 40,
        marginTop: 15,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      <TextInput
        placeholder={title}
        placeholderTextColor={'#13334C'}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={{
          width: '90%',
          height: 45,
          alignSelf: 'center',
          color: '#13334C',
        }}
      />
      <Image
        resizeMode="contain"
        style={{width: 20, height: 20, tintColor: '#123652'}}
        source={icon}
      />
    </View>
  );
};

export default ConsigneeForm;

const styles = StyleSheet.create({});
