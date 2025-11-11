import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font} from '../../../../../utilis/AppStyle';
import {AppColors} from '../../../../../utilis/AppColors';
import SimpleInput from '../../../../../components/Input/SimpleInput';
import {OrderManagerType} from '../../../Manager/OrderManager';
import PhoneNumberInput from '../../../../../components/Input/PhoneNumberInput';
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import CommonManager from '../../../../../utilis/CommonManager';
interface Props {
  manager: OrderManagerType | any
}
const AddConsigneeStep = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.descStyle,
        }}>
        Fill in recipient details to ensure smooth delivery.
      </Text>
      <SimpleInput
        value={props.manager.name.current}
        isReadonly={props.manager.obj?.consignee_details != null}
        isCompulsory={true}
        title="Name"
        onChangeValue={txt => (props.manager.name.current = txt)}
      />
      <SimpleInput
        value={props.manager.email.current}
        isReadonly={props.manager.obj?.consignee_details != null}
        isCompulsory={true}
        title="Email"
        onChangeValue={txt => (props.manager.email.current = txt)}
      />
      <PhoneNumberInput
        value={props.manager.phoneNo.current}
        country={props.manager.country}
        onChangeValue={txt => {
          props.manager.phoneNo.current = txt;
        }}
        placeHolder="Number"
        title="Phone Number"
        isCompulsory={true}
      />
      <SimpleInput
        value={props.manager.address.current}
        isReadonly={props.manager.obj?.consignee_details != null}
        isCompulsory={true}
        title="Address"
        onChangeValue={txt => (props.manager.address.current = txt)}
      />
      <SimpleInput
        value={props.manager.passportId.current}
        isReadonly={props.manager.obj?.consignee_details != null}
        isCompulsory={true}
        title="Passport No. / ID Number"
        onChangeValue={txt => (props.manager.passportId.current = txt)}
      />
      <SimpleInput
        value={props.manager.poBox.current}
        isReadonly={props.manager.obj?.consignee_details != null}
        isCompulsory={true}
        title="PO Box"
        onChangeValue={txt => (props.manager.poBox.current = txt)}
      />
      {
        props.manager.obj?.consignee_details == null &&
     <BorderBtn
        btnStyle={{
          ...style.submitBtnStyle,
        }}
        title="Submit"
        onPress={() => {
          props.manager.onConsigneeSubmit()
        }}
        isSelected={true}
      />
      }
 
      <SimpleMsg
        startTxt="Hi"
        midTxt={(CommonManager.shared.currentUser?.first_name ?? '') + ', '}
        endTxt="For shipping purpose, please add your consignee details. We will then arrange the booking with a shipping company for your car."
      />
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  descStyle: {
    ...font(14),
    color: AppColors.descColor,
    marginTop: 15,
  },
  submitBtnStyle: {
    marginTop: 20,
  },
});
export default AddConsigneeStep;
