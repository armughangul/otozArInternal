import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from '../utilis/Colors';

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxFlatListProps {
  data: any;
  onChange: (selectedValues: string[]) => void;
}

const CheckboxFlatList: React.FC<CheckboxFlatListProps> = ({
  data,
  onChange,
}) => {
  const [checkboxData, setCheckboxData] = useState<CheckboxItem[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      setCheckboxData(data?.map((item: any) => ({...item, checked: false})));
    }
  }, [data]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedData = checkboxData.map(item =>
      item.id === id ? {...item, checked: checked} : item,
    );
    setCheckboxData(updatedData);
    onChange(updatedData.filter(item => item.checked).map(item => item.id));
  };

  const CheckboxItem: React.FC<{item: CheckboxItem}> = ({item}) => {
    const toggleCheckbox = () => {
      const newChecked = !item.checked;
      handleCheckboxChange(item.id, newChecked);
    };

    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={toggleCheckbox}>
        {item.checked ? (
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/checked.png')}
          />
        ) : (
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/unchecked.png')}
          />
        )}

        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={checkboxData}
        renderItem={({item}) => <CheckboxItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ai_gray_01,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CheckboxFlatList;
