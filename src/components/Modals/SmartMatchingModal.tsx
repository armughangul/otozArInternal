import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors, white} from '../../utilis/Colors';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

interface SmartMatchingModalProps {
  isError?: boolean;
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onPress: () => void;
}

const SmartMatchingModal: React.FC<SmartMatchingModalProps> = ({
  visible,
  onCancel,
  onPress,
}) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Image
            source={require('../../assets/icons/smartmatching.png')}
            style={{
              tintColor: Colors.ai_gray_900,
              width: 80,
              height: 80,
              marginVertical: 50,
            }}></Image> */}

          <LottieView
            source={require('../../assets/lottie/Smart_matchiing_animation.json')}
            style={{width: '100%', height: 140, marginTop: 10}}
            autoPlay
            loop
          />
          <Text style={styles.headerText}>Match smartly your next car</Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.ai_gray_150,
              textAlign: 'center',
              width:'90%',
            }}>
            Get in touch and we’ll help you find the right car based on your
            lifestyle or budget needs.
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              marginTop: 45,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => onCancel()}
              style={{
                backgroundColor: '#eaf7ff',
                width: '45%',
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: Colors.ai_gray_900,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress()}
              style={{
                backgroundColor: '#3898ec',
                width: '45%',
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: Colors.ai_white_900,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: white,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
    paddingBottom: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:15,
    color: '#123652',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#123652',
  },
  button: {
    backgroundColor: Colors.ai_yellow_500,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: white,
    fontSize: 16,
  },
  SignInTitle: {
    color: 'rgba(21, 152, 149, 1.9)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  fields: {
    flexDirection: 'column',
    marginBottom: 30,
    width: '90%',
  },
  InputSection: {
    width: '90%',
    // height: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SmartMatchingModal;
