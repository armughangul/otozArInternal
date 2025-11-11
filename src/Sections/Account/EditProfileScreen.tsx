import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppStyle} from '../../utilis/AppStyle';
import {AppImages, dateFormater, ScreenProps} from '../../utilis/AppConstant';
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea';
import EditProfileTopView from './Components/Edit/EditProfileTopView';
import SimpleInput from '../../components/Input/SimpleInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DobView from './Components/Edit/DobView';
import GenderView from './Components/Edit/GenderView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SimpleInputDropDown from '../../components/Input/SimpleInputDropDown';
import PaddingView from '../../components/Padding/PaddingView';
import CommonManager from '../../utilis/CommonManager';
import DropDownModal from '../Journey/Components/DropDown/DropDownModal';
import PhoneNumberInput from '../../components/Input/PhoneNumberInput';
import AddressView from './Components/Edit/AddressView';
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea';
import ChangePassView from './Components/Edit/ChangePassView';
import BgBtn from '../../components/BgBtn/BgBtn';
import BorderBtn from '../../components/BorderBtn/BorderBtn';
import moment from 'moment';
import TopBar from '../../components/TopBar/TopBar';
import EditProfileManger from './Manager/EditProfileManager';
import DeleteAccountView from './Components/Edit/DeleteAccountView';
import DeleteAccountPopUp from './Components/Edit/DeleteAccount/DeleteAccountPopup';

const EditProfileScreen = (props: ScreenProps) => {
  const manager = EditProfileManger();
  return (
    <ImageBackground
      source={AppImages.Home.background}
      style={{
        ...style.mainView,
      }}>
      <TopAppSafeArea />
      <TopBar title="My Profile" onBack={() => props.navigation.goBack()} />
      <View
        style={{
          ...AppStyle.paddingView,
        }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <EditProfileTopView manager={manager} props={props} />
          <SimpleInput
            title="Name"
            placeHolder="Enter Name"
            onChangeValue={txt => (manager.nameRef.current = txt)}
            value={manager.selector.appUser.first_name}
          />
          <SimpleInput
            isReadonly={true}
            title="Email"
            placeHolder="Enter Email"
            value={manager.selector.appUser.email}
          />
          <DobView
            date={manager.date}
            onDate={() => {
              manager.setOpenDatePicer(true);
            }}
            title="Date of birth"
          />
          <GenderView manager={manager} />
          <View
            style={{
              ...AppStyle.commonHoriStyle,
            }}>
            <SimpleInputDropDown
              value={manager.country?.name ?? ''}
              placeHolder="Select Country"
              title="Country"
              isCompulsory={true}
              onPress={() => {
                manager.setModelObj({
                  show: true,
                  data: CommonManager.shared.countriesList,
                  title: 'Countries',
                  type: 0,
                });
              }}
            />
            <PaddingView width={20} />
            <SimpleInputDropDown
              value={manager.port?.name ?? ''}
              placeHolder="Select Port"
              title="Port"
              isCompulsory={true}
              onPress={() => {
                manager.setModelObj({
                  show: true,
                  data: manager.portListRef.current,
                  title: 'Ports',
                  type: 1,
                });
              }}
            />
          </View>
          <PhoneNumberInput
            value={manager.phoneNo.current}
            country={manager.country}
            onChangeValue={txt => {
              manager.phoneNo.current = txt;
            }}
            placeHolder="Number"
            title="Phone Number"
            isCompulsory={true}
          />
          <AddressView manager={manager} />
          <ChangePassView onChange={() => manager.onChange(props)} />
         <DeleteAccountView onDelete={() => manager.setShowDelete(true)} />
        </KeyboardAwareScrollView>
        <View
          style={{
            ...style.horiMainView,
          }}>
          <BgBtn
            btnStyle={{
              ...style.btnStyle,
            }}
            onPress={() => {
              manager.onLogout(props)
            }}
            title="Logout"
          />
          <PaddingView width={15} />
          <BorderBtn
            isSelected={true}
            btnStyle={{
              ...style.btnStyle,
            }}
            onPress={() => {
              manager.onEditProfile(props);
            }}
            title="Save Changes"
          />
        </View>
        <BottomAppSafeArea />
      </View>
      <DateTimePickerModal
        display={'inline'}
        date={new Date()}
        maximumDate={new Date()}
        isVisible={manager.openDatePicker}
        mode="date"
        onConfirm={date => {
          if (date) {
            manager.settingDate(moment(date).format(dateFormater.date));
            manager.setOpenDatePicer(false);
          }
        }}
        onCancel={() => manager.setOpenDatePicer(false)}
      />
      {manager.modelObj && (
        <DropDownModal
          onSelect={index => {
            manager.onSelectItem(index);
          }}
          onClose={() => {
            manager.setModelObj(null);
          }}
          model={manager.modelObj}
        />
      )}
         {manager.showDelete && (
        <DeleteAccountPopUp
          onClose={() => {
             manager.setShowDelete(false)
          }}
          onCofirm={()=>{
            manager.setShowDelete(false)
            manager.onDelete(props)
          }}
        />
      )}
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...AppStyle.mainView,
  },
  horiMainView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnStyle: {
    flex: 1,
  },
});

export default EditProfileScreen;
