import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import { Colors, orange, white } from '../utilis/Colors';

interface Props {
  onClickInquiry(): void;
}

const BottomActions = ({onClickInquiry}: Props) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={onClickInquiry}
        style={{
          width: '100%',
          height: 30,
          backgroundColor: Colors.ai_gray_900,
          borderRadius: 5,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>

        <Text
          style={{
            color: white,
            fontSize: 14,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Inquiry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActions;

const styles = StyleSheet.create({});
