import React from 'react';
import {View, TextInput, Text, StyleSheet, KeyboardType} from 'react-native';
import {Colors, white} from '../utilis/Colors';

interface Props {
  title: string;
  value?: string;
  onChange(text: string): void;
  keyboardType?: KeyboardType;
  placeholder?: any;
  maxLength?: any;
}

const TitleInput2: React.FC<Props> = ({
  title,
  value,
  keyboardType,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
        {/* <Text style={styles.staric}> *</Text> */}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
        placeholder={placeholder}
        maxLength={maxLength}
        placeholderTextColor={'gray'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.ai_gray_900,
  },
  staric: {
    fontSize: 12,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: Colors.ai_gray_900,
    fontSize: 14,
  },
});

export default TitleInput2;
