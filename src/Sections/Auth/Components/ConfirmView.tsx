import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppImages} from '../../../utilis/AppConstant';
import {font, FontWeight} from '../../../utilis/AppStyle';
import {AppColors} from '../../../utilis/AppColors';
interface Props {
  onPrivacy : ()=>void,
  onTerms : ()=>void,
  isFill : boolean,
  onFill : ()=>void
}
const ConfirmView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback
      onPress={()=>props.onFill()}
      >
        <Image
          style={{
            ...style.radioStyle,
          }}
          source={props.isFill ? AppImages.Common.radioSelected : AppImages.Common.radioUnselected}
        />
      </TouchableWithoutFeedback>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        Please note that by creating account you accept our
        <TouchableWithoutFeedback
        onPress={()=>props.onTerms()}
        >
          <Text
            style={{
              ...style.btnStyle,
            }}>
            {` Terms & Conditions `}
          </Text>
        </TouchableWithoutFeedback>
        and
        <TouchableWithoutFeedback
        onPress={()=>props.onPrivacy()}
        >
          <Text
            style={{
              ...style.btnStyle,
            }}>
            {` Privacy Policy `}
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  titleStyle: {
    ...font(14),
  },
  btnStyle: {
    ...font(14, FontWeight.SemiBold),
    color: AppColors.primary,
  },
});

export default ConfirmView;
