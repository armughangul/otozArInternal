import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { orange } from '../utilis/Colors';

interface Props {
  title: string;
  backgroundColor: any;
  width: any;
  height: any;
  image: any;
  onClick(): void;
}
const SecondaryButton = ({
  title,
  backgroundColor,
  width,
  height,
  image,
  onClick,
}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#C3C3C3',
        borderWidth: 1,
      }}>
      <Image
        resizeMode="contain"
        style={{width: 24, height: 24, marginBottom: 2, tintColor: orange}}
        source={image}
      />
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#113551'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({});
