import React, {useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppStyle, font} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
import {AppImages} from '../../../../utilis/AppConstant';
import PaddingView from '../../../../components/Padding/PaddingView';
interface Props {
  title?: string;
  value?: string;
  onDate: () => void;
  date? : any
}
const DobView = (props: Props) => {
  const dayRef = useRef<TextInput>(null);
    const monthRef = useRef<TextInput>(null);
      const yearRef = useRef<TextInput>(null);
  useEffect(() => {
    if (props.date && dayRef) {
      dayRef.current?.setNativeProps({text: props.date.day});
      monthRef.current?.setNativeProps({text: props.date.month});
      yearRef.current?.setNativeProps({text: props.date.year});
    }
  }, [props.date]);
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
      </Text>
      <View
        style={{
          ...style.dobStyle,
        }}>
        <TouchableWithoutFeedback onPress={() => props.onDate()}>
          <View
            style={{
              ...style.inputView,
            }}>
            <TextInput
            ref={dayRef}
            pointerEvents={"none"}
              editable={false}
              placeholder={'Day'}
              style={style.inputFieldStyle}
              onChangeText={text => {
                console.log("text changes is ",text)
              }}
            />
            <Image
              style={{
                ...style.dropDownStyle,
              }}
              source={AppImages.Common.dropDown}
            />
          </View>
        </TouchableWithoutFeedback>
        <PaddingView width={15} />
        <TouchableWithoutFeedback onPress={() => props.onDate()}>
          <View
            style={{
              ...style.inputView,
            }}>
            <TextInput
            ref={monthRef}
              pointerEvents={"none"}
              editable={false}
              placeholder={'Month'}
              style={style.inputFieldStyle}
              onChangeText={text => {}}
            />
            <Image
              style={{
                ...style.dropDownStyle,
              }}
              source={AppImages.Common.dropDown}
            />
          </View>
        </TouchableWithoutFeedback>
        <PaddingView width={15} />
        <TouchableWithoutFeedback onPress={() => props.onDate()}>
          <View
            style={{
              ...style.inputView,
            }}>
            <TextInput
            ref={yearRef}
              pointerEvents={"none"}
              editable={false}
              placeholder={'Year'}
              style={style.inputFieldStyle}
              onChangeText={text => {}}
            />
            <Image
              style={{
                ...style.dropDownStyle,
              }}
              source={AppImages.Common.dropDown}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
  dobStyle: {
    flex: 1,
    ...AppStyle.commonHoriStyle,
    marginTop: 10,
  },
  titleStyle: {
    ...font(14),
  },
  inputView: {
    flex: 1,
    height: 48,
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFieldStyle: {
    flex: 1,
    paddingHorizontal: 8,
    ...font(14),
  },
  passIcon: {
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  dropDownStyle: {
    height: 6,
    resizeMode: 'contain',
    position: 'absolute',
    top: 21,
    right: 5,
  },
});

export default DobView;
