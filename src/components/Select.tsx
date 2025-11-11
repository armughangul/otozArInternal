import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../utilis/Colors';

interface Item {
  label: string;
  value: string;
}

interface Props {
  title: string;
  selectedValue?: any;
  onValueChange(value: any): void;
  items: Item[];
}

const Select: React.FC<Props> = ({
  title,
  selectedValue,
  onValueChange,
  items,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {title}
        <Text style={styles.staric}> *</Text>
      </Text>
      <View
        style={{
          borderColor: '#C3C3C3',
          borderWidth: 1,
          borderRadius: 5,
          // padding: 2,
          // height: 40,
        }}>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={selectedValue}
          onValueChange={onValueChange}
          items={items?.map(item => ({label: item.label, value: item.value}))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 2,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.ai_gray_900,
    
  },
  staric: {
    fontSize: 12,
    color: 'red',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 2,
    paddingHorizontal: 10,
    color: '#113551',
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#113551',
    borderRadius: 8,
  },
});

export default Select;
