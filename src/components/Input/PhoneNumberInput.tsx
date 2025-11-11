import React, { useEffect, useRef } from 'react';
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
import { CountryModel } from '../../Model/CountryModel';
import { IMAGE_BASE_URL, IMAGE_COUNTRY_CODE_BASE_URL, IMAGE_MAKES_BASE_URL } from '../../Network/Urls';
import AppImageView from '../AppImageView/AppImageView';
interface Props {
  title?: string;
  value?: string;
  isCompulsory?: boolean;
  placeHolder: string;
  country? : CountryModel | null,
  onChangeValue : (txt : string)=>void
}
const PhoneNumberInput = (props: Props) => {
 const inputRef = useRef<TextInput>(null)
    useEffect(()=>{
        if (props.value && inputRef){
            inputRef.current?.setNativeProps({text : props.value})
        }
    },[])
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

        <View
          style={{
            ...style.inputView,
          }}>
            <View
            style = {{
                ...style.countryView
            }}
            >
                {props.country && props.country.flag != '' && (
            <AppImageView
              style={{
                ...style.countryFlagView
              }}
              source={IMAGE_COUNTRY_CODE_BASE_URL + props.country.flag}
            />
          )}
            </View>
                <TextInput
                ref = {inputRef}
                onChangeText={(txt)=>{
                  props.onChangeValue(txt)
                }}
                placeholder={props.placeHolder}
                keyboardType={"phone-pad"}
                style = {{
                    ...style.inputFieldStyle
                }}
                />
        </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
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
    flexDirection: 'row',
  },
  phoneField : {
    flex : 1,
  },
  inputFieldStyle: {
    flex: 1,
    ...font(14),
     borderRadius : 8,
    borderColor: AppColors.primary,
    borderWidth: 1,
        paddingHorizontal : 8
  },
    placeHolderStyle: {
    flex: 1,
    ...font(14),
    color : AppColors.txtLightColor
  },
  dropDownImg: {
    height: 6,
    width: 10,
    resizeMode: 'contain',
  },
  countryView : {
    width : 69,
    padding : 5,
    borderRadius : 8,
    borderColor: AppColors.primary,
    borderWidth: 1,
    marginRight : 10,
    justifyContent : "center",
    alignItems : "center",
  },
  countryFlagView : {
    resizeMode : "contain",
    height : 30,
    width : 30,
  }
});

export default React.memo(PhoneNumberInput);
