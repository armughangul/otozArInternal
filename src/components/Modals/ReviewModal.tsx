import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Colors, white } from '../../utilis/Colors';
import { AirbnbRating } from 'react-native-ratings';
import MultilineTextField from '../MultilineTextField';
import appServices from '../../app-services/appServices';
import SimpleInfoModal from './SimpleInfoModal';

interface SimpleInfoModalProps {
  showClose?: boolean;
  isError?: boolean;
  visible: boolean;
  onClose: () => void;
  messageTxt: string;
  onSubmit: any;
}

const ReviewModal: React.FC<SimpleInfoModalProps> = ({
  visible,
  onClose,
  messageTxt,
  onSubmit,
}) => {
  const [messageText1, setMessageText1] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  // Function to handle rating completion
  const handleRatingCompleted = (ratingValue: number) => {
    setRating(ratingValue);
    console.log('ratingValue', ratingValue)
  };

  const submitReview = async () => {
    if (!rating || !messageText1.trim()) {
      setMessage('Please provide a rating and feedback.');
      setShowError(true);
      return;
    }
  
    try {
      const reviewData = {
        rating,
        message: messageText1,
      };
  
      const id = 123; // Replace with the appropriate ID (e.g., inquiry ID) passed to the modal
      const response = await appServices.buyerReviews(id, reviewData);
      console.log('responseeeeeeeeeeeeee', response)
  
      Alert.alert('Success', 'Thank you for your feedback!', [
        { text: 'OK', onPress: onClose },
      ]);
      setMessageText1('');
      setRating(null);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Unable to submit review. Please try again.');
      setShowError(true);
    }
  };

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
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingEnd: 20,
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{ width: 20, height: 20 }}>
              <Image
                resizeMode="contain"
                style={{ width: 20, height: 20, tintColor: 'lightgray' }}
                source={require('../../assets/icons/close.png')}
              />
            </TouchableOpacity>
          </View>
          <Image
            resizeMode="contain"
            style={styles.logoImg}
            source={require('../../assets/clogodark.png')}
          />
          <AirbnbRating
            count={5}
            reviews={['Fair', 'Average', 'Good', 'Very Good', 'Amazing']}
            defaultRating={0}
            selectedColor="#F8B50E"
            reviewColor="#F8B50E"
            size={20}
            reviewSize={16}
            showRating={true}
            onFinishRating={handleRatingCompleted}
            starContainerStyle={{}}
            ratingContainerStyle={{ marginBottom: 15 }}
          />

          <Text style={[styles.messageText, { marginBottom: 10 }]}>
            {messageTxt}
          </Text>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              padding: 15,
            }}>
            <MultilineTextField
              title="Comment / Feedback"
              value={messageText1}
              onChangeText={setMessageText1}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={submitReview}>
            <Text style={[styles.buttonText, {}]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SimpleInfoModal
        visible={showError}
        message={message}
        showClose={false}
        onClose={() => setShowError(false)}
      />
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
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
    paddingVertical: 30,
  },
  messageText: {
    fontSize: 16,
    width: '85%',
    marginBottom: 20,
    textAlign: 'center',
    color: '#123652',
  },
  button: {
    backgroundColor: Colors.ai_yellow_500,
    justifyContent: 'center',
    width: '48%',
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  logoImg: {
    width: 162,
    height: 50,
    alignSelf: 'center',
  },
});

export default ReviewModal;
