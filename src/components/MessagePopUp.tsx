import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {Colors, white} from '../utilis/Colors';

const MessagePopUp = ({visible, message}: any) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default MessagePopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.ai_gray_900,
  },
});
