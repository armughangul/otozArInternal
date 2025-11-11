import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { white } from '../utilis/Colors';

interface Props {
  title: string;
  backgroundColor: any;
  width?: any;
  height?: any;
  onPress(): void;
}
const PrimaryButton = ({
  title,
  backgroundColor,
  width,
  height,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width,
        height: 45,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '800',
          color: white,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
