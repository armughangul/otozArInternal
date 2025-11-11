import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { Colors, white } from '../utilis/Colors';
interface Props {
  title: string;
  onClick(): void;
  icon: any;
}

const OtozButton = ({title, onClick, icon}: Props) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: 175,
        height: 50,
        backgroundColor: Colors.ai_gray_900,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        

      }}>
      {icon?<Image
        resizeMode="contain"
        style={{width: 30, height: 30, tintColor:white}}
        source={require('../assets/icons/smartmatching.png')}
      />:null}
      <Text style={{color: white, fontSize: 18, marginLeft:10}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OtozButton;

const styles = StyleSheet.create({});
