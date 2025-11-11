import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, white} from '../../utilis/Colors';
import LottieView from 'lottie-react-native';

interface SimpleInfoModalProps {
  showClose?: boolean;
  isError?: boolean;
  visible: boolean;
  message: string;
  onClose: () => void;
}

const SimpleInfoModal: React.FC<SimpleInfoModalProps> = ({
  visible,
  message,
  onClose,
  showClose = true,
}) => {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000); // Close the modal after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              width: '100%',
              height: 80,
              backgroundColor: Colors.ai_gray_900,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              alignItems:'center',
              
            }}>
            <LottieView
              source={require('../../assets/lottie/Animation.json')}
              style={{width: 100, height:100, marginTop: 5, }}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.headerText}>Otoz.Ai</Text>
          <Text style={styles.messageText}>{message}</Text>
          {showClose && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: white,
    borderRadius: 20,
    // padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: 280,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#123652',
    marginTop: 30,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#123652',
    width:'90%',
  },
  button: {
    backgroundColor: Colors.ai_yellow_500,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:30,
  },
  buttonText: {
    color: white,
    fontSize: 16,
  },
});

export default SimpleInfoModal;
