import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const CategoryButton = () => {
  const [makes, setMakes] = useState(true);
  const [body, setBody] = useState(false);
  const handleMakes = () => {
    setMakes(true);
    setBody(false);
  };

  const handleBody = () => {
    setMakes(false);
    setBody(true);
  };

  return (
    <TouchableOpacity
      onPress={() => handleMakes()}
      style={[styles.browseTab, makes && styles.activeTab]}>
      <Text style={[styles.tabText, makes && styles.activeTabText]}>Makes</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  browseTabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 0.8,
    borderColor: '#C3C3C3',
    width: '100%',
  },
  browseTab: {
    borderBottomWidth: 2,
    borderColor: '#F8B50E',
    zIndex: -1,
  },
  activeTab: {
    zIndex: 1,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#113551',
  },
  activeTabText: {
    color: '#F8B50E',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
