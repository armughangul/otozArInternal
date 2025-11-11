import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '../../../utilis/AppConstant';
import {Routes} from '../../../utilis/Routes';
import {CountryModel} from '../../../Model/CountryModel';
import {PortModel} from '../../../Model/PortModel';
import SelectionDropDownModel from '../../../Model/SelectionDropDownModel';
import CommonManager from '../../../utilis/CommonManager';
import {Alert, PermissionsAndroid, Platform, TextInput} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AppStrings} from '../../../utilis/AppStrings';
import {setAppUser, setLoading} from '../../../redux/Reducers/AppReducer';
import ImageResizer from 'react-native-image-resizer';
import {deleteAccountApi, editProfileApi} from '../../../Network/Services/AuthService';
import {UserModel} from '../../../Model/UserModel';

const EditProfileManger = () => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.appReducer);
  let userData: UserModel = selector.appUser;
  const [country, setCountry] = useState<CountryModel>();
  const [port, setPort] = useState<PortModel>();
  const [modelObj, setModelObj] = useState<SelectionDropDownModel | null>();
  const [date, setDate] = useState({
    day: '',
    month: '',
    year: '',
  });
  const [openDatePicker, setOpenDatePicer] = useState(false);
  const [userImage, setUserImage] = useState<any>(userData.image ?? '');
  const [gender, setGender] = useState(0);
  const portListRef = useRef<PortModel[]>([]);
  const nameRef = useRef<string>(userData.first_name);
  const phoneNo = useRef<string>(userData.phone_no ?? '');
  const updatedUri = useRef<string>('');
  const address = useRef<string>('');
  const portIdRef = useRef<number>(userData.port ?? -1);
  const editTxtInputRef = useRef<TextInput>(null);
  const [showDelete,setShowDelete] = useState(false)
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    if (country){
            generatePortList();
    }
  }, [country]);
  const initialize = () => {
    updatedUri.current = '';
    address.current = userData.address
    setGenderIndex(userData.gender);
    if (userData.dob && userData.dob != '') {
      let dobSplit = userData.dob.split('/');
      if (dobSplit.length == 3) {
        setDate({
          day: dobSplit[0],
          month: dobSplit[1],
          year: dobSplit[2],
        });
      }
    }
    let findedCountry = CommonManager.shared.countriesList.find((item)=>item.id == userData.country.id)
    if (findedCountry){
        setCountry(findedCountry)
    }
     if (editTxtInputRef){
        editTxtInputRef.current?.setNativeProps({text : address.current})
        }
  };
  const setGenderIndex = (gender: string) => {
    if (gender.toLowerCase() == 'female') {
      setGender(1);
      return;
    }
    if (gender.toLowerCase() == 'male') {
      setGender(0);
      return;
    }
    if (gender.toLowerCase() == '') {
      setGender(0);
      return;
    }
    setGender(2);
  };
  const generatePortList = () => {
    let portList = CommonManager.shared.portList.filter(
      port => port.country.id == country?.id,
    );
    portListRef.current = portList;
        console.log("generating port ",portIdRef.current,portListRef.current)
    if (portIdRef.current != -1) {
      let findObj = portListRef.current.find(
        item => item.id == portIdRef.current,
      );
      if (findObj) {
        console.log("port found")
        setPort(findObj);
      }
      portIdRef.current = -1;
    } else {
      setPort(undefined);
    }
  };
  const onSelectItem = (index: number) => {
    if (modelObj?.type == 0) {
      setCountry(CommonManager.shared.countriesList[index]);
    } else {
      setPort(portListRef.current[index]);
    }
    setModelObj(null);
  };
  const uploadImage = (uri: string) => {
    updatedUri.current = uri;
    setUserImage(uri);
  };
  const handleImageSelection = async (
    useCamera: boolean,
    props: ScreenProps,
  ) => {
    try {
      const options: any = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      };

      const response = useCamera
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      if (response.didCancel) return;
      if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log('current finding image asset is ', asset.uri);
        props.navigation.push(Routes.ImageCropScreen, {
          uri: asset.uri,
          onCropImage: (uri: string) => uploadImage(uri),
        });
        // setFormData(prev => ({...prev, image: uri}));
      }
    } catch (error) {
      console.error('Image selection error:', error);
    }
  };
  // Request camera permissions (Android)
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
  const showImagePickerOptions = async (props: ScreenProps) => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    Alert.alert(
      'Select Image',
      'Choose your profile picture source',
      [
        {
          text: 'Camera',
          onPress: () => handleImageSelection(true, props),
        },
        {
          text: 'Gallery',
          onPress: () => handleImageSelection(false, props),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const onChange = (props: ScreenProps) => {
    props.navigation.push(Routes.ChangePasswordScreen);
  };
  const settingDate = (date: string) => {
    let strList = date.split('/');
    if (strList.length > 0) {
      setDate({
        day: strList[0],
        month: strList[1],
        year: strList[2],
      });
    }
  };
  const compressImage = async (image: {
    uri: string;
    name: string;
    type: string;
  }) => {
    console.log('📦 Compressing image:', image.uri);

    const resized = await ImageResizer.createResizedImage(
      image.uri,
      100,
      100,
      'JPEG',
      50,
    );

    console.log('🗜️ Resized Image URI:', resized.uri);

    return {
      uri: resized.uri,
      type: 'image/jpeg',
      name: resized.name || 'compressed.jpg',
    };
  };

  const onEditValidation = () => {
    if (nameRef.current == '' || phoneNo.current == '') {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.fields);
      return false;
    }
    if (country == null) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.countryError,
      );
      return false;
    }
    if (
      !CommonManager.shared.validatePhoneNumber(
        country.phone_regex,
        phoneNo.current,
      )
    ) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.phoneNo +
          ' example like ' +
          country.example_phone,
      );
      return false;
    }
    return true;
  };
  const onEditProfile = async (props: ScreenProps) => {
    if (onEditValidation()) {
      dispatch(setLoading(true));
      let params = new FormData();
      if (updatedUri.current !== '') {
        const image = await compressImage({
          uri: updatedUri.current,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
        params.append('user[image]', {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      params.append('user[first_name]', nameRef.current);
      params.append('user[phone_no]', phoneNo.current);
      params.append('user[country]', country?.id.toString());
      params.append('user[address]', address.current);
      if (date.day != '') {
        params.append(
          'user[dob]',
          date.day + '/' + date.month + '/' + date.year,
        );
      }
      params.append(
        'user[gender]',
        gender == 0 ? 'male' : gender == 1 ? 'female' : 'other',
      );
      if (port) {
        params.append('user[port]', port.id);
      }
      dispatch(setLoading(true));
      editProfileApi(params)
        .then(response => {
          console.log('success is ', response);
          if (response?.user) {
            dispatch(setAppUser(response?.user));
            CommonManager.shared.setUser(response?.user);
            CommonManager.shared.showMessage('Profile Updated successfully.', 1);
            props.navigation.goBack()
          }
        })
        .catch(response => {
          console.log('error msg is ', response);
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showMessage(msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  const onLogout = (props : ScreenProps)=>{
     dispatch(setAppUser(null));
    CommonManager.shared.deleteUser();
    props.navigation.reset({
      index : 0,
      routes : [{
        name : Routes.Container
      }]
    })
    CommonManager.shared.showMessage("Now you are in guest mode",1)
  }
  const onDelete = (props : ScreenProps)=>{
      dispatch(setLoading(true));
      deleteAccountApi().then(()=>{
        onLogout(props)
      })
      .finally(()=>{
              dispatch(setLoading(false));
      })
  }
  return {
    selector,
    date,
    setDate,
    openDatePicker,
    setOpenDatePicer,
    gender,
    setGender,
    country,
    setCountry,
    port,
    setPort,
    modelObj,
    setModelObj,
    portListRef,
    onSelectItem,
    phoneNo,
    onChange,
    settingDate,
    showImagePickerOptions,
    userImage,
    setUserImage,
    nameRef,
    onEditProfile,
    address,
    editTxtInputRef,
    onLogout,
    showDelete,setShowDelete,
    onDelete
  };
};

export default EditProfileManger;
export type EditProfileMangerType = ReturnType<typeof EditProfileManger>;
