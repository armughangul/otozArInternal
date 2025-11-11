import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { Primary, white } from '../utilis/Colors';

const CountinueBtn = ({navigation,btnText}:any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('VerificationOTP')}
      style={[styles.countinueBtn, {backgroundColor: Primary}]}>
      <Text style={styles.continueTxt}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default CountinueBtn;

const styles = StyleSheet.create({
    countinueBtn: {
        width: '100%',
        height: 48,
        backgroundColor: 'rgba(21, 152, 149, 1)',
        borderRadius: 24,
        marginBottom: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      continueTxt: {color: white, fontSize: 16, fontWeight: '800'},
});
