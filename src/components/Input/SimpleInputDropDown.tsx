import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppStyle, font} from '../../utilis/AppStyle';
import {AppColors} from '../../utilis/AppColors';
import {AppImages} from '../../utilis/AppConstant';
interface Props {
  title?: string;
  value?: string;
  onPress?: () => void;
  isCompulsory?: boolean;
  placeHolder: string;
}
const SimpleInputDropDown = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        {props.title}
        {props.isCompulsory && (
          <Text
            style={{
              ...style.compulsoryStyle,
            }}>
            {' '}
            *
          </Text>
        )}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => props.onPress && props.onPress()}>
        <View
          style={{
            ...style.inputView,
          }}>
            <Text
            style = {{
                ... props.value && props.value != "" ?  style.inputFieldStyle : style.placeHolderStyle
            }}
            >
                {props.value && props.value != "" ? props.value : props.placeHolder}
            </Text>
          <Image
            style={{
              ...style.dropDownImg,
            }}
            source={AppImages.Common.dropDown}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 20,
  },
  titleHori: {
    ...AppStyle.commonHoriStyle,
  },
  titleStyle: {
    ...font(14),
  },
  compulsoryStyle: {
    color: AppColors.redColor,
  },
  inputView: {
    marginTop: 10,
    height: 48,
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  inputFieldStyle: {
    flex: 1,
    ...font(14),
  },
    placeHolderStyle: {
    flex: 1,
    ...font(14),
    color : AppColors.txtLightColor
  },
  dropDownImg: {
    height: 9,
    width: 16,
    resizeMode: 'contain',
    marginRight : 10
  },
});

export default React.memo(SimpleInputDropDown);
