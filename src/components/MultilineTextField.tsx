import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { Colors } from '../utilis/Colors';

interface Props {
  title: string;
  value?: string;
  onChangeText(text: string): void;
}

const MAX_LENGTH = 400;

const MultilineTextField: React.FC<Props> = ({title, value, onChangeText}) => {
  const [desc, setDesc] = useState<string>(value || '');
  const [descError, setDescError] = useState<boolean>(false);
  const [remainingChars, setRemainingChars] = useState<number>(MAX_LENGTH);

  useEffect(() => {
    setDesc(value || '');
    setRemainingChars(MAX_LENGTH - (value?.length || 0));
  }, [value]);

  const handleTextChange = (text: string) => {
    setDesc(text);
    onChangeText(text);
    setRemainingChars(MAX_LENGTH - text.length);
    if (text.length > 0) {
      setDescError(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
      <Text style={styles.label}>{title}</Text>
      <Text
        style={{
          fontFamily: 'mplus-1c-regular',
          fontSize: 10,
          color:'gray',
          marginRight:10
        }}>
        {remainingChars}/{MAX_LENGTH}
      </Text>
      </View>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={desc}
        maxLength={MAX_LENGTH}
        // onChangeText={onChangeText}
        onChangeText={handleTextChange}
        textAlignVertical="top"
        inputProps={{maxLength: MAX_LENGTH}}
        onChange={e => {
          setDesc(e.target.value);
          if (value.length > 0) {
            setDescError(false);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.ai_gray_900,
    marginBottom: 5,
    fontWeight: '600',

  },
  input: {
    height: 120, // Adjust the height as needed
    borderColor: '#C3C3C3',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#113551',
  },
});

export default MultilineTextField;
