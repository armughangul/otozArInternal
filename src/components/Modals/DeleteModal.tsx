import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors, white} from '../../utilis/Colors';
import LottieView from 'lottie-react-native';
import {store, useAppDispatch} from '../../redux/store';
import {
  logoutUser,
  setExploreOnly,
  setProfileImg,
} from '../../redux/Reducers/userReducers';
import appServices from '../../app-services/appServices';

interface SimpleInfoModalProps {
  showClose?: boolean;
  isError?: boolean;
  visible: boolean;
  message: string;
  onClose: () => void;
}

const DeleteModal: React.FC<SimpleInfoModalProps> = ({
  visible,
  message,
  onClose,
  showClose = true,
}) => {
  //   useEffect(() => {

  //     if (visible) {
  //       const timeout = setTimeout(() => {
  //         onClose();
  //       }, 3000); // Close the modal after 3 seconds
  //       return () => clearTimeout(timeout);
  //     }
  //   }, [visible, onClose]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<any>(false);

  const performLogoutActions = () => {
    // console.log('performLogoutActions')
    onClose();
    store.dispatch(logoutUser(''));
    store.dispatch(setExploreOnly(false));
    store.dispatch(setProfileImg(''));
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await appServices.deleteAccount();
      if (response.status === 200) {
        console.log('Account deleted successfully', response.status);

        performLogoutActions();
      } else {
        performLogoutActions();
        console.log('Unexpected response:', response);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized. Please log in again.');
        performLogoutActions();
      } else {
        const errorMessage = error.message || 'Account deletion failed';
        console.log('Error message:', errorMessage);
        performLogoutActions();
      }
    }
    setLoading(false);
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
              height: 80,
              backgroundColor: Colors.ai_gray_900,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../../assets/lottie/Animation.json')}
              style={{width: 100, height: 100, marginTop: 5}}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.headerText}>Otoz Ai</Text>
          <Text style={[styles.messageText, {marginBottom: 10, marginTop: 10}]}>
            Are you sure you want to permanently delete your account? This
            action cannot be undone, and all your data, preferences, and saved
            information will be lost.
          </Text>
          <Text style={[styles.messageText, {marginBottom: 40}]}>
            Please confirm if you'd like to proceed with the deletion of your
            account.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={[styles.button,{backgroundColor:'white', borderColor:Colors.ai_gray_900, borderWidth:1,}]} onPress={onClose}>
              <Text style={[styles.buttonText, {color:Colors.ai_gray_900}]}>Cancel</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>DeleteModal()} style={[styles.button,{backgroundColor:'white', borderColor:'red', borderWidth:1}]} >
              <Text style={[styles.buttonText,{color:'red'}]}>Confirm Delete</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={[
                styles.button,
                {backgroundColor: 'white', borderColor: 'red', borderWidth: 1},
              ]}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="red" />
              ) : (
                <Text style={[styles.buttonText, {color: 'red'}]}>
                  Delete Account
                </Text>
              )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#123652',
    marginTop: 30,
  },
  messageText: {
    fontSize: 16,
    width: '90%',
    marginBottom: 20,
    textAlign: 'center',
    color: '#123652',
  },
  button: {
    backgroundColor: Colors.ai_yellow_500,
    padding: 10,
    width: '48%',
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DeleteModal;
